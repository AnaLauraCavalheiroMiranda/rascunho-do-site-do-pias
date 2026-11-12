// ==========================================
// CELESTINE ATELIÊ - SCRIPT FRONTEND (CLIENTE & SPA)
// ==========================================

const API_URL = 'http://localhost:3000/api';
let produtosGlobais = [];
let listaClientesCache = [];
let listaPedidosAdminCache = [];
let filtroStatusAlfaiateAtual = 'todos';

// Lista de peças clássicas/mais vendidas para sempre constarem no seletor de referência
const pecasDestaqueCatalogo = [
    "Vestido Saturniano Imperial",
    "Manto Eclipse Noturno",
    "Manto Via Láctea Translúcida",
    "Vestido Eclipse Total",
    "Terno Alinhamento Astral",
    "Corset Aurora Lunar"
];

// ==========================================
// 1. BASE DE DADOS DE MATÉRIAS-PRIMAS & TEXTURAS
// ==========================================
const materiaisCelestine = [
    {
        id: "misterio",
        nome: "Veludo Negro de Buraco Negro",
        icone: "🌑",
        tag: "Alta Densidade",
        subtitulo: "Densidade absoluta que absorve 99% da luz ambiente como o horizonte de eventos.",
        descricao: "Tecido de estrutura densa capaz de absorver 99% da luz ambiente. Projetado para trajes de alta imponência e presença marcante.",
        caimento: "Estruturado / Pesado",
        origem: "Órbita de Cygnus X-1",
        brilho: "0% (Absorção Total)",
        gramatura: "360 g/m²",
        cuidados: "Escovação suave no sentido do pelo; limpeza especializada a seco.",
        raridade: "Lendário",
        estiloAgendamento: "minimalista",
        estiloTrama: "repeating-radial-gradient(circle at 50% 50%, #261e3d 0px, #12131a 4px, #07080c 8px)",
        composicao: "78% Viscose de bambu de pelo duplo ultra-denso e 22% Seda estrutural na trama de urdume.",
        processo: "Tecido em teares de dupla felpa e submetido a navalhamento micrométrico seguido de vaporização direcional. As microfibras são inclinadas em ângulos opostos para aprisionar a luz e criar profundidade visual sem reflexos artificiais.",
        pecasLoja: [
            {
                nome: "Vestido Eclipse Total",
                detalhe: "Veludo negro profundo com recortes e detalhes em branco puro",
                destino: "colecoes"
            },
            {
                nome: "Manto Eclipse Noturno",
                detalhe: "Corte minimalista de caimento pesado e acabamento fosco",
                destino: "mais-vendidos"
            }
        ]
    },
    {
        id: "brilho",
        nome: "Jacquard de Ouro Saturniano",
        icone: "🪐",
        tag: "Fios Metálicos",
        subtitulo: "Relevos arquitetônicos banhados em fios metálicos que refletem a luz como os anéis de Saturno.",
        descricao: "Fios de titânio e microcristais trançados com fibras nobres. Reflete gradientes dourados vibrantes conforme a luz do ambiente oscila.",
        caimento: "Rígido / Imponente",
        origem: "Anéis Internos de Saturno",
        brilho: "95% (Reflexo Angular)",
        gramatura: "410 g/m²",
        cuidados: "Não dobrar sobre os relevos; armazenar em capa respirável e lavar a seco.",
        raridade: "Raro",
        estiloAgendamento: "brilhante",
        estiloTrama: "repeating-linear-gradient(-30deg, rgba(238,228,187,0.32) 0px, rgba(238,228,187,0.32) 3px, rgba(42,45,61,0.92) 3px, rgba(42,45,61,0.92) 10px)",
        composicao: "62% Algodão egípcio penteado, 23% Seda crua e 15% Filamentos de titânio dourado e microcristais.",
        processo: "Produzido em tear Jacquard programado exclusivamente para o Celestine Ateliê. Em vez de estampa superficial, cada órbita dourada é tecida em alto-relevo pelo entrelaçamento de fios extras de trama, levando cerca de 6 horas por metro.",
        pecasLoja: [
            {
                nome: "Vestido Saturniano Imperial",
                detalhe: "Camadas sobrepostas em anéis com aplicação manual de brilho dourado",
                destino: "mais-vendidos"
            },
            {
                nome: "Corset Aurora Lunar",
                detalhe: "Estrutura esculpida com acabamento perolado e sustentação imperial",
                destino: "colecoes"
            }
        ]
    },
    {
        id: "fluidez",
        nome: "Seda Flutuante de Nebulosa",
        icone: "✨",
        tag: "Gravidade Zero",
        subtitulo: "Leveza etérea que reage à menor corrente de ar, simulando gases cósmicos em gravidade zero.",
        descricao: "Seda ultraleve e translúcida que responde ao menor fluxo de ar, simulação visual contínua de gases cósmicos em flutuação.",
        caimento: "Esvoaçante / Ultra Leve",
        origem: "Nebulosa de Órion",
        brilho: "60% (Suave / Etéreo)",
        gramatura: "85 g/m² (19 Momme)",
        cuidados: "Vaporização indireta a baixa temperatura; evitar contato com superfícies ásperas.",
        raridade: "Épico",
        estiloAgendamento: "futurista",
        estiloTrama: "repeating-linear-gradient(45deg, rgba(154,155,193,0.22) 0px, rgba(154,155,193,0.22) 2px, transparent 2px, transparent 6px), radial-gradient(circle at 30% 30%, #4b3d7a, #1d1f2b 70%, rgba(238,228,187,0.25))",
        composicao: "90% Seda Mulberry pura de fios contínuos e 10% Microfilamentos furta-cor de celulose mineral.",
        processo: "Tecida em baixa tensão para preservar a elasticidade natural do casulo. O tingimento é artesanal por imersão gradual, criando nuances iridescentes entre lavanda e azul profundo sem uso de corantes pesados.",
        pecasLoja: [
            {
                nome: "Terno Alinhamento Astral",
                detalhe: "Cortes assimétricos com reflexos furta-cor de nebulosas",
                destino: "colecoes"
            },
            {
                nome: "Vestido Eclipse Total",
                detalhe: "Forro interno fluido para movimento contínuo em órbita",
                destino: "colecoes"
            }
        ]
    },
    {
        id: "plasma",
        nome: "Manta Magnética Aurora",
        icone: "🌌",
        tag: "Termocrômico",
        subtitulo: "Trama inteligente termocrômica que oscila entre lavanda e ciano conforme o calor do corpo.",
        descricao: "Tecido inteligente que altera sua tonalidade entre tons de lavanda e ciano de acordo com a temperatura corporal do tripulante.",
        caimento: "Moldável / Ajustável",
        origem: "Magnetosfera Polar",
        brilho: "80% (Iridescente)",
        gramatura: "220 g/m²",
        cuidados: "Lavar manualmente em água fria; secar à sombra longe de fontes de calor.",
        raridade: "Exclusivo",
        estiloAgendamento: "futurista",
        estiloTrama: "linear-gradient(125deg, rgba(0,240,255,0.25), rgba(157,78,221,0.35), rgba(26,28,36,0.9)), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, transparent 2px, transparent 6px)",
        composicao: "70% Microfibra de poliamida bio-sintética, 20% Elastano anatômico e 10% Microcápsulas termocrômicas.",
        processo: "Os fios passam por um banho de encapsulamento magnético antes da malharia circular de alta precisão. Quando aquecido pela pele do tripulante, o alinhamento molecular altera a refração da luz na superfície do manto.",
        pecasLoja: [
            {
                nome: "Terno Alinhamento Astral",
                detalhe: "Painéis laterais com transição cromática sob luz noturna",
                destino: "colecoes"
            }
        ]
    },
    {
        id: "cristal",
        nome: "Tule de Poeira Estelar",
        icone: "💎",
        tag: "Transparência",
        subtitulo: "Transparência cristalina incrustada com micro-partículas luminosas como constelações na pele.",
        descricao: "Tule finíssimo incrustado com micropartículas de quartzo estelar. Cria uma ilusão de constelações flutuando sobre a pele.",
        caimento: "Vaporoso / Delicado",
        origem: "Cinturão de Kuiper",
        brilho: "100% (Ponto de Luz)",
        gramatura: "48 g/m²",
        cuidados: "Lavagem delicada à mão sem torcer; guardar pendurado em cabide acolchoado.",
        raridade: "Raro",
        estiloAgendamento: "futurista",
        estiloTrama: "radial-gradient(circle at 20% 30%, #ffffff 1px, transparent 2px), radial-gradient(circle at 75% 65%, #EEE4BB 1.5px, transparent 2.5px), radial-gradient(circle at 50% 20%, #ffffff 1px, transparent 2px), repeating-linear-gradient(60deg, rgba(255,255,255,0.08) 0px, transparent 1px, transparent 5px), #1b1e2b",
        composicao: "92% Tule de seda francesa de trama hexagonal e 8% Microcristais de quartzo estelar termofixados.",
        processo: "Cada metro de tule hexagonal recebe a aplicação manual de micropartículas minerais facetadas em intervalos assimétricos, garantindo brilho cintilante sem comprometer a transparência nem pesar sobre o corpo.",
        pecasLoja: [
            {
                nome: "Manto Via Láctea Translúcida",
                detalhe: "Sobreposição translúcida com aplicação manual de microcristais celestes",
                destino: "mais-vendidos"
            },
            {
                nome: "Corset Aurora Lunar",
                detalhe: "Camada externa translúcida banhada a pó de pérola cósmica",
                destino: "colecoes"
            }
        ]
    },
    {
        id: "couro",
        nome: "Couro Sintético de Asteroide",
        icone: "☄️",
        tag: "Escudo Térmico",
        subtitulo: "Superfície esculpida em relevo mineral com acabamento acetinado fosco e isolamento térmico.",
        descricao: "Textura em relevo tridimensional com acabamento fosco. Oferece visual futurista urbano e proteção contra variações térmicas.",
        caimento: "Firme / Esculpido",
        origem: "Ateliê Orbital 09",
        brilho: "15% (Acabamento Satim)",
        gramatura: "480 g/m²",
        cuidados: "Higienizar com pano úmido macio; hidratar semestralmente com cera neutra.",
        raridade: "Comum",
        estiloAgendamento: "minimalista",
        estiloTrama: "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, #191b22 2px, #191b22 7px), radial-gradient(circle at 40% 40%, #343846, #14161d)",
        composicao: "65% Poliuretano vegetal de alta resistência, 25% Base de algodão orgânico trançado e 10% Resina mineral fosca.",
        processo: "Prensado a quente em cilindros gravados a laser que reproduzem micro-crateras de asteroides. O revestimento interno recebe malha respirável para conforto térmico em eventos de longa duração.",
        pecasLoja: [
            {
                nome: "Terno Alinhamento Astral",
                detalhe: "Gola estruturada e recortes arquitetônicos nos ombros",
                destino: "colecoes"
            },
            {
                nome: "Corset Aurora Lunar",
                detalhe: "Cintura marcada com acabamento estrutural de alta precisão",
                destino: "colecoes"
            }
        ]
    }
];

