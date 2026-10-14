const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('.'));

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('⚡ Conectado ao banco de dados SQLite!');
    }
});

// Criar as tabelas no banco de dados se não existirem
db.serialize(() => {
    // Tabela de Clientes com suporte a foto
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        foto TEXT
    )`);

    // Tenta adicionar a coluna foto caso o banco já existisse antes
    db.run(`ALTER TABLE clientes ADD COLUMN foto TEXT`, () => {});

    // Tabela de Pedidos
    db.run(`CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente TEXT,
        email TEXT,
        estilo TEXT,
        status TEXT DEFAULT 'Pendente',
        data DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// ==========================================
// ROTAS DE CLIENTES
// ==========================================

// POST: Cadastrar um novo cliente
app.post('/api/clientes', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Por favor, informe nome e e-mail.' });
    }

    const sql = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
    db.run(sql, [nome, email], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
            }
            return res.status(500).json({ erro: 'Erro ao cadastrar cliente.', detalhes: err.message });
        }

        res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso!',
            id: this.lastID,
            nome,
            email
        });
    });
});

// GET: Consultar todos os clientes
app.get('/api/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao consultar clientes.', detalhes: err.message });
        }
        res.json(rows);
    });
});

// ==========================================
// ROTAS DE PEDIDOS E ADMIN
// ==========================================

// POST: Criar novo pedido
app.post('/api/pedidos', (req, res) => {
    const { nome, email, estilo } = req.body;

    if (!nome || !email || !estilo) {
        return res.status(400).json({ erro: 'Por favor, preencha todos os campos do pedido.' });
    }

    const sqlPedido = 'INSERT INTO pedidos (nome_cliente, email, estilo) VALUES (?, ?, ?)';
    db.run(sqlPedido, [nome, email, estilo], function (err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao salvar pedido.', detalhes: err.message });
        }

        res.status(201).json({
            mensagem: 'Pedido registrado com sucesso!',
            id: this.lastID,
            nome_cliente: nome,
            email,
            estilo
        });
    });
});

// GET: Consultar todos os pedidos
app.get('/api/pedidos', (req, res) => {
    const sql = 'SELECT * FROM pedidos ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao consultar pedidos.', detalhes: err.message });
        }
        res.json(rows);
    });
});

// PUT: Alterar o status do pedido (Aprovado / Recusado / Pendente)
app.put('/api/pedidos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = `UPDATE pedidos SET status = ? WHERE id = ?`;
    db.run(query, [status, id], function (err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ mensagem: `Pedido #${id} alterado para ${status}!` });
    });
});

// GET: Estatísticas para o painel admin e gráfico
app.get('/api/admin/estatisticas', (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'Pendente' OR status IS NULL THEN 1 ELSE 0 END) as pendentes,
            SUM(CASE WHEN status = 'Aprovado' THEN 1 ELSE 0 END) as aprovados,
            SUM(CASE WHEN status = 'Recusado' THEN 1 ELSE 0 END) as recusados
        FROM pedidos
    `;

    db.get(query, [], (err, row) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(row || { total: 0, pendentes: 0, aprovados: 0, recusados: 0 });
    });
});


// ==========================================
// ROTA DE LOGIN DE CLIENTE EXISTENTE
// ==========================================
app.post('/api/clientes/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erro: 'Por favor, informe seu e-mail.' });
    }

    const sql = 'SELECT * FROM clientes WHERE email = ?';
    db.get(sql, [email], (err, cliente) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao consultar o banco de dados.', detalhes: err.message });
        }
        if (!cliente) {
            return res.status(404).json({ erro: 'Conta não encontrada! Verifique o e-mail ou faça um novo cadastro.' });
        }
        res.json({ mensagem: 'Sintonizado com sucesso!', cliente });
    });
});

// GET: Consultar pedidos de um cliente específico pelo e-mail
app.get('/api/pedidos/cliente/:email', (req, res) => {
    const { email } = req.params;
    const sql = 'SELECT * FROM pedidos WHERE email = ? ORDER BY id DESC';
    db.all(sql, [email], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao consultar pedidos do tripulante.', detalhes: err.message });
        }
        res.json(rows);
    });
});
// Rota para salvar a foto de perfil do cliente
app.put('/api/clientes/:id/foto', (req, res) => {
    const { id } = req.params;
    const { foto } = req.body;

    db.run('UPDATE clientes SET foto = ? WHERE id = ?', [foto, id], function (err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao salvar a foto de perfil.' });
        }
        res.json({ mensagem: 'Foto atualizada com sucesso!' });
    });
});

// Rota de login de cliente
app.post('/api/clientes/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erro: 'Por favor, informe seu e-mail.' });
    }

    db.get('SELECT * FROM clientes WHERE email = ?', [email], (err, cliente) => {
        if (err) return res.status(500).json({ erro: 'Erro no banco de dados.' });
        if (!cliente) return res.status(404).json({ erro: 'Conta não encontrada.' });
        res.json({ cliente });
    });
});

// Rota para buscar os pedidos de um cliente específico pelo e-mail
app.get('/api/pedidos/cliente/:email', (req, res) => {
    const { email } = req.params;
    db.all('SELECT * FROM pedidos WHERE email = ? ORDER BY id DESC', [email], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar pedidos.' });
        res.json(rows || []);
    });
});
// Inicialização do servidor no final do arquivo
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});