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

// Criar e atualizar tabelas no banco de dados
db.serialize(() => {
    // Tabela de Clientes
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        foto TEXT,
        busto TEXT,
        cintura TEXT,
        quadril TEXT,
        altura TEXT
    )`);

    // Adiciona colunas para compatibilidade com bancos criados anteriormente
    db.run(`ALTER TABLE clientes ADD COLUMN foto TEXT`, () => {});
    db.run(`ALTER TABLE clientes ADD COLUMN busto TEXT`, () => {});
    db.run(`ALTER TABLE clientes ADD COLUMN cintura TEXT`, () => {});
    db.run(`ALTER TABLE clientes ADD COLUMN quadril TEXT`, () => {});
    db.run(`ALTER TABLE clientes ADD COLUMN altura TEXT`, () => {});

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

// Cadastrar novo cliente
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

// Login de cliente existente
app.post('/api/clientes/login', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erro: 'Por favor, informe seu e-mail.' });
    }

    const sql = 'SELECT * FROM clientes WHERE email = ?';
    db.get(sql, [email], (err, cliente) => {
        if (err) return res.status(500).json({ erro: 'Erro no banco de dados.' });
        if (!cliente) return res.status(404).json({ erro: 'Conta não encontrada! Verifique o e-mail ou cadastre-se.' });
        res.json({ mensagem: 'Sintonizado com sucesso!', cliente });
    });
});

// Atualizar foto do cliente
app.put('/api/clientes/:id/foto', (req, res) => {
    const { id } = req.params;
    const { foto } = req.body;

    db.run('UPDATE clientes SET foto = ? WHERE id = ?', [foto, id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao salvar foto de perfil.' });
        res.json({ mensagem: 'Foto atualizada com sucesso!' });
    });
});

// Atualizar medidas do cliente
app.put('/api/clientes/:id/medidas', (req, res) => {
    const { id } = req.params;
    const { busto, cintura, quadril, altura } = req.body;

    const sql = `UPDATE clientes SET busto = ?, cintura = ?, quadril = ?, altura = ? WHERE id = ?`;
    db.run(sql, [busto, cintura, quadril, altura, id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao salvar medidas no banco de dados.' });
        res.json({ mensagem: 'Medidas salvas com sucesso!' });
    });
});

// Consultar todos os clientes
app.get('/api/clientes', (req, res) => {
    db.all('SELECT * FROM clientes ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao consultar clientes.', detalhes: err.message });
        res.json(rows);
    });
});

// ==========================================
// ROTAS DE PEDIDOS E ADMIN
// ==========================================

// Criar pedido
app.post('/api/pedidos', (req, res) => {
    const { nome, email, estilo } = req.body;

    if (!nome || !email || !estilo) {
        return res.status(400).json({ erro: 'Por favor, preencha todos os campos do pedido.' });
    }

    const sql = 'INSERT INTO pedidos (nome_cliente, email, estilo) VALUES (?, ?, ?)';
    db.run(sql, [nome, email, estilo], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao salvar pedido.' });
        res.status(201).json({ mensagem: 'Pedido registrado com sucesso!', id: this.lastID });
    });
});

// Consultar todos os pedidos
app.get('/api/pedidos', (req, res) => {
    db.all('SELECT * FROM pedidos ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao consultar pedidos.' });
        res.json(rows);
    });
});

// Consultar pedidos por e-mail do cliente
app.get('/api/pedidos/cliente/:email', (req, res) => {
    const { email } = req.params;
    db.all('SELECT * FROM pedidos WHERE email = ? ORDER BY id DESC', [email], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar pedidos do cliente.' });
        res.json(rows || []);
    });
});

// Atualizar status do pedido (Aprovado / Recusado / Pendente)
app.put('/api/pedidos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.run('UPDATE pedidos SET status = ? WHERE id = ?', [status, id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: `Pedido #${id} alterado para ${status}!` });
    });
});

// Estatísticas para o painel admin
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
        if (err) return res.status(500).json({ erro: err.message });
        res.json(row || { total: 0, pendentes: 0, aprovados: 0, recusados: 0 });
    });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Celestine Ateliê rodando em http://localhost:${PORT}`);
});