// ==========================================
// 2. DICIONÁRIO DE TELAS (SPA)
// ==========================================
const telasCelestine = {
    'orbita': null,

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

                        <button type="submit" class="btn-submit-quiz">🚀 Iniciar Mapeamento da Órbita</button>
                    </form>
                </div>

                <div id="quiz-resultado" class="resultado-oculto" style="display: none;"></div>
            </div>

            <div class="materiais-guia-container">
                <div class="materiais-header">
                    <h3>🧪 Enciclopédia de Tecidos & Matéria-Prima</h3>
                    <p>Clique em "Examinar Textura" para conhecer a composição, o processo artesanal e as peças criadas com cada trama.</p>
                </div>

                <div id="grid-materiais" class="materiais-grid"></div>
            </div>

            <div style="text-align: center; margin-top: 50px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,

    'mais-vendidos': `
        <section style="max-width: 1050px; margin: 40px auto; padding: 20px;">
            <h2 style="text-align: center; color: #fff; font-size: 2.2rem; margin-bottom: 10px;">👑 Mantos Mais Vendidos</h2>
            <p style="text-align: center; color: var(--lavender-glow); margin-bottom: 35px;">Os modelos autorais mais requisitados pelos tripulantes do ateliê.</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                
                <div style="background: rgba(38, 41, 52, 0.85); border: 1px solid var(--saturn-gold); border-radius: 20px; padding: 25px; text-align: center; position: relative;">
                    <span style="position: absolute; top: 15px; right: 15px; background: var(--saturn-gold); color: #000; font-size: 0.75rem; font-weight: bold; padding: 4px 10px; border-radius: 12px;">🏆 #1 Mais Pedido</span>
                    <div style="font-size: 3.5rem; margin: 15px 0 5px 0;">🪐</div>
                    <h3 style="color: #fff; font-size: 1.4rem;">Vestido Saturniano Imperial</h3>
                    <p style="color: var(--saturn-gold); font-size: 0.85rem; margin-bottom: 10px;">🌙 5.0 (24 avaliações)</p>
                    <p style="color: var(--lavender-glow); font-size: 0.9rem; margin-bottom: 15px;">Anéis e camadas sobrepostas com aplicação manual de brilho dourado estelar.</p>
                    <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 10px; margin-bottom: 15px; text-align: left; font-size: 0.85rem; color: #e0e0e0;">
                        <div>🧵 <strong>Tecido:</strong> Jacquard de Ouro</div>
                        <div>⏱️ <strong>Prazo:</strong> 15 dias orbitais</div>
                    </div>
                    <button onclick="iniciarAgendamentoComProduto('Vestido Saturniano Imperial')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
                    <button onclick="alternarFavorito('Vestido Saturniano Imperial', event)" style="background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 20px; padding: 8px 12px; margin-top: 10px; cursor: pointer; width: 100%; font-weight: bold;">
                        ❤️ Favoritar Manto
                    </button>
                </div>

                <div style="background: rgba(38, 41, 52, 0.85); border: 1px solid var(--glass-border); border-radius: 20px; padding: 25px; text-align: center; position: relative;">
                    <span style="position: absolute; top: 15px; right: 15px; background: rgba(154, 155, 193, 0.2); color: var(--lavender-glow); border: 1px solid var(--lavender-glow); font-size: 0.75rem; font-weight: bold; padding: 4px 10px; border-radius: 12px;">✨ Favorito</span>
                    <div style="font-size: 3.5rem; margin: 15px 0 5px 0;">🌘</div>
                    <h3 style="color: #fff; font-size: 1.4rem;">Manto Eclipse Noturno</h3>
                    <p style="color: var(--saturn-gold); font-size: 0.85rem; margin-bottom: 10px;">🌙 4.9 (18 avaliações)</p>
                    <p style="color: var(--lavender-glow); font-size: 0.9rem; margin-bottom: 15px;">Corte minimalista com caimento pesado e detalhes escuros refinados.</p>
                    <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 10px; margin-bottom: 15px; text-align: left; font-size: 0.85rem; color: #e0e0e0;">
                        <div>🧵 <strong>Tecido:</strong> Veludo Negro Encorpado</div>
                        <div>⏱️ <strong>Prazo:</strong> 10 dias orbitais</div>
                    </div>
                    <button onclick="iniciarAgendamentoComProduto('Manto Eclipse Noturno')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
                    <button onclick="alternarFavorito('Manto Eclipse Noturno', event)" style="background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 20px; padding: 8px 12px; margin-top: 10px; cursor: pointer; width: 100%; font-weight: bold;">
                        ❤️ Favoritar Manto
                    </button>
                </div>

                <div style="background: rgba(38, 41, 52, 0.85); border: 1px solid var(--glass-border); border-radius: 20px; padding: 25px; text-align: center; position: relative;">
                    <span style="position: absolute; top: 15px; right: 15px; background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid #00f0ff; font-size: 0.75rem; font-weight: bold; padding: 4px 10px; border-radius: 12px;">💎 Exclusivo</span>
                    <div style="font-size: 3.5rem; margin: 15px 0 5px 0;">✨</div>
                    <h3 style="color: #fff; font-size: 1.4rem;">Manto Via Láctea Translúcida</h3>
                    <p style="color: var(--saturn-gold); font-size: 0.85rem; margin-bottom: 10px;">🌙 5.0 (15 avaliações)</p>
                    <p style="color: var(--lavender-glow); font-size: 0.9rem; margin-bottom: 15px;">Tece transparência com aplicação manual de microcristais celestes.</p>
                    <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 10px; margin-bottom: 15px; text-align: left; font-size: 0.85rem; color: #e0e0e0;">
                        <div>🧵 <strong>Tecido:</strong> Tule de Cristais</div>
                        <div>⏱️ <strong>Prazo:</strong> 20 dias orbitais</div>
                    </div>
                    <button onclick="iniciarAgendamentoComProduto('Manto Via Láctea Translúcida')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
                    <button onclick="alternarFavorito('Manto Via Láctea Translúcida', event)" style="background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 20px; padding: 8px 12px; margin-top: 10px; cursor: pointer; width: 100%; font-weight: bold;">
                        ❤️ Favoritar Manto
                    </button>
                </div>

            </div>

            <div style="text-align: center; margin-top: 40px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,

    'agendamento': `
        <section id="Agendamento" class="agendamento-section" style="max-width: 820px; margin: 0 auto;">
            <h3>🌙 Ciclos Lunares: Reservar Atendimento</h3>
            <p class="form-subtitle">Sincronize sua frequência, escolha uma peça de inspiração e combine os tecidos do seu manto sob medida.</p>
            
            <div id="aviso-tecido-selecionado" style="display: none; background: rgba(238, 228, 187, 0.12); border: 1px solid var(--saturn-gold); color: var(--saturn-gold); padding: 14px 18px; border-radius: 12px; margin-bottom: 22px; font-size: 0.92rem; text-align: center;"></div>
            
            <form id="form-agendamento" onsubmit="processarAgendamentoEspacial(event)">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
                    <div>
                        <label for="nome">👤 Nome do Tripulante:</label>
                        <input type="text" id="nome" required placeholder="Ex: Comandante Silva">
                    </div>
                    <div>
                        <label for="email">📡 Frequência Digital (E-mail):</label>
                        <input type="email" id="email" required placeholder="seu-canal@galaxia.com">
                    </div>
                </div>

                <!-- PEÇA PARECIDA / MODELO DE REFERÊNCIA -->
                <div class="bloco-customizacao-pedido">
                    <div class="bloco-custom-header">
                        <label for="peca-referencia" style="font-weight: 600; color: var(--saturn-gold); font-size: 1rem;">
                            👗 Peça Parecida / Modelo de Inspiração
                        </label>
                        <span class="badge-opcional">Opcional</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-sub); margin-bottom: 10px;">
                        Selecione uma criação do ateliê como base de modelagem ou deixe em branco para um desenho 100% inédito.
                    </p>
                    <select id="peca-referencia">
                        <option value="">✨ Criação 100% Inédita (Sem peça base)</option>
                    </select>
                </div>

                <!-- ABA DE ESCOLHA DE TECIDOS (MÚLTIPLA ESCOLHA) -->
                <div class="bloco-customizacao-pedido">
                    <div class="bloco-custom-header">
                        <label style="font-weight: 600; color: var(--saturn-gold); font-size: 1rem;">
                            🧵 Escolha dos Tecidos (Selecione um ou mais)
                        </label>
                        <span id="contador-tecidos-selecionados" class="contador-tecidos-badge">0 selecionados</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-sub); margin-bottom: 14px;">
                        Combine diferentes matérias-primas (ex: estrutura em veludo + mangas em tule estelar).
                    </p>

                    <div id="seletor-tecidos-pedido" class="tecidos-selecao-grid">
                        <!-- Preenchido dinamicamente a partir de materiaisCelestine -->
                    </div>
                </div>

                <div>
                    <label for="Estilo">🌌 Atmosfera & Estilo do Pedido:</label>
                    <select id="Estilo">
                        <option value="minimalista">🌘 Eclipse (Minimalista e Escuro)</option>
                        <option value="brilhante">🪐 Saturniano (Anéis e Camadas Extravagantes)</option>
                        <option value="futurista">✨ Via Láctea (Brilho Máximo e Cristais)</option>
                    </select>
                </div>

                <div>
                    <label for="observacoes-pedido">📝 Como deseja combinar os tecidos ou adaptar a peça? (Opcional)</label>
                    <textarea id="observacoes-pedido" rows="3" placeholder="Ex: Gostaria do corte parecido com o Vestido Eclipse Total, mas usando Seda Flutuante de Nebulosa na saia e Tule de Poeira Estelar nas mangas..."></textarea>
                </div>

                <button type="submit" class="btn-submit-login">🚀 Transmitir Sinal do Pedido</button>
            </form>

            <div class="login-footer" style="margin-top: 30px; text-align: center;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `,

    'login': `
        <section class="login-section">
            <div class="login-box">
                <div class="login-header">
                    <h2 id="titulo-login-form">Identificação de Tripulante</h2>
                    <p id="subtitulo-login-form">Sincronize seus dados orbitais para acessar seus mantos cósmicos privados.</p>
                </div>

                <!-- FORMULÁRIO DE CADASTRO NOVO COM PALAVRA-PASSE -->
                <form id="form-cadastro" onsubmit="autenticarTripulante(event)">
                    <div class="input-group">
                        <label for="login-nome">👤 Nome do Tripulante</label>
                        <input type="text" id="login-nome" required placeholder="Comandante Silva">
                    </div>
                    <div class="input-group">
                        <label for="login-email">📡 Frequência Digital (E-mail)</label>
                        <input type="email" id="login-email" required placeholder="comandante@galaxia.com">
                    </div>
                    <div class="input-group">
                        <label for="login-senha">🔑 Palavra-passe</label>
                        <input type="password" id="login-senha" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn-submit-login">Cadastrar / Autenticar Assinatura</button>
                </form>

                <!-- FORMULÁRIO DE LOGIN EXISTENTE COM PALAVRA-PASSE -->
                <form id="form-login-existente" onsubmit="fazerLoginTripulante(event)" style="display: none;">
                    <div class="input-group">
                        <label for="login-existente-email">📡 Frequência Digital Registrada (E-mail)</label>
                        <input type="email" id="login-existente-email" required placeholder="comandante@galaxia.com">
                    </div>
                    <div class="input-group">
                        <label for="login-existente-senha">🔑 Palavra-passe</label>
                        <input type="password" id="login-existente-senha" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn-submit-login">🚀 Acessar Minha Conta</button>
                </form>

                <div class="login-footer">
                    <p id="texto-alternar-login" style="margin-bottom: 15px;">
                        Já possui registro no ateliê? 
                        <a href="#" onclick="event.preventDefault(); alternarModoLogin('login');">Entrar com conta existente</a>
                    </p>
                    <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
                </div>
            </div>
        </section>
    `,

    'cliente': `
        <section class="cliente-perfil-section" style="max-width: 900px; margin: 40px auto; padding: 20px;">
            <div style="background: rgba(38, 41, 52, 0.85); border: 1px solid var(--glass-border); border-radius: 24px; padding: 35px; text-align: center; backdrop-filter: blur(15px);">
                
                <!-- FOTO DE PERFIL -->
                <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 15px auto; cursor: pointer;" onclick="document.getElementById('input-foto').click()" title="Clique para alterar sua foto">
                    <img id="img-perfil" src="" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid var(--saturn-gold); display: none;">
                    <div id="avatar-padrao" style="font-size: 3.5rem; line-height: 110px; background: rgba(255,255,255,0.05); border-radius: 50%; border: 2px dashed var(--saturn-gold);">👨‍🚀</div>
                    <div style="position: absolute; bottom: 0; right: 0; background: var(--saturn-gold); color: #000; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: bold;">📷</div>
                </div>
                <input type="file" id="input-foto" accept="image/*" style="display: none;" onchange="salvarFotoPerfil(event)">
                <small style="color: var(--lavender-glow); display: block; margin-bottom: 15px; cursor: pointer;" onclick="document.getElementById('input-foto').click()">Clique na foto para alterar</small>

                <!-- DADOS BÁSICOS -->
                <h2 id="perfil-nome" style="font-size: 2rem; color: #fff; margin-top: 5px;">Nome do Tripulante</h2>
                <p id="perfil-email" style="color: var(--lavender-glow); margin-bottom: 15px;">email@galaxia.com</p>
                <span class="badge-status aprovado" style="font-size: 0.85rem;">Sintonizado em Órbita</span>

                <!-- FORMULÁRIO DE MEDIDAS -->
                <div style="margin-top: 30px; text-align: left; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 16px; padding: 20px;">
                    <h3 style="color: var(--saturn-gold); margin-bottom: 8px; font-size: 1.1rem;">📏 Minhas Medidas Estelares (Sob Medida)</h3>
                    <p style="font-size: 0.85rem; color: var(--lavender-glow); margin-bottom: 15px;">Preencha suas medidas para agilizar a confecção sob medida de seus mantos.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
                        <div>
                            <label style="font-size: 0.8rem; color: #fff;">Busto (cm):</label>
                            <input type="number" id="medida-busto" placeholder="ex: 90" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.3); color: #fff;">
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; color: #fff;">Cintura (cm):</label>
                            <input type="number" id="medida-cintura" placeholder="ex: 70" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.3); color: #fff;">
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; color: #fff;">Quadril (cm):</label>
                            <input type="number" id="medida-quadril" placeholder="ex: 98" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.3); color: #fff;">
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; color: #fff;">Altura (cm):</label>
                            <input type="number" id="medida-altura" placeholder="ex: 165" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--glass-border); background: rgba(0,0,0,0.3); color: #fff;">
                        </div>
                    </div>
                    <button onclick="salvarMedidasCliente()" style="margin-top: 15px; background: var(--saturn-gold); color: #000; border: none; padding: 8px 18px; border-radius: 20px; font-weight: bold; cursor: pointer;">✨ Salvar Medidas</button>
                </div>

                <!-- ABA DE MANTOS FAVORITOS DO CLIENTE -->
                <div style="margin-top: 30px; text-align: left; border-top: 1px solid var(--glass-border); padding-top: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h3 style="color: var(--saturn-gold); margin: 0;">❤️ Meus Mantos Favoritos</h3>
                        <span style="font-size: 0.8rem; color: var(--lavender-glow);">Salvos na sua galáxia privada</span>
                    </div>
                    <div id="lista-favoritos-cliente" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
                        <p style="color: var(--lavender-glow); grid-column: 1/-1; text-align: center;">Buscando seus mantos favoritos...</p>
                    </div>
                </div>

                <!-- HISTÓRICO DE PEDIDOS -->
                <div style="margin-top: 30px; text-align: left; border-top: 1px solid var(--glass-border); padding-top: 25px;">
                    <h3 style="color: var(--saturn-gold); margin-bottom: 15px;">📦 Peças Encomendadas & Histórico</h3>
                    <div id="lista-pedidos-cliente">
                        <p style="text-align: center; color: var(--lavender-glow);">Buscando pedidos...</p>
                    </div>
                </div>

                <!-- BOTÕES DE AÇÃO -->
                <div style="margin-top: 35px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <button class="btn-submit-login" onclick="mudarTela('agendamento')" style="max-width: 220px; padding: 12px;">🌙 Novo Pedido</button>
                    <button class="btn-back-home" onclick="desconectarTripulante()" style="border-color: #ff5252 !important; color: #ff5252 !important; margin: 0; padding: 12px 24px;">🚪 Sair da Conta</button>
                </div>
            </div>
        </section>
    `,

    'admin': `
        <section class="admin-dashboard-section" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
            <div class="admin-header" style="text-align: center; margin-bottom: 25px;">
                <h2>🛸 Centro de Comando Admin</h2>
                <p style="color: var(--lavender-glow);">Painel central de controle e bancada técnica do ateliê estelar.</p>
            </div>

            <!-- SUB-BOTÕES DE NAVEGAÇÃO INTERNA NO ADMIN -->
            <div class="admin-sub-menu" style="display: flex; justify-content: center; gap: 12px; margin-bottom: 30px; flex-wrap: wrap;">
                <button class="btn-sub-admin active" onclick="mudarSubAbaAdmin('pedidos')">
                    📦 Pedidos & Estatísticas
                </button>
                <button class="btn-sub-admin" onclick="mudarSubAbaAdmin('alfaiate')">
                    ✂️ Bancada do Alfaiate
                </button>
                <button class="btn-sub-admin" onclick="mudarSubAbaAdmin('consulta')">
                    📋 Consultar Clientes
                </button>
                <button class="btn-sub-admin" onclick="mudarSubAbaAdmin('edicao')">
                    ✏️ Alterar Dados
                </button>
            </div>

            <!-- ABA 1: PEDIDOS, MÉTRICAS E CALENDÁRIO -->
            <div id="sub-aba-pedidos" class="sub-aba-conteudo" style="display: block;">
                <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
                    <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px solid var(--glass-border); text-align: center;">
                        <small style="color: var(--lavender-glow);">Total de Pedidos</small>
                        <h3 id="metric-total" style="font-size: 2em; margin: 5px 0; color: #fff;">0</h3>
                    </div>
                    <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #ffc107; text-align: center;">
                        <small style="color: #ffc107;">⌛ Pendentes</small>
                        <h3 id="metric-pendentes" style="font-size: 2em; margin: 5px 0; color: #ffc107;">0</h3>
                    </div>
                    <div style="background: rgba(40, 167, 69, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #28a745; text-align: center;">
                        <small style="color: #28a745;">✅ Aprovados</small>
                        <h3 id="metric-aprovados" style="font-size: 2em; margin: 5px 0; color: #28a745;">0</h3>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                        <h3 style="color: #fff; margin-bottom: 15px;">📊 Distribuição dos Pedidos</h3>
                        <canvas id="graficoPedidos" style="max-height: 250px;"></canvas>
                    </div>

                    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                        <h3 id="titulo-calendario" style="color: #fff; margin-bottom: 15px;">🗓️ Calendário de Atendimento</h3>
                        <div id="grid-calendario" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; margin-top: 15px; text-align: center;"></div>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                    <h3 style="color: #fff; margin-bottom: 15px;">📜 Aprovação & Gestão de Pedidos</h3>
                    <div id="tabela-pedidos-admin" style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;"></div>
                </div>
            </div>

            <!-- ABA 2: BANCADA DO ALFAIATE (FICHAS TÉCNICAS COMPLETAS) -->
            <div id="sub-aba-alfaiate" class="sub-aba-conteudo" style="display: none;">
                <div class="bancada-alfaiate-wrapper">
                    <div class="bancada-header">
                        <div>
                            <h3>✂️ Bancada do Alfaiate — Fichas Técnicas</h3>
                            <p style="color: var(--text-sub); font-size: 0.92rem;">
                                Visualize os tecidos combinados, a peça de referência, as medidas corporais e o que cada cliente escreveu.
                            </p>
                        </div>

                        <div class="bancada-controles">
                            <input type="text" id="busca-alfaiate" placeholder="🔍 Filtrar cliente, tecido ou peça..." oninput="renderizarFichasAlfaiate()" style="padding: 9px 16px; border-radius: 20px; font-size: 0.85rem; min-width: 240px;">
                            <div class="filtros-status-alfaiate">
                                <button type="button" class="btn-filtro-status active" data-status="todos" onclick="filtrarStatusAlfaiate('todos', this)">Todos</button>
                                <button type="button" class="btn-filtro-status" data-status="pendente" onclick="filtrarStatusAlfaiate('pendente', this)">⏳ Pendentes</button>
                                <button type="button" class="btn-filtro-status" data-status="aprovado" onclick="filtrarStatusAlfaiate('aprovado', this)">✅ Em Confecção</button>
                            </div>
                        </div>
                    </div>

                    <div id="lista-fichas-alfaiate" class="fichas-alfaiate-grid">
                        <p style="text-align: center; color: var(--lavender-glow); padding: 25px;">Carregando fichas de costura...</p>
                    </div>
                </div>
            </div>

            <!-- ABA 3: CONSULTA DE CLIENTES -->
            <div id="sub-aba-consulta" class="sub-aba-conteudo" style="display: none;">
                <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 16px; border: 1px solid var(--glass-border);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                        <h3 style="color: #fff; margin: 0;">👥 Tripulantes Cadastrados</h3>
                        <input type="text" id="filtro-cliente-admin" placeholder="🔍 Buscar nome ou e-mail..." oninput="filtrarClientesAdmin()" style="padding: 8px 14px; border-radius: 20px; font-size: 0.85rem; width: 260px;">
                    </div>

                    <div id="tabela-clientes-admin" style="display: flex; flex-direction: column; gap: 12px;">
                        <p style="text-align: center; color: var(--lavender-glow);">Carregando tripulantes...</p>
                    </div>
                </div>
            </div>

            <!-- ABA 4: ALTERAÇÃO / EDIÇÃO DE CLIENTES -->
            <div id="sub-aba-edicao" class="sub-aba-conteudo" style="display: none;">
                <div style="background: rgba(38, 41, 52, 0.95); border: 1px solid var(--saturn-gold); border-radius: 20px; padding: 25px; backdrop-filter: blur(10px);">
                    <h3 style="color: var(--saturn-gold); margin-bottom: 15px;">✏️ Formulário de Alteração de Dados</h3>
                    
                    <form id="form-edicao-admin" onsubmit="salvarEdicaoClienteAdmin(event)">
                        <input type="hidden" id="admin-edit-id">

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
                            <div>
                                <label style="color: #fff; font-size: 0.85rem;">Nome Completo:</label>
                                <input type="text" id="admin-edit-nome" required style="width: 100%; padding: 10px; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="color: #fff; font-size: 0.85rem;">E-mail (Frequência Digital):</label>
                                <input type="email" id="admin-edit-email" required style="width: 100%; padding: 10px; border-radius: 8px;">
                            </div>
                        </div>

                        <h4 style="color: var(--saturn-gold); margin-top: 15px; font-size: 0.95rem;">📏 Medidas Estelares (cm)</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-top: 8px;">
                            <div>
                                <label style="color: #fff; font-size: 0.8rem;">Busto:</label>
                                <input type="number" id="admin-edit-busto" placeholder="90" style="width: 100%; padding: 8px; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="color: #fff; font-size: 0.8rem;">Cintura:</label>
                                <input type="number" id="admin-edit-cintura" placeholder="70" style="width: 100%; padding: 8px; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="color: #fff; font-size: 0.8rem;">Quadril:</label>
                                <input type="number" id="admin-edit-quadril" placeholder="98" style="width: 100%; padding: 8px; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="color: #fff; font-size: 0.8rem;">Altura:</label>
                                <input type="number" id="admin-edit-altura" placeholder="165" style="width: 100%; padding: 8px; border-radius: 8px;">
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button type="submit" class="btn-submit-login" style="padding: 10px 20px;">💾 Salvar Alterações</button>
                            <button type="button" class="btn-back-home" style="margin: 0;" onclick="mudarSubAbaAdmin('consulta')">❌ Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
            </div>
        </section>
    `
};

