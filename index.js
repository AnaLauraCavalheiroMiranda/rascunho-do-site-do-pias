const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('.')); // Servir os arquivos HTML/CSS/JS do front-end

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
    // Tabela de Clientes
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`);

    // Tabela de Pedidos
    db.run(`CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente TEXT NOT NULL,
        email TEXT NOT NULL,
        estilo TEXT NOT NULL,
        data DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// ==========================================
// ROTAS DE CLIENTES
// ==========================================

// POST: Cadastrar um novo cliente diretamente
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

// GET: Consultar todos os clientes (para o Modal de Clientes)
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
// ROTAS DE PEDIDOS
// ==========================================

// POST: Criar novo pedido (e auto-cadastrar cliente se não existir)
app.post('/api/pedidos', (req, res) => {
    const { nome, email, estilo } = req.body;

    if (!nome || !email || !estilo) {
        return res.status(400).json({ erro: 'Por favor, preencha todos os campos do pedido.' });
    }

    // 1. Cadastra o cliente automaticamente se ainda não existir
    db.run('INSERT OR IGNORE INTO clientes (nome, email) VALUES (?, ?)', [nome, email]);

    // 2. Grava o pedido na tabela pedidos
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

// GET: Consultar todos os pedidos (para o Modal de Pedidos)
app.get('/api/pedidos', (req, res) => {
    const sql = 'SELECT * FROM pedidos ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao consultar pedidos.', detalhes: err.message });
        }
        res.json(rows);
    });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});