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
    `,

   'colecoes': `
        <section class="catalogo-exclusivo-section">
            <div class="catalogo-header">
                <h2>Boutique Interplanetária: Peças Únicas</h2>
                <p>Nossos mantos autorais confeccionados sob a gravidade sutil do cosmos. Peças exclusivas de alta costura prontas para órbita.</p>
            </div>
            
            <div id="galeria-p1" class="gallery galeria-orbital ativa"></div>

            <div id="galeria-p2" class="gallery galeria-orbital"></div>

            <div class="paginacao-container">
                <button type="button" id="btn-voltar-ciclo" class="btn-paginacao" onclick="alternarPaginaColecao(1)" disabled>◀ Ciclo Anterior</button>
                <span id="indicador-orbita" class="indicador-pagina">Órbita 1 de 2</span>
                <button type="button" id="btn-avancar-ciclo" class="btn-paginacao" onclick="alternarPaginaColecao(2)">Próximo Ciclo ▶</button>
            </div>

            <div style="text-align: center; margin-top: 40px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,
'exploracao': `
        <section class="exploracao-section">
            <div class="exploracao-header">
                <h2>🛰️ Centro de Exploração Cósmica</h2>
                <p>Descubra a matéria-prima do universo e sintonize seu manto autoral ideal.</p>
            </div>

            <div class="quiz-card-container">
                <div class="quiz-header">
                    <h3>✨ Scanner da Aura & Estilo</h3>
                    <p>Responda às frequências orbitais para identificar seu estilo e o tecido perfeito para seu manto.</p>
                </div>

                <div id="quiz-corpo">
                    <form id="form-quiz" onsubmit="calcularResultadoQuiz(event)">
                        <div class="pergunta-group">
                            <label>1. Como você prefere se destacar em um evento na galáxia?</label>
                            <select id="p1" required>
                                <option value="" disabled selected>Selecione uma sintonia...</option>
                                <option value="misterio">Misterioso(a) e imponente como um Eclipse</option>
                                <option value="brilho">Radiante e expansivo(a) como uma Supernova</option>
                                <option value="fluidez">Elegante, fluido(a) e etéreo(a) como uma Nebulosa</option>
                            </select>
                        </div>

                        <div class="pergunta-group">
                            <label>2. Qual sensação tátil você busca em um traje de alta costura?</label>
                            <select id="p2" required>
                                <option value="" disabled selected>Selecione uma sensação...</option>
                                <option value="misterio">Veludo denso que absorve a luz e envolve o corpo</option>
                                <option value="brilho">Texturas metálicas com reflexos de poeira estelar</option>
                                <option value="fluidez">Seda leve que flutua como em gravidade zero</option>
                            </select>
                        </div>

                        <div class="pergunta-group">
                            <label>3. Qual o seu ambiente espacial dos sonhos?</label>
                            <select id="p3" required>
                                <option value="" disabled selected>Selecione seu destino...</option>
                                <option value="misterio">O horizonte de eventos de um buraco negro</option>
                                <option value="brilho">O centro iluminado da galáxia Via Láctea</option>
                                <option value="fluidez">Os anéis de poeira e cristais de Saturno</option>
                            </select>
                        </div>

                        <button type="submit" class="btn-submit-quiz">🚀 Iniciar Mapeamento da Aura</button>
                    </form>
                </div>

                <div id="quiz-resultado" class="resultado-oculto" style="display: none;"></div>
            </div>

            <div class="materiais-guia-container">
                <div class="materiais-header">
                    <h3>🧪 Enciclopédia de Tecidos & Matéria-Prima</h3>
                    <p>Conheça a física e o caimento dos tecidos raros tecidos no ateliê.</p>
                </div>

                <div id="grid-materiais" class="materiais-grid">
                    </div>
            </div>

            <div style="text-align: center; margin-top: 50px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,
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

    // No seu configurarGatilhosNavegacao():
const linkExploracao = document.querySelector('nav.desktop-nav a[href="#Exploracao"]');
if (linkExploracao) {
    linkExploracao.setAttribute('onclick', "event.preventDefault(); mudarTela('exploracao');");
}

    const btnJornada = document.querySelector('.hero-content button');
    if (btnJornada) btnJornada.setAttribute('onclick', "mudarTela('login')");

        // Faz o link "Coleções" carregar a nova tela em vez de rolar a página
        const linkColecoes = document.querySelector('nav.desktop-nav a[href="#colecoes"]');
        if (linkColecoes) {
            linkColecoes.setAttribute('onclick', "event.preventDefault(); mudarTela('colecoes');");
        }
    
}
// ⚡ Função que consome o JSON e gera os mantos dinamicamente
async function carregarMantosDoJson() {
    try {
        const resposta = await fetch('produtos.json');
        const produtos = await resposta.json();

        const p1 = document.getElementById('galeria-p1');
        const p2 = document.getElementById('galeria-p2');

        if (!p1 || !p2) return;

        p1.innerHTML = '';
        p2.innerHTML = '';

        produtos.forEach((produto, index) => {
            const cardHTML = `
                <article class="product-item">
                    <div class="product-thumb">
                        <img src="${produto.imagem}" alt="${produto.alt}">
                    </div>
                    <div class="product-info-block">
                        <h4>${produto.titulo}</h4>
                        <p>${produto.descricao}</p>
                        <button type="button" class="btn-buy" onclick="alert('Conexão quântica estabelecida com ${produto.titulo}...')">Adquirir Manto</button>
                    </div>
                </article>
            `;

            // Distribui 6 itens na primeira página e o restante na segunda
            if (index < 6) {
                p1.innerHTML += cardHTML;
            } else {
                p2.innerHTML += cardHTML;
            }
        });
    } catch (erro) {
        console.error('Erro ao sintonizar o arquivo JSON de mantos:', erro);
    }
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
            } else if (nomeDaTela === 'colecoes') {
                carregarMantosDoJson(); // <--- INJEÇÃO DO JSON AQUI!
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
// Efeito de rolagem orbital no cabeçalho
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
// Rastro de Fótons Estelares no cursor
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
function revelarMantosEscondidos() {
    // Seleciona todos os cards que possuem a classe oculta
    const cardsExtras = document.querySelectorAll('.card-oculto');
    const botaoVerMais = document.getElementById('btn-ver-mais');

    cardsExtras.forEach((card, index) => {
        // Revela o elemento no fluxo do HTML mudando o display via classe
        card.classList.add('revelado');
        
        // Efeito Cascata: Adiciona um atraso milimétrico para cada card aparecer um depois do outro
        card.style.transitionDelay = `${index * 150}ms`;
    });

    // Desintegra o botão de Ver Mais suavemente já que todo o acervo foi revelado
    if (botaoVerMais) {
        botaoVerMais.style.opacity = '0';
        botaoVerMais.style.pointerEvents = 'none';
        setTimeout(() => {
            botaoVerMais.remove();
        }, 400);
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
        // Transição para a Página 2
        p1.classList.remove('ativa');
        setTimeout(() => {
            p2.classList.add('ativa');
            indicador.textContent = "Órbita 2 de 2";
            btnVoltar.removeAttribute('disabled');
            btnAvancar.setAttribute('disabled', 'true');
        }, 300);
    } else {
        // Retorno para a Página 1
        p2.classList.remove('ativa');
        setTimeout(() => {
            p1.classList.add('ativa');
            indicador.textContent = "Órbita 1 de 2";
            btnVoltar.setAttribute('disabled', 'true');
            btnAvancar.removeAttribute('disabled');
        }, 300);
    }

    // Move o foco de rolagem suavemente para o início do acervo
    const topoColecoes = document.querySelector('.catalogo-header');
    if (topoColecoes) topoColecoes.scrollIntoView({ behavior: 'smooth' });
}
function alternarPaginaColecao(numeroPagina) {
    const p1 = document.getElementById('galeria-p1');
    const p2 = document.getElementById('galeria-p2');
    const btnVoltar = document.getElementById('btn-voltar-ciclo');
    const btnAvancar = document.getElementById('btn-avancar-ciclo');
    const indicador = document.getElementById('indicador-orbita');

    // Validação de segurança se os elementos estão renderizados na tela
    if (!p1 || !p2) return;

    if (numeroPagina === 2) {
        // Desativa a página 1 e aguarda a transição de opacidade para ligar a página 2
        p1.classList.remove('ativa');
        setTimeout(() => {
            p2.classList.add('ativa');
            indicador.textContent = "Órbita 2 de 2";
            if(btnVoltar) btnVoltar.removeAttribute('disabled');
            if(btnAvancar) btnAvancar.setAttribute('disabled', 'true');
        }, 250);
    } else {
        // Desativa a página 2 e volta para a página 1
        p2.classList.remove('ativa');
        setTimeout(() => {
            p1.classList.add('ativa');
            indicador.textContent = "Órbita 1 de 2";
            if(btnVoltar) btnVoltar.setAttribute('disabled', 'true');
            if(btnAvancar) btnAvancar.removeAttribute('disabled');
        }, 250);
    }

    // Rola a tela suavemente de volta para o topo da boutique após a mudança
    const topoBoutique = document.querySelector('.catalogo-header');
    if (topoBoutique) {
        topoBoutique.scrollIntoView({ behavior: 'smooth' });
        
    } else if (nomeDaTela === 'colecoes') {
    carregarMantosDoJson();
}
}
// Base de dados do Guia de Materiais
const materiaisCelestine = [
    {
        id: "misterio",
        nome: "Veludo Negro de Buraco Negro",
        icone: "🌑",
        descricao: "Um veludo de alta densidade capaz de absorver 99% da luz ambiente. Confere toque aveludado, estrutura marcante e mistério absoluto.",
        caimento: "Estruturado / Pesado",
        origem: "Sintetizado sob alta pressão na Órbita de Cygnus X-1."
    },
    {
        id: "brilho",
        nome: "Jacquard de Titânio & Ouro Saturniano",
        icone: "🪐",
        descricao: "Fios metálicos trançados com fibras nobres. Reflete gradientes dourados conforme a luz do ambiente muda.",
        caimento: "Rígido / Nobre",
        origem: "Tecido artesanal nos anéis internos de Saturno."
    },
    {
        id: "fluidez",
        nome: "Seda Flutuante de Nebulosa",
        icone: "✨",
        descricao: "Seda ultraleve translúcida que reage ao menor movimento do ar. Imita o fluxo contínuo dos gases cósmicos em gravidade zero.",
        caimento: "Esvoaçante / Leve",
        origem: "Mapeado no coração da Nebulosa de Órion."
    }
];
// 1. Função que renderiza a lista de materiais
function carregarGuiaMateriais() {
    const grid = document.getElementById('grid-materiais');
    if (!grid) return;

    grid.innerHTML = '';

    materiaisCelestine.forEach(mat => {
        grid.innerHTML += `
            <article class="material-card">
                <div class="material-icon">${mat.icone}</div>
                <h4>${mat.nome}</h4>
                <p class="material-desc">${mat.descricao}</p>
                <div class="material-specs">
                    <span><strong>Caimento:</strong> ${mat.caimento}</span>
                    <span><strong>Origem:</strong> ${mat.origem}</span>
                </div>
            </article>
        `;
    });
}

// 2. Lógica do Quiz: Calcula a resposta predominante e revela o resultado
function calcularResultadoQuiz(event) {
    event.preventDefault();

    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    const p3 = document.getElementById('p3').value;

    // Contagem de votos para cada perfil
    const contagem = { misterio: 0, brilho: 0, fluidez: 0 };
    contagem[p1]++;
    contagem[p2]++;
    contagem[p3]++;

    // Descobre qual categoria teve mais escolhas
    let perfilVencedor = 'misterio';
    if (contagem.brilho > contagem[perfilVencedor]) perfilVencedor = 'brilho';
    if (contagem.fluidez > contagem[perfilVencedor]) perfilVencedor = 'fluidez';

    // Busca o material associado
    const materialRecomendado = materiaisCelestine.find(m => m.id === perfilVencedor);

    // Títulos de estilo baseados no resultado
    const titulosEstilo = {
        misterio: "🌘 Aura Eclipse (Misteriosa & Sobria)",
        brilho: "🪐 Aura Saturniana (Extravagante & Magnética)",
        fluidez: "✨ Aura Etérea (Fluida & Iluminada)"
    };

    const containerResultado = document.getElementById('quiz-resultado');
    const corpoQuiz = document.getElementById('quiz-corpo');

    corpoQuiz.style.display = 'none'; // Oculta o formulário

    containerResultado.innerHTML = `
        <div class="resultado-box">
            <h4>Seu Mapeamento Orbital:</h4>
            <h2 class="estilo-titulo">${titulosEstilo[perfilVencedor]}</h2>
            
            <div class="tecido-recomendado-card">
                <p><strong>Tecido Estelar Recomendado para a sua Aura:</strong></p>
                <h3>${materialRecomendado.icone} ${materialRecomendado.nome}</h3>
                <p>${materialRecomendado.descricao}</p>
            </div>

            <div class="resultado-acoes">
                <button type="button" class="btn-submit-login" onclick="mudarTela('agendamento')">🌙 Agendar Manto com este Tecido</button>
                <button type="button" class="btn-back-home" style="margin-top: 10px;" onclick="refazerQuiz()">🔄 Refazer Scanner</button>
            </div>
        </div>
    `;

    containerResultado.style.display = 'block';
}

function refazerQuiz() {
    document.getElementById('quiz-corpo').style.display = 'block';
    document.getElementById('quiz-resultado').style.display = 'none';
    document.getElementById('form-quiz').reset();
}