// ==========================================
// 3. INICIALIZAÇÃO & NAVEGAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
        telasCelestine['orbita'] = mainEl.innerHTML;
    }
    configurarGatilhosNavegacao();
    atualizarBotaoSessaoCabecalho();

    const linkPedidos = document.querySelector('aside#sidePanel a[href="#pedidos"]');
    if (linkPedidos) linkPedidos.setAttribute('onclick', "event.preventDefault(); abrirCaixaDePedidos();");

    const linkClientes = document.querySelector('aside#sidePanel a[href="#clientes"]');
    if (linkClientes) linkClientes.setAttribute('onclick', "event.preventDefault(); abrirCaixaDeClientes();");

    const linkAdmin = document.querySelector('a[href="#admin"]');
    if (linkAdmin) linkAdmin.setAttribute('onclick', "event.preventDefault(); mudarTela('admin');");

    if (localStorage.getItem('siteTheme') === 'lunar') {
        document.body.classList.add('light-mode');
        const icon = document.getElementById('themeIcon');
        const text = document.getElementById('themeText');
        if (icon) icon.textContent = '🪐';
        if (text) text.textContent = 'Modo Saturno';
    }
});

function toggleMenu() {
    const sidePanel = document.getElementById('sidePanel');
    if (sidePanel) {
        atualizarVisibilidadeMenuLateral();
        sidePanel.classList.toggle('open');
    }
}

function configurarGatilhosNavegacao() {
    atualizarBotaoSessaoCabecalho();

    const linkOrbita = document.querySelector('nav.desktop-nav a[href="#inicio"]');
    if (linkOrbita) linkOrbita.setAttribute('onclick', "event.preventDefault(); mudarTela('orbita');");

    const linkColecoes = document.querySelector('nav.desktop-nav a[href="#colecoes"]');
    if (linkColecoes) linkColecoes.setAttribute('onclick', "event.preventDefault(); mudarTela('colecoes');");

    const linkAtelie = document.querySelector('nav.desktop-nav a[href="#atelie"]');
    if (linkAtelie) linkAtelie.setAttribute('onclick', "event.preventDefault(); mudarTela('atelie');");

    const linkCiclosLunares = document.querySelector('nav.desktop-nav a[href="#Agendamento"]');
    if (linkCiclosLunares) linkCiclosLunares.setAttribute('onclick', "event.preventDefault(); mudarTela('agendamento');");

    const linkExploracao = document.querySelector('nav.desktop-nav a[href="#Exploracao"]');
    if (linkExploracao) linkExploracao.setAttribute('onclick', "event.preventDefault(); mudarTela('exploracao');");

    const btnJornada = document.querySelector('.hero-content button');
    if (btnJornada) btnJornada.setAttribute('onclick', "mudarTela('login')");
}

