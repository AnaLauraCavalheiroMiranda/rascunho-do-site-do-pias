// Contadores para simular os IDs INCREMENTAIS do SQLite
let proximoIdCliente = 7; 
let proximoIdAgendamento = 5;

// 1. Guardamos as estruturas das telas organizadas por chaves
const telasCelestine = {
    'orbita': null, 
    
    'login': `
        <section class="login-section">
            <div class="login-box">
                <div class="login-header">
                    <h2>Identificação de Tripulante</h2>
                    <p>Sincronize seus dados orbitais para acessar seus mantos cósmicos privados.</p>
                </div>
                <form id="form-login" onsubmit="autenticarTripulante(event)">
                    <div class="input-group">
                        <label for="login-email">📡 Frequência Digital Coordenada (E-mail)</label>
                        <input type="email" id="login-email" required placeholder="comandante@galaxia.com">
                    </div>
                    <div class="input-group">
                        <label for="login-password">🔑 Chave Criptográfica Estelar (Senha)</label>
                        <input type="password" id="password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn-submit-login">Autenticar Assinatura</button>
                </form>
                <div class="login-footer">
                    <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
                </div>
            </div>
        </section>
    `,

    // TELA REAJUSTADA: Títulos e subtítulos atualizados para focar no Pedido/Reserva
    'agendamento': `
        <section id="Agendamento" class="agendamento-section">
            <h3>🌙 Ciclos Lunares: Reservar Atendimento</h3>
            <p class="form-subtitle">Sincronize sua frequência para agendar o desenho e a confecção do seu pedido sob medida.</p>
            <form id="form-agendamento" onsubmit="processarAgendamentoEspacial(event)">
                <label for="nome">Nome do Tripulante:</label>
                <input type="text" id="nome" required placeholder="Ex: Comandante Silva">

                <label for="email">Frequência Digital (E-mail):</label>
                <input type="email" id="email" required placeholder="seu-canal@galaxia.com">

                <label for="Estilo">Estilo de Preferência do Pedido:</label>
                <select id="Estilo">
                    <option value="minimalista">🌘 Eclipse (Minimalista e Escuro)</option>
                    <option value="brilhante">🪐 Saturniano (Anéis e Camadas Extravagantes)</option>
                    <option value="futurista">✨ Via Láctea (Brilho Máximo e Cristais)</option>
                </select>

                <button type="submit">Transmitir Sinal do Pedido</button>
            </form>
            <div class="login-footer" style="margin-top: 30px; text-align: center;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,

    'atelie': `
        <section class="atelie-page-section">
            <div class="atelie-container">
                <div class="atelie-header">
                    <h2>Nossa Filosofia Orbital</h2>
                    <p class="atelie-subtitle">Conectando corpos terrenos a galáxias de distância através do fio e da agulha.</p>
                </div>
                <div class="atelie-content-grid">
                    <div class="atelie-text-block">
                        <h3>🌌 Como Pensamos</h3>
                        <p>No Celestine Ateliê, nós acreditamos firmemente que a alta costura não deve se limitar às fronteiras da Terra. Cada silhueta que moldamos, cada tecido que cortamos e cada ponto que alinhamos nascem de um desejo profundo de desafiar a mesmice e orbitar na alta sociedade universal.</p>
                        <p>Nossa mente trabalha sintonizada na frequência dos mistérios cósmicos. Enxergamos constelações onde outros vêem apenas padrões de costura, e desenhamos trajes pensados para quem carrega o brilho estelar na alma.</p>
                    </div>
                    <div class="atelie-text-block">
                        <h3>✂️ Nossa Forma de Trabalhar</h3>
                        <p>Nossos processos unem o respeito à alfaiataria clássica tradicional com a inovação conceitual do design futurista. Não produzimos em massa. Confeccionamos exclusivamente <strong>peças únicas, artísticas e autorais</strong>.</p>
                        <p>Cada manto de luxo passa por uma triagem criativa minuciosa, onde analisamos a gravidade, a fluidez do movimento e o magnetismo do caimento no corpo. Vestir uma obra do Celestine é fazer um salto hiperespacial rumo à sua melhor versão.</p>
                    </div>
                </div>
                <div class="atelie-manifesto-highlight">
                    <p>"A distância entre os planetas é enorme, mas o poder da arte e do estilo consegue conectar mentes e criar constelações de sofisticação com um único fio de seda cósmica."</p>
                </div>
                <div style="text-align: center; margin-top: 50px;">
                    <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
                </div>
            </div>
        </section>
    `
};

// 2. Inicialização do sistema assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    telasCelestine['orbita'] = document.querySelector('main').innerHTML;
    configurarGatilhosNavegacao();
});

function configurarGatilhosNavegacao() {
    const btnLogin = document.querySelector('.btn-space-login');
    if (btnLogin) btnLogin.setAttribute('onclick', "mudarTela('login')");

    const linkOrbita = document.querySelector('nav.desktop-nav a[href="#inicio"]');
    if (linkOrbita) linkOrbita.setAttribute('onclick', "event.preventDefault(); mudarTela('orbita');");

    const linkAtelie = document.querySelector('nav.desktop-nav a[href="#atelie"]');
    if (linkAtelie) {
        linkAtelie.setAttribute('onclick', "event.preventDefault(); mudarTela('atelie');");
    }

    // AJUSTE: Mapeando o clique do novo texto do link de Ciclos Lunares para abrir a tela de agendamentos
    const linkCiclosLunares = document.querySelector('nav.desktop-nav a[href="#Agendamento"]');
    if (linkCiclosLunares) {
        linkCiclosLunares.setAttribute('onclick', "event.preventDefault(); mudarTela('agendamento');");
    }

    const linkExploracao = document.querySelector('nav.desktop-nav a[href="#Exploracao"]');
    if (linkExploracao) {
        linkExploracao.setAttribute('onclick', "event.preventDefault(); alert('Iniciando rastreamento de estoque confeccionado... Nova aba em desenvolvimento.');");
    }

    const btnJornada = document.querySelector('.hero-content button');
    if (btnJornada) btnJornada.setAttribute('onclick', "mudarTela('login')");
}

function mudarTela(nomeDaTela) {
    const containerPrincipal = document.querySelector('main');
    
    if (telasCelestine[nomeDaTela]) {
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel && sidePanel.classList.contains('open')) {
            sidePanel.classList.remove('open');
        }

        containerPrincipal.style.opacity = 0;
        
        setTimeout(() => {
            containerPrincipal.innerHTML = telasCelestine[nomeDaTela];
            if (nomeDaTela === 'orbita') {
                configurarGatilhosNavegacao();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            containerPrincipal.style.opacity = 1;
        }, 200);
    }
}

function processarAgendamentoEspacial(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const estilo = document.getElementById('Estilo').value;

    const dadosClienteSimulados = {
        id_cliente: proximoIdCliente++,
        nome_cliente: nome,
        frequencia_digital: email
    };

    const dadosAgendamentoSimulados = {
        id_agendamento: proximoIdAgendamento++,
        cliente_id: dadosClienteSimulados.id_cliente,
        armadura_escolhida: estilo,
        data_sinal: new Date().toLocaleDateString('pt-BR'),
        status_missao: 'Pendente'
    };

    let estiloFormatado = '';
    if (estilo === 'minimalista') estiloFormatado = '🌘 Eclipse (Minimalista e Escuro)';
    if (estilo === 'brilhante') estiloFormatado = '🪐 Saturniano (Anéis e Camadas)';
    if (estilo === 'futurista') estiloFormatado = '✨ Via Láctea (Brilho Máximo e Cristais)';

    alert(
        `🚀 [CONEXÃO SQLITE SIMULADA COM SUCESSO]\n\n` +
        `• id_agendamento: ${dadosAgendamentoSimulados.id_agendamento}\n` +
        `• id_cliente: ${dadosClienteSimulados.id_cliente}\n` +
        `• nome_cliente: ${dadosClienteSimulados.nome_cliente}\n` +
        `• frequencia_digital: ${dadosClienteSimulados.frequencia_digital}\n` +
        `• armadura_escolhida: ${estiloFormatado}\n` +
        `• status_missao: ${dadosAgendamentoSimulados.status_missao}`
    );

    mudarTela('orbita');
}

function autenticarTripulante(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`Tripulante ${email} autenticado com sucesso!`);
    mudarTela('orbita');
}
