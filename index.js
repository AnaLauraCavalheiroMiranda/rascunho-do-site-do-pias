const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const hostname = '127.0.0.1';
const port = 3000;

const db = new sqlite3.Database('./enderecos.db');

// Inicialização e criação do schema de banco de dados
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS endereco (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rua TEXT NOT NULL,
        numero INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        gmail TEXT NOT NULL UNIQUE,
        data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
        endereco_id INTEGER NOT NULL,
        FOREIGN KEY (endereco_id) REFERENCES endereco(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL CHECK(preco >= 0),
        estoque INTEGER NOT NULL DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        data_pedido TEXT DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL DEFAULT 0.0,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS itens_pedido (
        pedido_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL CHECK(quantidade > 0),
        preco_unitario REAL NOT NULL,
        PRIMARY KEY (pedido_id, produto_id),
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS agendamento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        endereco_id INTEGER NOT NULL,
        estilo_preferencia TEXT NOT NULL CHECK(estilo_preferencia IN ('minimalista', 'brilhante', 'futurista')),
        data_solicitacao TEXT DEFAULT CURRENT_TIMESTAMP,
        status_triagem TEXT DEFAULT 'Pendente' CHECK(status_triagem IN ('Pendente', 'Confirmado', 'Em Orbita')),
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
        FOREIGN KEY (endereco_id) REFERENCES endereco(id) ON DELETE CASCADE
    )`);
});

const server = http.createServer((req, res) => {
    // Configurações de CORS para integração com o front-end
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    // ROTA GET /pedidos
    if (req.method === 'GET' && req.url === '/pedidos') {
        const sql = `
            SELECT 
                p.id AS numero_pedido,
                c.nome AS cliente,
                prod.nome AS produto,
                ip.quantidade,
                ip.preco_unitario,
                (ip.quantidade * ip.preco_unitario) AS subtotal_item
            FROM pedidos p
            INNER JOIN clientes c ON p.cliente_id = c.id
            INNER JOIN itens_pedido ip ON p.id = ip.pedido_id
            INNER JOIN produtos prod ON ip.produto_id = prod.id
            ORDER BY p.id ASC;
        `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ erro: err.message }));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(rows));
        });
    } 
    // ROTA GET /agendamentos
    else if (req.method === 'GET' && req.url === '/agendamentos') {
        const sql = `
            SELECT 
                a.id AS protocolo,
                c.nome AS nome_cliente,
                c.gmail AS frequencia_digital,
                CASE 
                    WHEN a.estilo_preferencia = 'minimalista' THEN '🌘 Eclipse (Minimalista)'
                    WHEN a.estilo_preferencia = 'brilhante' THEN '🪐 Saturniano (Brilhante)'
                    WHEN a.estilo_preferencia = 'futurista' THEN '✨ Via Láctea (Futurista)'
                    ELSE a.estilo_preferencia
                END AS armadura_escolhida,
                a.data_solicitacao AS data_sinal,
                a.status_triagem AS status_missao
            FROM agendamento a
            INNER JOIN clientes c ON a.cliente_id = c.id
            ORDER BY a.data_solicitacao ASC;
        `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ erro: err.message }));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(rows));
        });
    }
    // ROTA POST /agendamentos
    else if (req.method === 'POST' && req.url === '/agendamentos') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { nome, gmail, rua, numero, estilo_preferencia } = JSON.parse(body);

                // Garante que a preferência seja tratada em minúsculo
                let estiloValido = (estilo_preferencia || 'minimalista').toLowerCase();
                if (!['minimalista', 'brilhante', 'futurista'].includes(estiloValido)) {
                    estiloValido = 'minimalista';
                }

                db.run(`INSERT INTO endereco (rua, numero) VALUES (?, ?)`, [rua || 'Rua Orbitada', parseInt(numero) || 100], function (err) {
                    if (err) {
                        res.statusCode = 500;
                        return res.end(JSON.stringify({ erro: err.message }));
                    }
                    const enderecoId = this.lastID;

                    db.run(`INSERT INTO clientes (nome, gmail, endereco_id) VALUES (?, ?, ?)`, [nome, gmail, enderecoId], function (err) {
                        let clienteId = this ? this.lastID : null;

                        const registrarAgendamento = (cId) => {
                            const sqlAgendamento = `INSERT INTO agendamento (cliente_id, endereco_id, estilo_preferencia, status_triagem) VALUES (?, ?, ?, 'Pendente')`;
                            db.run(sqlAgendamento, [cId, enderecoId, estiloValido], function (err) {
                                if (err) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ erro: err.message }));
                                }
                                res.statusCode = 201;
                                res.end(JSON.stringify({ status: 'Sucesso', agendamento_id: this.lastID }));
                            });
                        };

                        if (err) {
                            db.get(`SELECT id FROM clientes WHERE gmail = ?`, [gmail], (err, row) => {
                                if (err || !row) {
                                    res.statusCode = 500;
                                    return res.end(JSON.stringify({ erro: 'Erro ao encontrar registro de cliente.' }));
                                }
                                registrarAgendamento(row.id);
                            });
                        } else {
                            registrarAgendamento(clienteId);
                        }
                    });
                });
            } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ erro: 'Formato JSON inválido.' }));
            }
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ erro: 'Rota não encontrada.' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`✨ Servidor do Celestine Ateliê rodando em http://${hostname}:${port}/`);
});