function mudarTela(nomeDaTela, callbackPosRender) {
    const containerPrincipal = document.querySelector('main');
    if (!containerPrincipal) return;

    if (telasCelestine[nomeDaTela] !== undefined) {
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel && sidePanel.classList.contains('open')) {
            sidePanel.classList.remove('open');
        }

        containerPrincipal.style.opacity = 0;
        
        setTimeout(async () => {
            containerPrincipal.innerHTML = telasCelestine[nomeDaTela];
            
            if (nomeDaTela === 'orbita') {
                configurarGatilhosNavegacao();
            } else if (nomeDaTela === 'colecoes') {
                await carregarMantosDoJson();
            } else if (nomeDaTela === 'exploracao') {
                carregarGuiaMateriais();
            } else if (nomeDaTela === 'admin') {
                await carregarPainelAdmin();
            } else if (nomeDaTela === 'cliente') {
                await carregarPerfilCliente();
            } else if (nomeDaTela === 'agendamento') {
                await inicializarTelaAgendamento();
            }

            if (typeof callbackPosRender === 'function') {
                callbackPosRender();
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            containerPrincipal.style.opacity = 1;
        }, 200);
    }
}

// ==========================================
// 4. GESTÃO DE SESSÃO E USUÁRIO
// ==========================================

function obterClienteLogado() {
    const dados = localStorage.getItem('celestine_cliente');
    return dados ? JSON.parse(dados) : null;
}

function atualizarBotaoSessaoCabecalho() {
    atualizarVisibilidadeMenuLateral();

    const btnLogin = document.querySelector('.btn-space-login');
    if (!btnLogin) return;

    const clienteLogado = obterClienteLogado();
    if (clienteLogado) {
        if (clienteLogado.foto) {
            btnLogin.innerHTML = `<img src="${clienteLogado.foto}" alt="Perfil" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--saturn-gold); display: block;">`;
            btnLogin.style.padding = '4px';
            btnLogin.style.borderRadius = '50%';
            btnLogin.style.width = '46px';
            btnLogin.style.height = '46px';
            btnLogin.style.display = 'flex';
            btnLogin.style.alignItems = 'center';
            btnLogin.style.justifyContent = 'center';
        } else {
            btnLogin.innerHTML = `👨‍🚀 ${clienteLogado.nome.split(' ')[0]}`;
            btnLogin.style.padding = '8px 20px';
            btnLogin.style.borderRadius = '30px';
            btnLogin.style.width = 'auto';
            btnLogin.style.height = 'auto';
        }
        btnLogin.setAttribute('onclick', "mudarTela('cliente')");
    } else {
        btnLogin.innerHTML = 'Entrar no Espaço';
        btnLogin.style.padding = '14px 34px';
        btnLogin.style.borderRadius = '30px';
        btnLogin.style.width = 'auto';
        btnLogin.style.height = 'auto';
        btnLogin.setAttribute('onclick', "mudarTela('login')");
    }
}

function desconectarTripulante() {
    localStorage.removeItem('celestine_cliente');
    atualizarBotaoSessaoCabecalho();
    alert('🚪 Sessão encerrada com sucesso.');
    mudarTela('orbita');
}

function alternarModoLogin(modo) {
    const formCadastro = document.getElementById('form-cadastro');
    const formLogin = document.getElementById('form-login-existente');
    const titulo = document.getElementById('titulo-login-form');
    const subtitulo = document.getElementById('subtitulo-login-form');
    const textoAlternar = document.getElementById('texto-alternar-login');

    if (modo === 'login') {
        if (formCadastro) formCadastro.style.display = 'none';
        if (formLogin) formLogin.style.display = 'flex';
        if (titulo) titulo.innerText = "Acessar Conta de Tripulante";
        if (subtitulo) subtitulo.innerText = "Digite seu e-mail e palavra-passe cadastrados para sintonizar sua sessão.";
        if (textoAlternar) textoAlternar.innerHTML = `Não tem uma assinatura ainda? <a href="#" onclick="event.preventDefault(); alternarModoLogin('cadastro');">Criar novo cadastro</a>`;
    } else {
        if (formCadastro) formCadastro.style.display = 'flex';
        if (formLogin) formLogin.style.display = 'none';
        if (titulo) titulo.innerText = "Identificação de Tripulante";
        if (subtitulo) subtitulo.innerText = "Sincronize seus dados orbitais para acessar seus mantos cósmicos privados.";
        if (textoAlternar) textoAlternar.innerHTML = `Já possui registro no ateliê? <a href="#" onclick="event.preventDefault(); alternarModoLogin('login');">Entrar com conta existente</a>`;
    }
}

async function autenticarTripulante(event) {
    event.preventDefault();
    const nome = document.getElementById('login-nome').value;
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        const resposta = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            const cliente = { id: dados.id, nome, email };
            localStorage.setItem('celestine_cliente', JSON.stringify(cliente));
            atualizarBotaoSessaoCabecalho();
            alert(`⚡ Tripulante ${nome} cadastrado com sucesso!`);
            mudarTela('cliente');
        } else {
            alert(`⚠️ Aviso: ${dados.erro || 'Erro ao realizar cadastro.'}`);
        }
    } catch (erro) {
        alert('❌ Falha ao conectar ao servidor Node.js.');
    }
}

