/* ==========================================================================
   CELESTINE ATELIÊ - SCRIPT COMPLETO E ESTRUTURADO
   ========================================================================== */

// Configurações globais
let produtosGlobais = [];
const API_URL = 'http://127.0.0.1:3000';

/**
 * Função auxiliar para capturar o container principal do HTML,
 * suportando tanto <main id="main-content"> quanto <main>.
 */
function obterContainerPrincipal() {
    return document.getElementById('main-content') || document.querySelector('main');
}

/* ==========================================================================
   1. MENU MOBILE & NAVEGAÇÃO
   ========================================================================== */

function toggleMenu() {
    const sidePanel = document.getElementById('sidePanel');
    if (sidePanel) {
        sidePanel.classList.toggle('active');
    }
}

/**
 * Gerencia a troca dinâmica de telas (Single Page Application - SPA)
 * @param {string} nomeDaTela - Identificador da tela desejada
 */
function mudarTela(nomeDaTela) {
    const main = obterContainerPrincipal();
    if (!main) {
        console.error('Erro crítico: Tag <main> não foi encontrada no seu HTML!');
        return;
    }

    // Fecha o menu lateral caso esteja aberto
    const sidePanel = document.getElementById('sidePanel');
    if (sidePanel && sidePanel.classList.contains('active')) {
        sidePanel.classList.remove('active');
    }

    switch (nomeDaTela) {
        case 'orbita':
            main.innerHTML = `
                <section class="hero-section">
                    <h1>Alta Costura das Estrelas</h1>
                    <p>Projetamos mantos e túnicas sob medida inspiradas nas constelações do universo.</p>
                    <div class="hero-botoes">
                        <button class="btn-primary" onclick="mudarTela('colecoes')">🌌 Explorar Coleções</button>
                        <button class="btn-secondary" onclick="mudarTela('agendamento')">🌙 Solicitar Agendamento</button>
                    </div>
                </section>
            `;
            break;

        case 'colecoes':
            main.innerHTML = `
                <section class="colecoes-section">
                    <h2>🌌 Coleções Orbitais</h2>
                    <p class="subtitulo">Clique sobre uma peça para visualizar os detalhes e solicitar prova.</p>
                    <div id="grid-produtos" class="grid-produtos">
                        <p class="carregando">Carregando manto das estrelas...</p>
                    </div>
                </section>
            `;
            carregarMantosDoJson();
            break;

        case 'pedidos':
            main.innerHTML = `
                <section class="pedidos-section">
                    <h2>📦 Caixa de Pedidos Orbitais</h2>
                    <p class="subtitulo">Consultando dados registrados diretamente no banco SQLite.</p>
                    <div id="lista-pedidos-container" class="pedidos-grid">
                        <p class="carregando">Sincronizando com o banco de dados...</p>
                    </div>
                </section>
            `;
            carregarCaixaDePedidos();
            break;

        case 'agendamento':
            main.innerHTML = `
                <section class="agendamento-section">
                    <div class="form-card">
                        <h2>🌙 Agendamento de Prova Orbital</h2>
                        <form id="formAgendamento" onsubmit="processarAgendamentoEspacial(event)">
                            <div class="campo-grupo">
                                <label for="nome">Nome do Tripulante</label>
                                <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>
                            </div>
                            <div class="campo-grupo">
                                <label for="email">Frequência Digital (E-mail)</label>
                                <input type="email" id="email" name="email" placeholder="seuemail@galaxia.com" required>
                            </div>
                            <div class="campo-grupo">
                                <label for="rua">Logradouro / Rua</label>
                                <input type="text" id="rua" name="rua" placeholder="Ex: Av. Galáxia" required>
                            </div>
                            <div class="campo-grupo">
                                <label for="numero">Número</label>
                                <input type="number" id="numero" name="numero" placeholder="Ex: 777" required>
                            </div>
                            <div class="campo-grupo">
                                <label for="Estilo">Estilo Preferencial do Manto</label>
                                <select id="Estilo" name="Estilo" required>
                                    <option value="minimalista">Minimalista (Eclipse)</option>
                                    <option value="brilhante">Brilhante (Saturniano)</option>
                                    <option value="futurista">Futurista (Via Láctea)</option>
                                </select>
                            </div>
                            <button type="submit" class="btn-submit">🚀 Transmitir Agendamento</button>
                        </form>
                    </div>
                </section>
            `;
            break;

        default:
            console.warn(`Tela '${nomeDaTela}' não reconhecida.`);
            mudarTela('orbita');
            break;
    }
}

/* ==========================================================================
   2. LEITURA E RENDERIZAÇÃO DO PRODUTOS.JSON
   ========================================================================== */

async function carregarMantosDoJson() {
    const container = document.getElementById('grid-produtos');
    if (!container) return;

    try {
        const resposta = await fetch('produtos.json');
        if (!resposta.ok) throw new Error(`Falha HTTP ao ler produtos.json: Status ${resposta.status}`);

        produtosGlobais = await resposta.json();
        
        if (!Array.isArray(produtosGlobais) || produtosGlobais.length === 0) {
            container.innerHTML = `<p class="erro-msg">Nenhuma peça foi encontrada no catálogo.</p>`;
            return;
        }

        container.innerHTML = produtosGlobais.map((prod, index) => `
            <article class="manto-card" onclick="exibirDetalhesManto(${index})" style="cursor: pointer;">
                <img src="${prod.imagem}" alt="${prod.alt || prod.titulo}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400?text=Imagem+nao+encontrada';">
                <div class="manto-info">
                    <h3>${prod.titulo}</h3>
                    <p>${prod.descricao}</p>
                    <span class="manto-preco">${prod.preco || 'Sob Consulta'}</span>
                </div>
            </article>
        `).join('');

    } catch (erro) {
        console.error('Erro no fetch de produtos:', erro);
        container.innerHTML = `
            <div class="erro-box">
                <p>⚠️ <strong>Não foi possível carregar as peças do catálogo.</strong></p>
                <p>Certifique-se de que está abrindo o site através de um servidor local (Live Server ou Python HTTP Server) e que o arquivo <code>produtos.json</code> está na mesma pasta do <code>index.html</code>.</p>
            </div>
        `;
    }
}

