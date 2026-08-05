/* ==========================================================================
   1. CONTROLADORES DE ESTADO AND SIMULAÇÃO DE BANCO DE DADOS (SQLITE)
   ========================================================================== */

// Contadores para simular os IDs INCREMENTAIS do SQLite
let proximoIdCliente = 7; 
let proximoIdAgendamento = 5;

// Guardamos as estruturas das telas organizadas por chaves
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
                        <p>Nossa mente trabalha sintonizada na frequência dos mistérios cósmicos. Enxergamos constelações onde outros vêem apenas padrões de costura, e desenhagem trajes pensados para quem carrega o brilho estelar na alma.</p>
                    </div>
                    <div class="atelie-text-block">
                        <h3>✂️ Nossa Forma de Trabalhar</h3>
                        <p>Nossos processos unem o respeito à alfaiataria clássica tradicional com a inovação conceitual do design futurista. Não produzimos em massa. Confeccionamos exclusivamente <strong>peças únicas, artísticas e autorais</strong>.</p>
                        <p>Cada manto de luxo passa por uma triagem criativa minuciosa, onde analizamos a gravidade, a fluidez do movimento e o magnetismo do caimento no corpo. Vestir uma obra do Celestine é fazer um salto hiperespacial rumo à sua melhor versão.</p>
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
    `,

    'colecoes': `
        <section class="catalogo-exclusivo-section">
            <div class="catalogo-header">
                <h2>Boutique Interplanetária: Peças Únicas</h2>
                <p>Nossos mantos autorais confeccionados sob a gravidade sutil do cosmos. Peças exclusivas de alta costura prontas para órbita.</p>
            </div>
            
            <!-- PÁGINA 1: EXIBE AS 6 PRIMEIRAS -->
            <div id="galeria-p1" class="gallery galeria-orbital ativa">
                <article class="product-item">
                    <div class="product-thumb"><img src="img/conjunto macaquinho.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Vestido Eclipse Total</h4>
                        <p>Veludo negro profundo com detalhes em branco puro.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/macaquinho rosa.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Terno Alinhamento Astral</h4>
                        <p>Cortes assimétricos com reflexos furta-cor de nebulosas.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/vestido rosa.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Corset Aurora Lunar</h4>
                        <p>Estrutura translúcida banhada a pó de pérola cósmica.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/vestido japoes.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Manto Estelar Andromeda</h4>
                        <p>Tule importado salaimado com poeira de diamante estelar.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/vestido negro.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Casaco Horizonte de Eventos</h4>
                        <p>Lã negra densa capaz de absorver reflexos de luz.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/vestido branco.jpeg"></div>
                    <div class="product-info-block">
                        <h4>Mangas Nebulosa de Primavera</h4>
                        <p>Mangas bufantes removíveis em tule translúcido com apliques de flores rosadas 3D.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
            </div>

            <!-- PÁGINA 2: EXIBE AS OUTRAS 6 -->
            <div id="galeria-p2" class="gallery galeria-orbital">
                <article class="product-item">
                    <div class="product-thumb"><img src="img/terno beje.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Capa Nebulosa Escura</h4>
                        <p>Fios de fibra óptica ativos que imitam pulsares galácticos.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/terno branco e vermelho.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Túnica Gravidade Zero</h4>
                        <p>Seda plissada reativa ao magnetismo local.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/terno vermelho.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Diadema Estelar</h4>
                        <p>Cristais lapidados sob a pressão de meteoritos brutos.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/terno azul escuro.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Vestido Radiação Cósmica</h4>
                        <p>Tecido holográfico mutável dependendo do ângulo orbital.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/xale.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Smoking Anéis de Saturno</h4>
                        <p>Lapelas circulares com costuras finas douradas.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
                <article class="product-item">
                    <div class="product-thumb"><img src="img/corset verde masc.jpeg" alt=""></div>
                    <div class="product-info-block">
                        <h4>Ombreiras Cinturão de Asteroides</h4>
                        <p>Placas geométricas com fragmentos minerais brutos lapidados.</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida...')">Adquirir Manto</button>
                    </div>
                </article>
            </div>

            <div class="paginacao-container">
                <button type="button" id="btn-voltar-ciclo" class="btn-paginacao" onclick="alternarPaginaColecao(1)" disabled>◀ Ciclo Anterior</button>
                <span id="indicador-orbita" class="indicador-pagina">Órbita 1 de 2</span>
                <button type="button" id="btn-avancar-ciclo" class="btn-paginacao" onclick="alternarPaginaColecao(2)">Próximo Ciclo ▶</button>
            </div>

            <div style="text-align: center; margin-top: 40px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