async function fazerLoginTripulante(event) {
    event.preventDefault();
    const email = document.getElementById('login-existente-email').value;
    const senha = document.getElementById('login-existente-senha').value;

    try {
        const resposta = await fetch(`${API_URL}/clientes/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('celestine_cliente', JSON.stringify(dados.cliente));
            atualizarBotaoSessaoCabecalho();
            alert(`🚀 Bem-vindo(a) de volta, Comandante ${dados.cliente.nome}!`);
            mudarTela('cliente');
        } else {
            alert(`❌ ${dados.erro || 'Falha no login.'}`);
        }
    } catch (erro) {
        alert('❌ Falha na conexão com o servidor.');
    }
}

async function atualizarVisibilidadeMenuLateral() {
    const itemPedidos = document.getElementById('menu-item-pedidos');
    const itemClientes = document.getElementById('menu-item-clientes');
    const itemAdmin = document.getElementById('menu-item-admin');
    
    const headerUser = document.getElementById('user-drawer-header');
    const elAvatar = document.getElementById('user-drawer-avatar');
    const elNome = document.getElementById('user-drawer-nome');
    const elEmail = document.getElementById('user-drawer-email');
    const btnLogout = document.getElementById('btn-logout-drawer');
    const itensCliente = document.querySelectorAll('.item-cliente-only');
    const timelineCard = document.getElementById('user-timeline-card');

    const clienteLogado = obterClienteLogado();

    if (clienteLogado) {
        if (itemPedidos) itemPedidos.style.display = 'none';
        if (itemClientes) itemClientes.style.display = 'none';
        if (itemAdmin) itemAdmin.style.display = 'none';

        itensCliente.forEach(el => el.style.display = 'block');
        if (btnLogout) btnLogout.style.display = 'block';

        if (headerUser) {
            headerUser.style.display = 'block';
            if (elNome) elNome.innerText = clienteLogado.nome;
            if (elEmail) elEmail.innerText = `📡 ${clienteLogado.email}`;

            if (clienteLogado.foto && elAvatar) {
                elAvatar.innerHTML = `<img src="${clienteLogado.foto}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--saturn-gold);">`;
            } else if (elAvatar) {
                elAvatar.innerHTML = '👨‍🚀';
            }
        }

        atualizarVipGamificacao(clienteLogado);

        if (timelineCard) {
            timelineCard.style.display = 'block';
            carregarTimelinePedidoMenu(clienteLogado.email);
        }
    } else {
        if (itemPedidos) itemPedidos.style.display = 'block';
        if (itemClientes) itemClientes.style.display = 'block';
        if (itemAdmin) itemAdmin.style.display = 'block';

        itensCliente.forEach(el => el.style.display = 'none');
        if (headerUser) headerUser.style.display = 'none';
        if (btnLogout) btnLogout.style.display = 'none';
        if (timelineCard) timelineCard.style.display = 'none';
    }
}

// ==========================================
// 5. SISTEMA DE FAVORITOS
// ==========================================

function obterFavoritosCliente(email) {
    if (!email) return [];
    return JSON.parse(localStorage.getItem(`favoritos_${email}`) || '[]');
}

function salvarFavoritosCliente(email, favoritos) {
    if (!email) return;
    localStorage.setItem(`favoritos_${email}`, JSON.stringify(favoritos));
}

function ehFavorito(tituloManto) {
    const cliente = obterClienteLogado();
    if (!cliente) return false;
    const favoritos = obterFavoritosCliente(cliente.email);
    return favoritos.includes(tituloManto);
}

function alternarFavorito(tituloManto, event) {
    if (event) event.stopPropagation();

    const cliente = obterClienteLogado();
    if (!cliente) {
        alert('⚠️ É necessário estar cadastrado e logado para favoritar um manto!\nSintonize sua conta para salvar suas peças preferidas.');
        mudarTela('login');
        return;
    }

    let favoritos = obterFavoritosCliente(cliente.email);

    if (favoritos.includes(tituloManto)) {
        favoritos = favoritos.filter(item => item !== tituloManto);
        alert(`💔 Manto "${tituloManto}" removido dos seus favoritos.`);
    } else {
        favoritos.push(tituloManto);
        alert(`❤️ Manto "${tituloManto}" adicionado aos seus favoritos estelares!`);
    }

    salvarFavoritosCliente(cliente.email, favoritos);
    carregarFavoritosNoPerfil();
    atualizarVipGamificacao(cliente);
}

function carregarFavoritosNoPerfil() {
    const container = document.getElementById('lista-favoritos-cliente');
    if (!container) return;

    const cliente = obterClienteLogado();
    if (!cliente) {
        container.innerHTML = '<p style="color: var(--lavender-glow); grid-column: 1/-1; text-align: center;">Faça login para ver seus favoritos.</p>';
        return;
    }

    const favoritos = obterFavoritosCliente(cliente.email);

    if (favoritos.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--glass-border);">
                <p style="color: var(--lavender-glow); margin: 0;">Você ainda não favoritou nenhum manto.</p>
                <button onclick="mudarTela('colecoes')" style="margin-top: 10px; background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 20px; padding: 6px 16px; cursor: pointer;">✨ Explorar Coleções</button>
            </div>
        `;
        return;
    }

    container.innerHTML = favoritos.map(manto => {
        const mantoEscapado = manto.replace(/'/g, "\\'");
        return `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: 14px; padding: 18px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
                <div>
                    <div style="font-size: 2.2rem; margin-bottom: 5px;">✨</div>
                    <strong style="color: #fff; font-size: 1rem; display: block; margin-bottom: 5px;">${manto}</strong>
                    <span style="font-size: 0.75rem; color: var(--saturn-gold);">Manto Autoral Salvo</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px;">
                    <button onclick="iniciarAgendamentoComProduto('${mantoEscapado}')" style="background: var(--saturn-gold); color: #000; border: none; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">🌙 Agendar Prova</button>
                    <button onclick="alternarFavorito('${mantoEscapado}')" style="background: rgba(255,82,82,0.15); color: #ff5252; border: 1px solid #ff5252; padding: 6px; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">💔 Remover dos Favoritos</button>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// 6. PERFIL DO CLIENTE, FOTO & MEDIDAS
// ==========================================

function salvarFotoPerfil(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
        const fotoBase64 = e.target.result;
        const cliente = obterClienteLogado();
        if (!cliente) return;

        cliente.foto = fotoBase64;
        localStorage.setItem('celestine_cliente', JSON.stringify(cliente));

        const imgPerfil = document.getElementById('img-perfil');
        const avatarPadrao = document.getElementById('avatar-padrao');
        if (imgPerfil && avatarPadrao) {
            imgPerfil.src = fotoBase64;
            imgPerfil.style.display = 'block';
            avatarPadrao.style.display = 'none';
        }

        atualizarBotaoSessaoCabecalho();

        try {
            await fetch(`${API_URL}/clientes/${cliente.id}/foto`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foto: fotoBase64 })
            });
        } catch (err) {
            console.warn('Foto salva localmente no navegador.');
        }
    };
    reader.readAsDataURL(arquivo);
}

async function salvarMedidasCliente() {
    const cliente = obterClienteLogado();
    if (!cliente) return;

    const busto = document.getElementById('medida-busto').value;
    const cintura = document.getElementById('medida-cintura').value;
    const quadril = document.getElementById('medida-quadril').value;
    const altura = document.getElementById('medida-altura').value;

    cliente.busto = busto;
    cliente.cintura = cintura;
    cliente.quadril = quadril;
    cliente.altura = altura;

    localStorage.setItem('celestine_cliente', JSON.stringify(cliente));

    try {
        await fetch(`${API_URL}/clientes/${cliente.id}/medidas`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ busto, cintura, quadril, altura })
        });
        alert('📐 Medidas salvas com sucesso!');
    } catch (err) {
        alert('✨ Medidas salvas localmente!');
    }
}

async function carregarPerfilCliente() {
    const cliente = obterClienteLogado();
    if (!cliente) {
        mudarTela('login');
        return;
    }

    const elNome = document.getElementById('perfil-nome');
    const elEmail = document.getElementById('perfil-email');
    const imgPerfil = document.getElementById('img-perfil');
    const avatarPadrao = document.getElementById('avatar-padrao');
    const containerPedidos = document.getElementById('lista-pedidos-cliente');

    if (elNome) elNome.innerText = cliente.nome;
    if (elEmail) elEmail.innerText = `📡 ${cliente.email}`;

    if (cliente.foto && imgPerfil && avatarPadrao) {
        imgPerfil.src = cliente.foto;
        imgPerfil.style.display = 'block';
        avatarPadrao.style.display = 'none';
    }

    if (cliente.busto && document.getElementById('medida-busto')) document.getElementById('medida-busto').value = cliente.busto;
    if (cliente.cintura && document.getElementById('medida-cintura')) document.getElementById('medida-cintura').value = cliente.cintura;
    if (cliente.quadril && document.getElementById('medida-quadril')) document.getElementById('medida-quadril').value = cliente.quadril;
    if (cliente.altura && document.getElementById('medida-altura')) document.getElementById('medida-altura').value = cliente.altura;

    carregarFavoritosNoPerfil();

    if (containerPedidos) {
        try {
            const res = await fetch(`${API_URL}/pedidos/cliente/${encodeURIComponent(cliente.email)}`);
            const pedidos = await res.json();

            if (!pedidos || pedidos.length === 0) {
                containerPedidos.innerHTML = '<p style="text-align:center; padding: 10px; color: var(--lavender-glow);">Você ainda não possui pedidos registrados nesta conta.</p>';
            } else {
                containerPedidos.innerHTML = pedidos.map(p => `
                    <div class="card-pedido-item" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                        <div>
                            <strong>#${p.id} ${p.estilo}</strong><br>
                            <small style="color: var(--lavender-glow);">${p.data ? new Date(p.data).toLocaleDateString('pt-BR') : 'Recente'}</small>
                        </div>
                        <span class="badge-status ${(p.status || 'pendente').toLowerCase()}">${p.status || 'Pendente'}</span>
                    </div>
                `).join('');
            }
        } catch (err) {
            containerPedidos.innerHTML = '<p style="color: #ff5252; text-align: center;">Erro ao carregar histórico de pedidos.</p>';
        }
    }
}

// ==========================================
// 7. BOUTIQUE & COLEÇÕES DE PRODUTOS
// ==========================================

async function carregarMantosDoJson() {
    try {
        const resposta = await fetch('produtos.json');
        produtosGlobais = await resposta.json();

        const p1 = document.getElementById('galeria-p1');
        const p2 = document.getElementById('galeria-p2');

        if (!p1 || !p2) return;

        p1.innerHTML = '';
        p2.innerHTML = '';

        produtosGlobais.forEach((produto, index) => {
            const favoritado = ehFavorito(produto.titulo);
            const iconeFav = favoritado ? '❤️ Favoritado' : '🤍 Favoritar';
            const tituloEscapado = produto.titulo.replace(/'/g, "\\'");

            const cardHTML = `
                <article class="product-item" onclick="verDetalhesProduto(${index})" style="cursor: pointer; position: relative;">
                    <div class="product-thumb">
                        <img src="${produto.imagem}" alt="${produto.alt}">
                    </div>
                    <div class="product-info-block">
                        <h4>${produto.titulo}</h4>
                        <p>${produto.descricao}</p>
                        
                        <div style="display: flex; gap: 8px; margin-top: 12px;">
                            <button type="button" class="btn-buy" style="flex: 1;" onclick="event.stopPropagation(); verDetalhesProduto(${index})">
                                ✨ Ver Detalhes
                            </button>
                            <button type="button" onclick="alternarFavorito('${tituloEscapado}', event)" style="background: rgba(255,255,255,0.05); border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 8px; padding: 6px 12px; font-size: 0.85rem; cursor: pointer; white-space: nowrap;">
                                ${iconeFav}
                            </button>
                        </div>
                    </div>
                </article>
            `;

            if (index < 9) {
                p1.innerHTML += cardHTML;
            } else {
                p2.innerHTML += cardHTML;
            }
        });
    } catch (erro) {
        console.warn('produtos.json não carregado ou sem dados.');
    }
}

function verDetalhesProduto(index) {
    const produto = produtosGlobais[index];
    if (!produto) return;

    const containerPrincipal = document.querySelector('main');
    const precoEstimado = produto.preco || "R$ 1.850,00 - R$ 2.400,00 (Sob Medida)";
    const tempoConfeccao = produto.tempo || "15 a 20 Dias Orbitais";
    const favoritado = ehFavorito(produto.titulo);
    const tituloEscapado = produto.titulo.replace(/'/g, "\\'");

    const htmlDetalhes = `
        <section class="produto-detalhe-section">
            <button class="btn-back-home" style="margin-bottom: 25px;" onclick="mudarTela('colecoes')">
                ◀ Voltar às Coleções
            </button>

            <div class="produto-detalhe-grid">
                <div class="detalhe-imagem-container">
                    <img src="${produto.imagem}" alt="${produto.alt}" class="detalhe-img-principal">
                    <div class="detalhe-badge-selo">🌌 Peça Autoral Exclusiva</div>
                </div>

                <div class="detalhe-info-container">
                    <span class="detalhe-categoria">Boutique Interplanetária</span>
                    <h2>${produto.titulo}</h2>
                    
                    <div class="detalhe-preco-box">
                        <span class="preco-label">Investimento Médio Estimado:</span>
                        <h3 class="preco-valor">${precoEstimado}</h3>
                    </div>

                    <p class="detalhe-descricao-longa">
                        ${produto.descricao} Confeccionado com técnicas de alfaiataria de alta precisão e modelagem ergonômica ajustada às frequências de movimento do tripulante.
                    </p>

                    <div class="detalhe-especificacoes">
                        <div class="espec-item">
                            <span>⏳ <strong>Tempo de Confecção:</strong></span>
                            <span>${tempoConfeccao}</span>
                        </div>
                        <div class="espec-item">
                            <span>✂️ <strong>Ajustes:</strong></span>
                            <span>Provas Presenciais / Virtuais</span>
                        </div>
                        <div class="espec-item">
                            <span>📡 <strong>Atendimento:</strong></span>
                            <span>Personal Stylist Dedicado</span>
                        </div>
                    </div>

                    <div class="detalhe-acoes-group">
                        <button type="button" class="btn-submit-quiz" onclick="iniciarAgendamentoComProduto('${tituloEscapado}')">
                            🌙 Agendar Prova & Escolher Tecidos Desta Peça
                        </button>

                        <button type="button" onclick="alternarFavorito('${tituloEscapado}', event)" style="margin-top: 10px; background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 12px; padding: 12px; font-weight: bold; cursor: pointer; width: 100%;">
                            ${favoritado ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Meus Favoritos'}
                        </button>

                        <button type="button" class="btn-interagir-material" style="margin-top: 10px; padding: 12px;" onclick="acionarAtendimentoPersonalizado('${tituloEscapado}')">
                            💬 Acionar Atendimento no WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
    containerPrincipal.style.opacity = 0;
    setTimeout(() => {
        containerPrincipal.innerHTML = htmlDetalhes;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        containerPrincipal.style.opacity = 1;
    }, 200);
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
            if (indicador) indicador.textContent = "Órbita 2 de 2";
            if (btnVoltar) btnVoltar.removeAttribute('disabled');
            if (btnAvancar) btnAvancar.setAttribute('disabled', 'true');
        }, 250);
    } else {
        p2.classList.remove('ativa');
        setTimeout(() => {
            p1.classList.add('ativa');
            if (indicador) indicador.textContent = "Órbita 1 de 2";
            if (btnVoltar) btnVoltar.setAttribute('disabled', 'true');
            if (btnAvancar) btnAvancar.removeAttribute('disabled');
        }, 250);
    }

    const topoBoutique = document.querySelector('.catalogo-header');
    if (topoBoutique) {
        topoBoutique.scrollIntoView({ behavior: 'smooth' });
    }
}

function acionarAtendimentoPersonalizado(nomeProduto) {
    const mensagem = encodeURIComponent(`Olá, equipe Celestine Ateliê! Gostaria de mais detalhes e atendimento sobre o manto: ${nomeProduto}`);
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=5541999999999&text=${mensagem}`;
    window.open(urlWhatsapp, '_blank');
}

// ==========================================
// 8. EXPLORAÇÃO, QUIZ & INSPEÇÃO DE TEXTURAS
// ==========================================

function carregarGuiaMateriais() {
    const grid = document.getElementById('grid-materiais');
    if (!grid) return;

    grid.innerHTML = '';

    materiaisCelestine.forEach(mat => {
        const raridadeClasse = mat.raridade ? mat.raridade.toLowerCase() : 'comum';

        grid.innerHTML += `
            <article class="material-card">
                <div class="material-card-header">
                    <span class="material-badge ${raridadeClasse}">${mat.raridade || 'Raro'}</span>
                    <span class="material-tag">${mat.tag || 'Exclusivo'}</span>
                </div>

                <div class="material-icon">${mat.icone}</div>
                <h4>${mat.nome}</h4>
                <p class="material-desc">${mat.descricao}</p>

                <div class="material-specs-grid">
                    <div class="spec-item">
                        <span class="spec-label">Caimento</span>
                        <span class="spec-value">${mat.caimento}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Origem</span>
                        <span class="spec-value">${mat.origem}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Luminosidade</span>
                        <span class="spec-value">${mat.brilho || '100%'}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Criações na Loja</span>
                        <span class="spec-value">${mat.pecasLoja.length} peça(s)</span>
                    </div>
                </div>

                <button type="button" class="btn-interagir-material" onclick="abrirModalTextura('${mat.id}')">
                    🔍 Examinar Textura & Peças
                </button>
            </article>
        `;
    });
}

function garantirModalTexturaNoDOM() {
    if (document.getElementById('modal-textura')) return;

    const modalHTML = `
        <div id="modal-textura" class="modal-pedidos" style="display: none;" onclick="if(event.target.id === 'modal-textura') fecharModalTextura()">
            <div class="modal-conteudo modal-textura-conteudo">
                <button type="button" class="close-btn" onclick="fecharModalTextura()" aria-label="Fechar">&times;</button>

                <div class="textura-modal-header">
                    <span id="modal-tecido-badge" class="material-badge"></span>
                    <h3 id="modal-tecido-nome"></h3>
                    <p id="modal-tecido-subtitulo" class="textura-subtitulo"></p>
                </div>

                <div class="textura-swatch-container">
                    <div id="modal-tecido-swatch" class="textura-swatch">
                        <div class="swatch-lupa-tag">🔍 Inspeção Macro da Trama</div>
                    </div>
                    <div class="textura-sensacao-box">
                        <div>
                            <span class="spec-label">Toque & Caimento:</span>
                            <strong id="modal-tecido-toque" class="spec-value"></strong>
                        </div>
                        <div>
                            <span class="spec-label">Gramatura:</span>
                            <strong id="modal-tecido-gramatura" class="spec-value"></strong>
                        </div>
                        <div>
                            <span class="spec-label">Conservação:</span>
                            <strong id="modal-tecido-cuidados" class="spec-value"></strong>
                        </div>
                    </div>
                </div>

                <div class="textura-detalhes-grid">
                    <div class="textura-info-bloco">
                        <h4>🧬 Do que é feito (Composição)</h4>
                        <p id="modal-tecido-composicao"></p>
                    </div>
                    <div class="textura-info-bloco">
                        <h4>🧵 Como é feito (Processo Artesanal)</h4>
                        <p id="modal-tecido-processo"></p>
                    </div>
                </div>

                <div class="textura-pecas-section">
                    <h4>✨ Peças do Ateliê Confeccionadas com esta Trama</h4>
                    <div id="modal-tecido-pecas" class="textura-pecas-lista"></div>
                </div>

                <div class="textura-modal-footer">
                    <button type="button" id="btn-encomendar-tecido" class="btn-submit-quiz">
                        🌙 Solicitar Peça Sob Medida neste Tecido
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function abrirModalTextura(idTecido) {
    const mat = materiaisCelestine.find(m => m.id === idTecido);
    if (!mat) return;

    garantirModalTexturaNoDOM();

    const badgeEl = document.getElementById('modal-tecido-badge');
    badgeEl.textContent = mat.raridade;
    badgeEl.className = `material-badge ${mat.raridade.toLowerCase()}`;

    document.getElementById('modal-tecido-nome').textContent = `${mat.icone} ${mat.nome}`;
    document.getElementById('modal-tecido-subtitulo').textContent = mat.subtitulo;

    const swatchEl = document.getElementById('modal-tecido-swatch');
    swatchEl.style.background = mat.estiloTrama;

    document.getElementById('modal-tecido-toque').textContent = mat.caimento;
    document.getElementById('modal-tecido-gramatura').textContent = mat.gramatura;
    document.getElementById('modal-tecido-cuidados').textContent = mat.cuidados;

    document.getElementById('modal-tecido-composicao').textContent = mat.composicao;
    document.getElementById('modal-tecido-processo').textContent = mat.processo;

    const listaPecasEl = document.getElementById('modal-tecido-pecas');
    listaPecasEl.innerHTML = mat.pecasLoja.map(peca => {
        const nomeEscapado = peca.nome.replace(/'/g, "\\'");
        return `
            <div class="peca-citada-card">
                <div>
                    <strong>${peca.nome}</strong>
                    <span>${peca.detalhe}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
                    <button type="button" class="btn-ver-peca-citada" style="background: var(--saturn-gold); color: #000; font-weight: bold;" onclick="encomendarPecaComTecido('${nomeEscapado}', '${mat.id}')">
                        🌙 Encomendar Esta Peça + Tecido
                    </button>
                    <button type="button" class="btn-ver-peca-citada" onclick="irParaPecaDaLoja('${nomeEscapado}', '${peca.destino}')">
                        ✨ Ver Peça na Loja
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const btnEncomendar = document.getElementById('btn-encomendar-tecido');
    btnEncomendar.onclick = () => encomendarComTecido(mat.id);

    document.getElementById('modal-textura').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModalTextura() {
    const modal = document.getElementById('modal-textura');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModalTextura();
});

async function irParaPecaDaLoja(nomePeca, destinoPadrao) {
    fecharModalTextura();

    if (produtosGlobais.length === 0) {
        try {
            const resp = await fetch('produtos.json');
            produtosGlobais = await resp.json();
        } catch (e) {
            produtosGlobais = [];
        }
    }

    const indexEncontrado = produtosGlobais.findIndex(
        p => p.titulo && p.titulo.toLowerCase() === nomePeca.toLowerCase()
    );

    if (indexEncontrado !== -1) {
        verDetalhesProduto(indexEncontrado);
    } else {
        mudarTela(destinoPadrao || 'colecoes');
    }
}

function calcularResultadoQuiz(event) {
    event.preventDefault();

    const p1 = document.getElementById('p1').value;
    const p2 = document.getElementById('p2').value;
    const p3 = document.getElementById('p3').value;

    const contagem = { misterio: 0, brilho: 0, fluidez: 0 };
    if (p1) contagem[p1] = (contagem[p1] || 0) + 1;
    if (p2) contagem[p2] = (contagem[p2] || 0) + 1;
    if (p3) contagem[p3] = (contagem[p3] || 0) + 1;

    let perfilVencedor = 'misterio';
    if (contagem.brilho > contagem[perfilVencedor]) perfilVencedor = 'brilho';
    if (contagem.fluidez > contagem[perfilVencedor]) perfilVencedor = 'fluidez';

    const materialRecomendado = materiaisCelestine.find(m => m.id === perfilVencedor) || materiaisCelestine[0];

    const titulosEstilo = {
        misterio: "🌘 Aura Eclipse (Misteriosa & Sóbria)",
        brilho: "🪐 Aura Saturniana (Extravagante & Magnética)",
        fluidez: "✨ Aura Etérea (Fluida & Iluminada)"
    };

    const containerResultado = document.getElementById('quiz-resultado');
    const corpoQuiz = document.getElementById('quiz-corpo');

    if (corpoQuiz) corpoQuiz.style.display = 'none';

    if (containerResultado) {
        containerResultado.innerHTML = `
            <div class="resultado-box">
                <h4>Seu Mapeamento Orbital:</h4>
                <h2 class="estilo-titulo">${titulosEstilo[perfilVencedor] || "Aura Estelar"}</h2>
                
                <div class="tecido-recomendado-card">
                    <p><strong>Tecido Estelar Recomendado para a sua Aura:</strong></p>
                    <h3>${materialRecomendado.icone} ${materialRecomendado.nome}</h3>
                    <p>${materialRecomendado.descricao}</p>
                </div>

                <div class="resultado-acoes" style="display: flex; flex-direction: column; gap: 10px;">
                    <button type="button" class="btn-submit-login" onclick="encomendarComTecido('${materialRecomendado.id}')">🌙 Agendar Manto com este Tecido</button>
                    <button type="button" class="btn-interagir-material" onclick="abrirModalTextura('${materialRecomendado.id}')">🔍 Examinar Textura & Peças deste Tecido</button>
                    <button type="button" class="btn-back-home" onclick="refazerQuiz()">🔄 Refazer Scanner</button>
                </div>
            </div>
        `;
        containerResultado.style.display = 'block';
    }
}

function refazerQuiz() {
    const corpoQuiz = document.getElementById('quiz-corpo');
    const containerResultado = document.getElementById('quiz-resultado');
    const formQuiz = document.getElementById('form-quiz');

    if (corpoQuiz) corpoQuiz.style.display = 'block';
    if (containerResultado) containerResultado.style.display = 'none';
    if (formQuiz) formQuiz.reset();
}

// ==========================================
// 9. AGENDAMENTO, SELEÇÃO DE TECIDOS & PEÇA BASE
// ==========================================

async function inicializarTelaAgendamento() {
    preencherFormularioAgendamentoSeLogado();
    await popularSelectPecasReferencia();
    renderizarSeletorTecidosPedido();
}

function preencherFormularioAgendamentoSeLogado() {
    const cliente = obterClienteLogado();
    if (!cliente) return;

    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    if (inputNome) inputNome.value = cliente.nome;
    if (inputEmail) inputEmail.value = cliente.email;
}

async function popularSelectPecasReferencia() {
    const selectPeca = document.getElementById('peca-referencia');
    if (!selectPeca) return;

    if (produtosGlobais.length === 0) {
        try {
            const resp = await fetch('produtos.json');
            produtosGlobais = await resp.json();
        } catch (e) {
            produtosGlobais = [];
        }
    }

    const nomesUnicos = new Set(pecasDestaqueCatalogo);
    produtosGlobais.forEach(p => {
        if (p.titulo) nomesUnicos.add(p.titulo);
    });

    selectPeca.innerHTML = `<option value="">✨ Criação 100% Inédita (Sem peça base)</option>`;
    nomesUnicos.forEach(nomePeca => {
        const opt = document.createElement('option');
        opt.value = nomePeca;
        opt.textContent = `👗 Inspirado em: ${nomePeca}`;
        selectPeca.appendChild(opt);
    });
}

function renderizarSeletorTecidosPedido(idsPreSelecionados = []) {
    const grid = document.getElementById('seletor-tecidos-pedido');
    if (!grid) return;

    grid.innerHTML = materiaisCelestine.map(mat => {
        const marcado = idsPreSelecionados.includes(mat.id);
        return `
            <label class="tecido-opcao-card ${marcado ? 'selecionado' : ''}" id="card-tecido-opcao-${mat.id}">
                <input type="checkbox" class="checkbox-tecido-pedido" value="${mat.id}" data-nome="${mat.nome}" ${marcado ? 'checked' : ''} onchange="alternarSelecaoTecidoPedido('${mat.id}')">
                <div class="tecido-opcao-topo">
                    <span class="tecido-opcao-icone">${mat.icone}</span>
                    <span class="tecido-opcao-check">${marcado ? '✓ Escolhido' : '+ Adicionar'}</span>
                </div>
                <strong class="tecido-opcao-nome">${mat.nome}</strong>
                <span class="tecido-opcao-meta">${mat.tag} • ${mat.gramatura}</span>
            </label>
        `;
    }).join('');

    atualizarContadorTecidosPedido();
}

function alternarSelecaoTecidoPedido(idTecido) {
    const card = document.getElementById(`card-tecido-opcao-${idTecido}`);
    if (!card) return;

    const checkbox = card.querySelector('input[type="checkbox"]');
    const badgeCheck = card.querySelector('.tecido-opcao-check');

    if (checkbox && checkbox.checked) {
        card.classList.add('selecionado');
        if (badgeCheck) badgeCheck.textContent = '✓ Escolhido';
    } else {
        card.classList.remove('selecionado');
        if (badgeCheck) badgeCheck.textContent = '+ Adicionar';
    }

    atualizarContadorTecidosPedido();
}

function atualizarContadorTecidosPedido() {
    const contador = document.getElementById('contador-tecidos-selecionados');
    if (!contador) return;

    const total = document.querySelectorAll('.checkbox-tecido-pedido:checked').length;
    contador.textContent = total === 1 ? '1 tecido selecionado' : `${total} tecidos selecionados`;
}

function abrirAgendamentoPersonalizado({ peca = '', tecidosIds = [], estilo = '' } = {}) {
    mudarTela('agendamento', () => {
        const aviso = document.getElementById('aviso-tecido-selecionado');
        const mensagensAviso = [];

        if (peca) {
            const selectPeca = document.getElementById('peca-referencia');
            if (selectPeca) {
                const existeOpcao = Array.from(selectPeca.options).some(opt => opt.value === peca);
                if (!existeOpcao) {
                    const novaOpt = document.createElement('option');
                    novaOpt.value = peca;
                    novaOpt.textContent = `👗 Inspirado em: ${peca}`;
                    selectPeca.appendChild(novaOpt);
                }
                selectPeca.value = peca;
            }
            mensagensAviso.push(`👗 Peça de inspiração: <strong>${peca}</strong>`);
        }

        if (tecidosIds && tecidosIds.length > 0) {
            renderizarSeletorTecidosPedido(tecidosIds);
            const nomesTecidos = tecidosIds
                .map(id => materiaisCelestine.find(m => m.id === id))
                .filter(Boolean)
                .map(m => `${m.icone} ${m.nome}`);

            if (nomesTecidos.length > 0) {
                mensagensAviso.push(`🧵 Tecido pré-selecionado: <strong>${nomesTecidos.join(', ')}</strong> (você pode marcar mais tecidos abaixo)`);
            }
        }

        if (estilo) {
            const selectEstilo = document.getElementById('Estilo');
            if (selectEstilo) selectEstilo.value = estilo;
        }

        if (aviso && mensagensAviso.length > 0) {
            aviso.style.display = 'block';
            aviso.innerHTML = mensagensAviso.join('<br>');
        }
    });
}

function iniciarAgendamentoComProduto(nomeProduto) {
    abrirAgendamentoPersonalizado({ peca: nomeProduto });
}

function encomendarComTecido(idTecido) {
    const mat = materiaisCelestine.find(m => m.id === idTecido);
    fecharModalTextura();

    abrirAgendamentoPersonalizado({
        tecidosIds: [idTecido],
        estilo: mat ? mat.estiloAgendamento : ''
    });
}

function encomendarPecaComTecido(nomePeca, idTecido) {
    const mat = materiaisCelestine.find(m => m.id === idTecido);
    fecharModalTextura();

    abrirAgendamentoPersonalizado({
        peca: nomePeca,
        tecidosIds: [idTecido],
        estilo: mat ? mat.estiloAgendamento : ''
    });
}

async function processarAgendamentoEspacial(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const estiloBase = document.getElementById('Estilo').value;
    const pecaReferencia = document.getElementById('peca-referencia')?.value || '';
    const observacoes = document.getElementById('observacoes-pedido')?.value.trim() || '';

    const tecidosSelecionados = Array.from(document.querySelectorAll('.checkbox-tecido-pedido:checked'))
        .map(cb => cb.getAttribute('data-nome'))
        .filter(Boolean);

    const partesResumo = [estiloBase];
    if (pecaReferencia) partesResumo.push(`Peça Ref: ${pecaReferencia}`);
    if (tecidosSelecionados.length > 0) partesResumo.push(`Tecidos: ${tecidosSelecionados.join(' + ')}`);
    if (observacoes) partesResumo.push(`Obs: ${observacoes}`);

    const estiloCompleto = partesResumo.join(' | ');

    try {
        const resposta = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, estilo: estiloCompleto })
        });

        if (resposta.ok) {
            alert('🚀 Pedido gravado no banco de dados com sucesso!');
            mudarTela('orbita');
        } else {
            alert('❌ Falha ao salvar o pedido.');
        }
    } catch (erro) {
        alert('❌ Falha de conexão com o servidor Node.js.');
    }
}

async function abrirCaixaDePedidos() {
    toggleMenu();
    const modal = document.getElementById('modalPedidos');
    if (modal) modal.style.display = 'flex';

    await carregarPedidosDoBanco();
}

function fecharModalPedidos() {
    const modal = document.getElementById('modalPedidos');
    if (modal) modal.style.display = 'none';
}

async function carregarPedidosDoBanco() {
    const container = document.getElementById('lista-pedidos-container');
    if (!container) return;

    try {
        const resposta = await fetch(`${API_URL}/pedidos`);
        const pedidos = await resposta.json();

        if (!pedidos || pedidos.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 20px;">Nenhum pedido registrado no cosmos ainda.</p>';
            return;
        }

        container.innerHTML = pedidos.map(p => `
            <div class="card-pedido-item">
                <div class="pedido-id">#${p.id}</div>
                <div class="pedido-dados">
                    <strong>${p.nome_cliente || p.nome}</strong>
                    <span>📡 ${p.email}</span>
                    <small>✨ ${p.estilo}</small>
                </div>
                <span class="badge-status ${(p.status || 'pendente').toLowerCase()}">${p.status || 'Pendente'}</span>
            </div>
        `).join('');
    } catch (erro) {
        container.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Erro ao conectar com o banco SQLite.</p>';
    }
}

async function abrirCaixaDeClientes() {
    toggleMenu();
    const modal = document.getElementById('modalClientes');
    if (modal) modal.style.display = 'flex';

    await carregarClientesDoBanco();
}

function fecharModalClientes() {
    const modal = document.getElementById('modalClientes');
    if (modal) modal.style.display = 'none';
}

async function carregarClientesDoBanco() {
    const container = document.getElementById('lista-clientes-container');
    if (!container) return;

    try {
        const resposta = await fetch(`${API_URL}/clientes`);
        const clientes = await resposta.json();

        if (!clientes || clientes.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 20px;">Nenhum cliente cadastrado no site ainda.</p>';
            return;
        }

        container.innerHTML = clientes.map(c => `
            <div class="card-pedido-item">
                <div class="pedido-id">#${c.id}</div>
                <div class="pedido-dados">
                    <strong>${c.nome}</strong>
                    <span>✉️ E-mail: ${c.email}</span>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        container.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Erro ao consultar a lista de clientes.</p>';
    }
}

// ==========================================
// 10. PAINEL ADMIN, BANCADA DO ALFAIATE & METROLOGIA
// ==========================================

function mudarSubAbaAdmin(nomeAba) {
    document.querySelectorAll('.sub-aba-conteudo').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.btn-sub-admin').forEach(btn => btn.classList.remove('active'));

    const abaAlvo = document.getElementById(`sub-aba-${nomeAba}`);
    if (abaAlvo) {
        abaAlvo.style.display = 'block';
    }

    const botoes = Array.from(document.querySelectorAll('.btn-sub-admin'));
    const btnAtivo = botoes.find(btn => {
        const attr = btn.getAttribute('onclick');
        return attr && attr.includes(nomeAba);
    });
    if (btnAtivo) btnAtivo.classList.add('active');

    if (nomeAba === 'consulta') buscarClientesAPI();
    if (nomeAba === 'alfaiate') renderizarFichasAlfaiate();
}

async function carregarPainelAdmin() {
    await carregarMetricasEGrafico();
    await buscarClientesAPI();
    await carregarTabelaAdmin();
    renderizarFichasAlfaiate();
    gerarCalendarioOrbital();
}

async function carregarMetricasEGrafico() {
    try {
        const res = await fetch(`${API_URL}/admin/estatisticas`);
        const dados = await res.json();

        if (document.getElementById('metric-total')) document.getElementById('metric-total').innerText = dados.total || 0;
        if (document.getElementById('metric-pendentes')) document.getElementById('metric-pendentes').innerText = dados.pendentes || 0;
        if (document.getElementById('metric-aprovados')) document.getElementById('metric-aprovados').innerText = dados.aprovados || 0;

        const ctx = document.getElementById('graficoPedidos');
        if (!ctx || typeof Chart === 'undefined') return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pendentes', 'Aprovados', 'Recusados'],
                datasets: [{
                    data: [dados.pendentes || 0, dados.aprovados || 0, dados.recusados || 0],
                    backgroundColor: ['#ffc107', '#28a745', '#dc3545'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                }
            }
        });
    } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
    }
}

async function carregarTabelaAdmin() {
    const container = document.getElementById('tabela-pedidos-admin');
    if (!container) return;

    try {
        const res = await fetch(`${API_URL}/pedidos`);
        const pedidos = await res.json();
        listaPedidosAdminCache = Array.isArray(pedidos) ? pedidos : [];

        if (listaPedidosAdminCache.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: var(--lavender-glow);">Nenhum pedido encontrado no banco de dados.</p>';
            return;
        }

        container.innerHTML = listaPedidosAdminCache.map(p => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; flex-wrap: wrap; gap: 10px; border: 1px solid var(--glass-border);">
                <div style="max-width: 720px;">
                    <strong style="color: #fff;">#${p.id} ${p.nome_cliente || p.nome}</strong> <span style="color: var(--lavender-glow);">(${p.email})</span><br>
                    <small style="color: var(--saturn-gold);">✨ ${p.estilo} | Status: <span class="badge-status ${(p.status||'pendente').toLowerCase()}">${p.status||'Pendente'}</span></small>
                </div>
                <div style="display: flex; gap: 6px;">
                    <button onclick="atualizarStatusPedido(${p.id}, 'Aprovado')" style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">✅ Aprovar</button>
                    <button onclick="atualizarStatusPedido(${p.id}, 'Recusado')" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">❌ Recusar</button>
                    <button onclick="atualizarStatusPedido(${p.id}, 'Pendente')" style="background: rgba(255,255,255,0.1); color: #ffc107; border: 1px solid #ffc107; padding: 6px 12px; border-radius: 6px; cursor: pointer;">⏳ Pendente</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p style="color: #ff6b6b;">Erro ao carregar lista de pedidos.</p>';
    }
}

// Separa os dados gravados no campo `estilo` para exibição estruturada na Bancada do Alfaiate
function parsearDetalhesPedido(estiloStr = '') {
    const partes = estiloStr.split(' | ').map(s => s.trim()).filter(Boolean);
    let estiloBase = partes[0] || 'Não especificado';
    let pecaRef = '';
    let tecidos = [];
    let observacoes = '';

    partes.forEach((parte, idx) => {
        if (parte.startsWith('Peça Ref:')) {
            pecaRef = parte.replace('Peça Ref:', '').trim();
        } else if (parte.startsWith('Tecidos:')) {
            const listaStr = parte.replace('Tecidos:', '').trim();
            tecidos = listaStr.split(' + ').map(t => t.trim()).filter(Boolean);
        } else if (parte.startsWith('Obs:')) {
            observacoes = parte.replace('Obs:', '').trim();
        } else if (idx > 0 && !observacoes) {
            observacoes = parte;
        }
    });

    const nomesEstiloMap = {
        minimalista: '🌘 Eclipse (Minimalista & Escuro)',
        brilhante: '🪐 Saturniano (Anéis & Camadas)',
        futurista: '✨ Via Láctea (Brilho & Cristais)'
    };

    return {
        estiloBaseFormatado: nomesEstiloMap[estiloBase.toLowerCase()] || estiloBase,
        pecaRef,
        tecidos,
        observacoes
    };
}

function filtrarStatusAlfaiate(status, botaoEl) {
    filtroStatusAlfaiateAtual = status;
    document.querySelectorAll('.btn-filtro-status').forEach(btn => btn.classList.remove('active'));
    if (botaoEl) botaoEl.classList.add('active');
    renderizarFichasAlfaiate();
}

function renderizarFichasAlfaiate() {
    const container = document.getElementById('lista-fichas-alfaiate');
    if (!container) return;

    const termoBusca = (document.getElementById('busca-alfaiate')?.value || '').toLowerCase().trim();

    const pedidosFiltrados = listaPedidosAdminCache.filter(p => {
        const statusPedido = (p.status || 'pendente').toLowerCase();
        if (filtroStatusAlfaiateAtual !== 'todos' && statusPedido !== filtroStatusAlfaiateAtual) {
            return false;
        }

        if (!termoBusca) return true;

        const nomeCliente = (p.nome_cliente || p.nome || '').toLowerCase();
        const emailCliente = (p.email || '').toLowerCase();
        const detalhesStr = (p.estilo || '').toLowerCase();

        return nomeCliente.includes(termoBusca) ||
               emailCliente.includes(termoBusca) ||
               detalhesStr.includes(termoBusca);
    });

    if (pedidosFiltrados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 35px; background: rgba(255,255,255,0.02); border: 1px dashed var(--glass-border); border-radius: 16px;">
                <p style="color: var(--lavender-glow); margin: 0;">Nenhuma ficha técnica encontrada para este filtro.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = pedidosFiltrados.map(p => {
        const nomeCliente = p.nome_cliente || p.nome || 'Tripulante';
        const statusAtual = p.status || 'Pendente';
        const statusClasse = statusAtual.toLowerCase();
        const dataFormatada = p.data ? new Date(p.data).toLocaleDateString('pt-BR') : 'Data não registrada';
        const info = parsearDetalhesPedido(p.estilo || '');

        // Busca medidas do cliente no cache pelo e-mail
        const clienteCadastrado = listaClientesCache.find(
            c => c.email && p.email && c.email.toLowerCase() === p.email.toLowerCase()
        );

        const temMedidas = clienteCadastrado && (
            clienteCadastrado.busto || clienteCadastrado.cintura || clienteCadastrado.quadril || clienteCadastrado.altura
        );

        const htmlMedidas = temMedidas
            ? `
                <div class="ficha-medidas-grid">
                    <span><strong>Busto:</strong> ${clienteCadastrado.busto || '-'} cm</span>
                    <span><strong>Cintura:</strong> ${clienteCadastrado.cintura || '-'} cm</span>
                    <span><strong>Quadril:</strong> ${clienteCadastrado.quadril || '-'} cm</span>
                    <span><strong>Altura:</strong> ${clienteCadastrado.altura || '-'} cm</span>
                </div>
              `
            : `<span style="font-size: 0.85rem; color: var(--text-sub); font-style: italic;">Medidas corporais ainda não registradas pelo cliente.</span>`;

        const htmlTecidos = info.tecidos.length > 0
            ? info.tecidos.map(nomeTecido => {
                const matObj = materiaisCelestine.find(m => m.nome.toLowerCase() === nomeTecido.toLowerCase());
                const icone = matObj ? matObj.icone : '🧵';
                const extra = matObj ? ` • ${matObj.gramatura}` : '';
                return `<span class="tag-tecido-ficha">${icone} <strong>${nomeTecido}</strong><small>${extra}</small></span>`;
            }).join('')
            : `<span class="tag-tecido-vazio">Nenhum tecido específico marcado (definir com o cliente)</span>`;

        const htmlObservacoes = info.observacoes
            ? `<p class="texto-escrita-cliente">“${info.observacoes}”</p>`
            : `<p class="texto-escrita-vazio">O cliente não deixou observações escritas adicionais neste pedido.</p>`;

        return `
            <article class="ficha-alfaiate-card">
                <div class="ficha-topo">
                    <div>
                        <span class="ficha-numero-pedido">ORDEM DE CORTE #${p.id}</span>
                        <h4>${nomeCliente}</h4>
                        <small style="color: var(--text-sub);">📡 ${p.email} • 🗓️ ${dataFormatada}</small>
                    </div>
                    <span class="badge-status ${statusClasse}">${statusAtual}</span>
                </div>

                <div class="ficha-resumo-modelo">
                    <div class="ficha-campo">
                        <span class="ficha-label">👗 Peça de Referência / Base:</span>
                        <strong class="ficha-valor-destaque">${info.pecaRef || '✨ Criação 100% Inédita (Sem peça base)'}</strong>
                    </div>
                    <div class="ficha-campo">
                        <span class="ficha-label">🌌 Atmosfera / Estilo Base:</span>
                        <strong class="ficha-valor">${info.estiloBaseFormatado}</strong>
                    </div>
                </div>

                <div class="ficha-secao">
                    <span class="ficha-label">🧵 Tecidos Selecionados (${info.tecidos.length}):</span>
                    <div class="ficha-tecidos-lista">
                        ${htmlTecidos}
                    </div>
                </div>

                <div class="ficha-secao box-escrita-cliente">
                    <span class="ficha-label">📝 Escrita & Instruções do Cliente:</span>
                    ${htmlObservacoes}
                </div>

                <div class="ficha-secao box-medidas-cliente">
                    <span class="ficha-label">📏 Medidas Estelares Cadastradas:</span>
                    ${htmlMedidas}
                </div>

                <div class="ficha-acoes-rodape">
                    <button type="button" onclick="atualizarStatusPedido(${p.id}, 'Aprovado')" style="background: #28a745; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.85rem;">
                        ✅ Aprovar & Iniciar Corte
                    </button>
                    <button type="button" onclick="atualizarStatusPedido(${p.id}, 'Pendente')" style="background: rgba(255,255,255,0.08); color: #ffc107; border: 1px solid #ffc107; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                        ⏳ Em Análise
                    </button>
                    <button type="button" onclick="atualizarStatusPedido(${p.id}, 'Recusado')" style="background: rgba(220,53,69,0.18); color: #ff6b6b; border: 1px solid #dc3545; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                        ❌ Recusar
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

async function atualizarStatusPedido(id, novoStatus) {
    try {
        const res = await fetch(`${API_URL}/pedidos/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });

        if (res.ok) {
            alert(`✨ Pedido #${id} alterado para ${novoStatus}!`);
            await carregarMetricasEGrafico();
            await carregarTabelaAdmin();
            renderizarFichasAlfaiate();
        } else {
            alert('Erro ao atualizar o status.');
        }
    } catch (err) {
        alert('Falha na conexão com o servidor.');
    }
}

async function buscarClientesAPI() {
    const container = document.getElementById('tabela-clientes-admin');

    try {
        const res = await fetch(`${API_URL}/clientes`);
        listaClientesCache = await res.json();
        if (container) {
            renderizarListaClientesAdmin(listaClientesCache);
        }
    } catch (err) {
        if (container) {
            container.innerHTML = '<p style="color: #ff5252; text-align: center;">Erro ao conectar com o banco de dados.</p>';
        }
    }
}

function renderizarListaClientesAdmin(clientes) {
    const container = document.getElementById('tabela-clientes-admin');
    if (!container) return;

    if (!clientes || clientes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--lavender-glow);">Nenhum cliente cadastrado.</p>';
        return;
    }

    container.innerHTML = clientes.map(c => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
                <strong style="color: #fff; font-size: 1.05rem;">#${c.id} - ${c.nome}</strong><br>
                <span style="color: var(--lavender-glow); font-size: 0.9rem;">📡 ${c.email}</span>
                <div style="margin-top: 5px; font-size: 0.8rem; color: var(--saturn-gold);">
                    📏 Busto: ${c.busto || '-'} cm | Cintura: ${c.cintura || '-'} cm | Quadril: ${c.quadril || '-'} cm | Altura: ${c.altura || '-'} cm
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="prepararEdicaoCliente(${c.id})" style="background: var(--saturn-gold); color: #000; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">
                    ✏️ Editar
                </button>
                <button onclick="excluirClienteAdmin(${c.id})" style="background: rgba(255,82,82,0.15); color: #ff5252; border: 1px solid #ff5252; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function prepararEdicaoCliente(id) {
    const cliente = listaClientesCache.find(c => c.id === id);
    if (!cliente) return;

    document.getElementById('admin-edit-id').value = cliente.id;
    document.getElementById('admin-edit-nome').value = cliente.nome || '';
    document.getElementById('admin-edit-email').value = cliente.email || '';
    document.getElementById('admin-edit-busto').value = cliente.busto || '';
    document.getElementById('admin-edit-cintura').value = cliente.cintura || '';
    document.getElementById('admin-edit-quadril').value = cliente.quadril || '';
    document.getElementById('admin-edit-altura').value = cliente.altura || '';

    mudarSubAbaAdmin('edicao');
}

function filtrarClientesAdmin() {
    const campoFiltro = document.getElementById('filtro-cliente-admin');
    if (!campoFiltro) return;

    const termo = campoFiltro.value.toLowerCase();
    const filtrados = listaClientesCache.filter(c => 
        (c.nome && c.nome.toLowerCase().includes(termo)) || 
        (c.email && c.email.toLowerCase().includes(termo))
    );
    renderizarListaClientesAdmin(filtrados);
}

async function salvarEdicaoClienteAdmin(event) {
    event.preventDefault();

    const id = document.getElementById('admin-edit-id').value;
    const dados = {
        nome: document.getElementById('admin-edit-nome').value,
        email: document.getElementById('admin-edit-email').value,
        busto: document.getElementById('admin-edit-busto').value,
        cintura: document.getElementById('admin-edit-cintura').value,
        quadril: document.getElementById('admin-edit-quadril').value,
        altura: document.getElementById('admin-edit-altura').value
    };

    try {
        const res = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (res.ok) {
            alert(`✨ Dados do tripulante #${id} alterados com sucesso!`);
            await buscarClientesAPI();
            renderizarFichasAlfaiate();
            mudarSubAbaAdmin('consulta');
        } else {
            alert('⚠️ Não foi possível salvar as alterações.');
        }
    } catch (err) {
        alert('❌ Erro de conexão com a API.');
    }
}

async function excluirClienteAdmin(id) {
    if (!confirm(`Deseja realmente remover o cliente #${id}?`)) return;

    try {
        const res = await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
        if (res.ok) {
            await buscarClientesAPI();
            renderizarFichasAlfaiate();
        }
    } catch (err) {
        alert('❌ Erro ao excluir cliente.');
    }
}

function gerarCalendarioOrbital() {
    const container = document.getElementById('grid-calendario');
    const titulo = document.getElementById('titulo-calendario');
    if (!container) return;

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = agora.getMonth();

    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    if (titulo) titulo.innerText = `🗓️ ${nomesMeses[mes]} / ${ano}`;

    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
    const hoje = agora.getDate();

    let html = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => `<strong style="font-size:0.8em; opacity:0.7;">${d}</strong>`).join('');

    for (let i = 0; i < primeiroDiaDaSemana; i++) {
        html += `<div></div>`;
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const isHoje = dia === hoje;
        const bg = isHoje ? 'var(--saturn-gold, #ffd700)' : 'rgba(255,255,255,0.05)';
        const corTexto = isHoje ? '#000' : '#fff';

        html += `<div style="background: ${bg}; color: ${corTexto}; padding: 8px 0; border-radius: 4px; font-weight: bold; font-size: 0.9em;">${dia}</div>`;
    }

    container.innerHTML = html;
}

// ==========================================
// 11. FUNCIONALIDADES DO MENU HAMBÚRGUER & TEMA
// ==========================================

function atualizarVipGamificacao(cliente) {
    const elNivel = document.getElementById('user-vip-nivel');
    const elPontos = document.getElementById('user-vip-pontos');
    const elBarra = document.getElementById('user-vip-bar');
    const elMeta = document.getElementById('user-vip-meta');

    if (!elNivel || !elPontos || !elBarra) return;

    const favs = obterFavoritosCliente(cliente.email);
    const pontos = 200 + (favs.length * 50);
    const meta = 500;
    const pct = Math.min(100, Math.round((pontos / meta) * 100));

    elPontos.innerText = `${pontos} / ${meta} Pts`;
    elBarra.style.width = `${pct}%`;

    if (pontos >= 500) {
        elNivel.innerText = "🪐 Nível: Embaixador de Saturno";
        if (elMeta) elMeta.innerText = "✨ Benefício Ativo: Portes Grátis & Atendimento Prioritário!";
    } else if (pontos >= 350) {
        elNivel.innerText = "🚀 Nível: Comandante Orbital";
        if (elMeta) elMeta.innerText = `Faltam ${meta - pontos} pts para subir de nível estelar!`;
    } else {
        elNivel.innerText = "👨‍🚀 Nível: Cadete Lunar";
        if (elMeta) elMeta.innerText = `Favorite mais mantos para ganhar pontos!`;
    }
}

async function carregarTimelinePedidoMenu(email) {
    const container = document.getElementById('timeline-passos-container');
    if (!container) return;

    try {
        const res = await fetch(`${API_URL}/pedidos/cliente/${encodeURIComponent(email)}`);
        const pedidos = await res.json();

        if (!pedidos || pedidos.length === 0) {
            container.innerHTML = `<span style="color: var(--lavender-glow);">Nenhum manto em confecção ativa.</span>`;
            return;
        }

        const ultimo = pedidos[0];
        const status = (ultimo.status || 'Pendente').toLowerCase();

        let etapa1 = '✓', etapa2 = '⏳', etapa3 = '○';
        if (status === 'aprovado') {
            etapa1 = '✓'; etapa2 = '✓ (Em Corte & Costura)'; etapa3 = '🚀 Em Órbita';
        } else if (status === 'recusado') {
            etapa1 = '❌'; etapa2 = 'Cancelado'; etapa3 = '-';
        } else {
            etapa1 = '✓'; etapa2 = '⏳ Em Análise pelo Alfaiate'; etapa3 = '○ Prova Pendente';
        }

        container.innerHTML = `
            <div style="color: #fff; margin-bottom: 2px;"><strong>Manto:</strong> #${ultimo.id} (${ultimo.estilo})</div>
            <div style="color: var(--saturn-gold);">${etapa1} Pedido Recebido</div>
            <div style="color: ${status === 'aprovado' ? '#28a745' : '#ffc107'};">${etapa2}</div>
            <div style="color: rgba(255,255,255,0.4);">${etapa3}</div>
        `;
    } catch (err) {
        container.innerHTML = `<span style="color: var(--lavender-glow);">Consulte o perfil para mais detalhes.</span>`;
    }
}

function abrirModalMoodboard() {
    const modal = document.getElementById('modalMoodboard');
    if (modal) modal.style.display = 'flex';
    carregarEventosMoodboard();
}

function fecharModalMoodboard() {
    const modal = document.getElementById('modalMoodboard');
    if (modal) modal.style.display = 'none';
}

function obterEventosMoodboard(email) {
    if (!email) return [];
    return JSON.parse(localStorage.getItem(`moodboard_${email}`) || '[]');
}

function salvarEventoMoodboard(event) {
    event.preventDefault();
    const cliente = obterClienteLogado();
    if (!cliente) return;

    const evento = document.getElementById('mb-evento').value;
    const data = document.getElementById('mb-data').value;
    const notas = document.getElementById('mb-notas').value;

    const lista = obterEventosMoodboard(cliente.email);
    lista.unshift({ id: Date.now(), evento, data, notas });

    localStorage.setItem(`moodboard_${cliente.email}`, JSON.stringify(lista));
    document.getElementById('form-moodboard').reset();
    alert('✨ Evento e notas salvas no seu Caderno Estelar!');
    carregarEventosMoodboard();
}

function carregarEventosMoodboard() {
    const container = document.getElementById('lista-eventos-moodboard');
    if (!container) return;

    const cliente = obterClienteLogado();
    if (!cliente) return;

    const lista = obterEventosMoodboard(cliente.email);

    if (lista.length === 0) {
        container.innerHTML = '<p style="color: var(--lavender-glow); font-size: 0.85rem; text-align: center;">Nenhum evento registrado ainda.</p>';
        return;
    }

    container.innerHTML = lista.map(item => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 12px; border-radius: 10px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #fff; font-size: 0.95rem;">${item.evento}</strong>
                <small style="color: var(--saturn-gold);">${new Date(item.data).toLocaleDateString('pt-BR')}</small>
            </div>
            <p style="color: var(--lavender-glow); font-size: 0.85rem; margin-top: 6px;">${item.notas}</p>
            <button onclick="removerEventoMoodboard(${item.id})" style="background: transparent; border: none; color: #ff5252; font-size: 0.75rem; cursor: pointer; padding: 0; margin-top: 5px;">
                🗑️ Remover Evento
            </button>
        </div>
    `).join('');
}

function removerEventoMoodboard(id) {
    const cliente = obterClienteLogado();
    if (!cliente) return;

    let lista = obterEventosMoodboard(cliente.email);
    lista = lista.filter(item => item.id !== id);
    localStorage.setItem(`moodboard_${cliente.email}`, JSON.stringify(lista));
    carregarEventosMoodboard();
}

function abrirWhatsappVip() {
    const cliente = obterClienteLogado();
    if (!cliente) return;

    let mensagem = `Olá, equipe Celestine Ateliê! Sou o tripulante VIP ${cliente.nome} (${cliente.email}).`;

    if (cliente.busto || cliente.cintura || cliente.quadril) {
        mensagem += ` Minhas medidas registradas: Busto: ${cliente.busto || '-'}cm, Cintura: ${cliente.cintura || '-'}cm, Quadril: ${cliente.quadril || '-'}cm.`;
    }

    mensagem += ` Gostaria de uma consultoria exclusiva com o alfaiate pessoal sobre o meu próximo manto.`;

    const url = `https://api.whatsapp.com/send?phone=5541999999999&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
  
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
  
    if (isLight) {
      if (icon) icon.textContent = '🪐';
      if (text) text.textContent = 'Modo Saturno';
      localStorage.setItem('siteTheme', 'lunar');
    } else {
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'Modo Lunar';
      localStorage.setItem('siteTheme', 'saturn');
    }
}

// ==========================================
// 12. EFEITOS VISUAIS
// ==========================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    
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