function exibirDetalhesManto(index) {
    const manto = produtosGlobais[index];
    const main = obterContainerPrincipal();
    if (!main || !manto) return;

    main.innerHTML = `
        <section class="detalhes-section">
            <button class="btn-voltar" onclick="mudarTela('colecoes')">← Voltar para as Coleções</button>
            <div class="detalhes-container">
                <img src="${manto.imagem}" alt="${manto.titulo}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500?text=Imagem+nao+encontrada';">
                <div class="detalhes-conteudo">
                    <h2>${manto.titulo}</h2>
                    <p class="descricao">${manto.descricao}</p>
                    <p class="info-linha"><strong>Investimento Estelar:</strong> ${manto.preco || 'Sob Consulta'}</p>
                    <p class="info-linha"><strong>Prazo de Confecção:</strong> ${manto.tempo || '15 Dias Orbitais'}</p>
                    <button class="btn-primary" onclick="mudarTela('agendamento')" style="margin-top: 20px;">
                        🌙 Agendar Prova deste Manto
                    </button>
                </div>
            </div>
        </section>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   3. ENVIO DE AGENDAMENTOS (POST PARA NODE.JS / SQLITE)
   ========================================================================== */

async function processarAgendamentoEspacial(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const estiloSelect = document.getElementById('Estilo');

    const payload = {
        nome: nome,
        gmail: email,
        rua: rua,
        numero: Number(numero),
        estilo_preferencia: estiloSelect.value
    };

    try {
        const resposta = await fetch(`${API_URL}/agendamentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            exibirTelaConfirmacao({
                protocolo: `AGD-${dados.agendamento_id || Math.floor(Math.random() * 8999 + 1000)}`,
                nome: nome,
                email: email,
                estilo: estiloSelect.options[estiloSelect.selectedIndex].text
            });
        } else {
            alert('Não foi possível gravar o agendamento no banco SQLite. Verifique seu servidor Node.');
        }
    } catch (erro) {
        console.error('Erro de conexão com o backend:', erro);
        alert('Servidor Node.js inacessível. Certifique-se de que executou "node index.js" na porta 3000.');
    }
}

function exibirTelaConfirmacao(dados) {
    const main = obterContainerPrincipal();
    if (!main) return;

    main.innerHTML = `
        <section class="confirmacao-section">
            <div class="confirmacao-card">
                <span>🌌</span>
                <h2>Sinal Transmitido com Sucesso!</h2>
                <p>Seu registro foi armazenado com sucesso no banco de dados.</p>

                <div class="comprovante-box">
                    <p><strong>Protocolo:</strong> ${dados.protocolo}</p>
                    <p><strong>Tripulante:</strong> ${dados.nome}</p>
                    <p><strong>Frequência (E-mail):</strong> ${dados.email}</p>
                    <p><strong>Estilo Solicitado:</strong> ${dados.estilo}</p>
                </div>

                <div class="acoes-confirmacao">
                    <button class="btn-primary" onclick="mudarTela('pedidos')">📦 Ver Caixa de Pedidos</button>
                    <button class="btn-secondary" onclick="mudarTela('orbita')">🪐 Voltar ao Início</button>
                </div>
            </div>
        </section>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   4. CONSULTA DE PEDIDOS (GET PARA NODE.JS / SQLITE)
   ========================================================================== */

async function carregarCaixaDePedidos() {
    const container = document.getElementById('lista-pedidos-container');
    if (!container) return;

    try {
        const resposta = await fetch(`${API_URL}/pedidos`);
        if (!resposta.ok) throw new Error(`Status HTTP: ${resposta.status}`);

        const pedidos = await resposta.json();
        container.innerHTML = '';

        if (!Array.isArray(pedidos) || pedidos.length === 0) {
            container.innerHTML = `
                <div class="pedido-vazio-card">
                    <span>🛰️</span>
                    <h3>Nenhum pedido cadastrado no momento</h3>
                    <p>Realize um agendamento para gerar o seu primeiro pedido no banco de dados.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = pedidos.map(p => `
            <article class="pedido-card">
                <div class="pedido-card-header">
                    <span>Pedido <strong>#${p.numero_pedido || p.id || 'N/A'}</strong></span>
                    <span class="status-badge">Confirmado</span>
                </div>
                <div class="pedido-card-body">
                    <h4>${p.produto || 'Manto Sob Medida'}</h4>
                    <p><strong>Cliente:</strong> ${p.cliente || p.nome || 'Não informado'}</p>
                    <p><strong>Quantidade:</strong> ${p.quantidade || 1}</p>
                    <p><strong>Subtotal:</strong> R$ ${Number(p.subtotal_item || 0).toFixed(2)}</p>
                </div>
            </article>
        `).join('');

    } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro);
        container.innerHTML = `
            <div class="erro-box">
                <p>⚠️ <strong>Servidor Backend em Node.js Inacessível.</strong></p>
                <p>Certifique-se de que o backend está ativo executando <code>node index.js</code> no terminal da porta 3000.</p>
            </div>
        `;
    }
}

/* ==========================================================================
   INICIALIZAÇÃO AUTOMÁTICA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    mudarTela('orbita');
});