`};
/* ==========================================================================
   2. INICIALIZAÇÃO DO SISTEMA E CAPTURA DINÂMICA DE LINKS (ROTEADOR SPA)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Registra o estado HTML nativo da main
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

    const linkColecoes = document.querySelector('nav.desktop-nav a[href="#colecoes"]');
    if (linkColecoes) {
        linkColecoes.setAttribute('onclick', "event.preventDefault(); mudarTela('colecoes');");
    }
}

/* ==========================================================================
   3. NAVEGAÇÃO ENTRE TELAS E MECÂNICA DE PAGINAÇÃO DA BOUTIQUE
   ========================================================================== */

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

function alternarPaginaColecao(numeroPagina) {
    const p1 = document.getElementById('galeria-p1');
    const p2 = document.getElementById('galeria-p2');
    const btnVoltar = document.getElementById('btn-voltar-ciclo');
    const btnAvancar = document.getElementById('btn-avancar-ciclo');
    const indicador = document.getElementById('indicador-orbita');

    if (!p1 || !p2) return;

    if (numeroPagina === 2) {
        p1.classList.remove('ativa');
        setTimeout(() => {
            p2.classList.add('ativa');
            indicador.textContent = "Órbita 2 de 2";
            if(btnVoltar) btnVoltar.removeAttribute('disabled');
            if(btnAvancar) btnAvancar.setAttribute('disabled', 'true');
        }, 250);
    } else {
        p2.classList.remove('ativa');
        setTimeout(() => {
            p1.classList.add('ativa');
            indicador.textContent = "Órbita 1 de 2";
            if(btnVoltar) btnVoltar.setAttribute('disabled', 'true');
            if(btnAvancar) btnAvancar.removeAttribute('disabled');
        }, 250);
    }

    const topoBoutique = document.querySelector('.catalogo-header');
    if (topoBoutique) {
        topoBoutique.scrollIntoView({ behavior: 'smooth' });
    }
}
/* ==========================================================================
   4. MANIPULAÇÃO DE FORMULÁRIOS E SINCRONIZAÇÃO DE ASSINATURAS DO CLIENTE
   ========================================================================== */

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

/* ==========================================================================
   5. EXTENSÕES DO ACERVO (EFEITO REVELAR CASCATA) E INTERATIVIDADE SCROLL
   ========================================================================== */

function revelarMantosEscondidos() {
    const cardsExtras = document.querySelectorAll('.card-oculto');
    const botaoVerMais = document.getElementById('btn-ver-mais');

    cardsExtras.forEach((card, index) => {
        card.classList.add('revelado');
        card.style.transitionDelay = `${index * 150}ms`;
    });

    if (botaoVerMais) {
        botaoVerMais.style.opacity = '0';
        botaoVerMais.style.pointerEvents = 'none';
        setTimeout(() => {
            botaoVerMais.remove();
        }, 400);
    }
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '14px 6%';
        header.style.background = 'rgba(25, 27, 34, 0.96)';
        header.style.borderBottom = '1px solid var(--saturn-gold-dim)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.padding = '22px 6%';
        header.style.background = 'rgba(38, 41, 52, 0.92)';
        header.style.borderBottom = '1px solid var(--glass-border)';
        header.style.boxShadow = 'none';
    }
});

/* ==========================================================================
   6. LUXO VISUAL: PARTICULAS E RASTRO DE FÓTONS ESTELARES NO CURSOR
   ========================================================================== */

document.addEventListener('mousemove', (e) => {
    const star = document.createElement('div');
    star.innerHTML = '✦';
    star.style.position = 'fixed';
    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';
    star.style.pointerEvents = 'none';
    star.style.color = Math.random() > 0.5 ? 'var(--saturn-gold)' : 'var(--lavender-glow)';
    star.style.fontSize = Math.random() * (14 - 6) + 6 + 'px';
    star.style.opacity = '0.8';
    star.style.transition = 'all 0.8s ease-out';
    star.style.zIndex = '9999';
    star.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(star);

    setTimeout(() => {
        star.style.transform = 'translate(-50%, -50%) translateY(30px) scale(0)';
        star.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        star.remove();
    }, 800);
});
