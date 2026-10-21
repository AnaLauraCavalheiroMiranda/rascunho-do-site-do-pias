// ==========================================
// CELESTINE ATELIÊ - SCRIPT FRONTEND (CLIENTE & SPA)
// ==========================================

const API_URL = 'http://localhost:3000/api';
let produtosGlobais = [];

// ==========================================
// 1. BASE DE DADOS DE MATÉRIAS-PRIMAS
// ==========================================
const materiaisCelestine = [
    {
        id: "misterio",
        nome: "Veludo Negro de Buraco Negro",
        icone: "🌑",
        tag: "Alta Densidade",
        descricao: "Tecido de estrutura densa capaz de absorver 99% da luz ambiente. Projetado para trajes de alta imponência e presença marcante.",
        caimento: "Estruturado / Pesado",
        origem: "Órbita de Cygnus X-1",
        brilho: "0% (Absorção Total)",
        raridade: "Lendário"
    },
    {
        id: "brilho",
        nome: "Jacquard de Ouro Saturniano",
        icone: "🪐",
        tag: "Fios Metálicos",
        descricao: "Fios de titânio e microcristais trançados com fibras nobres. Reflete gradientes dourados vibrantes conforme a luz do ambiente oscila.",
        caimento: "Rígido / Imponente",
        origem: "Anéis Internos de Saturno",
        brilho: "95% (Reflexo Angular)",
        raridade: "Raro"
    },
    {
        id: "fluidez",
        nome: "Seda Flutuante de Nebulosa",
        icone: "✨",
        tag: "Gravidade Zero",
        descricao: "Seda ultraleve e translúcida que responde ao menor fluxo de ar, simulação visual contínua de gases cósmicos em flutuação.",
        caimento: "Esvoaçante / Ultra Leve",
        origem: "Nebulosa de Órion",
        brilho: "60% (Suave / Etéreo)",
        raridade: "Épico"
    },
    {
        id: "plasma",
        nome: "Manta Magnética Aurora",
        icone: "🌌",
        tag: "Termocrômico",
        descricao: "Tecido inteligente que altera sua tonalidade entre tons de lavanda e ciano de acordo com a temperatura corporal do tripulante.",
        caimento: "Moldável / Ajustável",
        origem: "Magnetosfera Polar",
        brilho: "80% (Iridescente)",
        raridade: "Exclusivo"
    },
    {
        id: "cristal",
        nome: "Tule de Poeira Estelar",
        icone: "💎",
        tag: "Transparência",
        descricao: "Tule finíssimo incrustado com micropartículas de quartzo estelar. Cria uma ilusão de constelações flutuando sobre a pele.",
        caimento: "Vaporoso / Delicado",
        origem: "Cinturão de Kuiper",
        brilho: "100% (Ponto de Luz)",
        raridade: "Raro"
    },
    {
        id: "couro",
        nome: "Couro Sintético de Asteroide",
        icone: "☄️",
        tag: "Escudo Térmico",
        descricao: "Textura em relevo tridimensional com acabamento fosco. Oferece visual futurista urbano e proteção contra variações térmicas.",
        caimento: "Firme / Esculpido",
        origem: "Ateliê Orbital 09",
        brilho: "15% (Acabamento Satim)",
        raridade: "Comum"
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
                    <p>Conheça a física e o caimento dos tecidos raros tecidos no ateliê.</p>
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
                    <button onclick="mudarTela('agendamento')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
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
                    <button onclick="mudarTela('agendamento')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
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
                    <button onclick="mudarTela('agendamento')" class="btn-submit-login" style="width: 100%; padding: 12px; font-size: 0.95rem;">🌙 Agendar Este Manto</button>
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

                <button type="submit" class="btn-submit-login">Transmitir Sinal do Pedido</button>
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

                <!-- FORMULÁRIO DE CADASTRO NOVO -->
                <form id="form-cadastro" onsubmit="autenticarTripulante(event)">
                    <div class="input-group">
                        <label for="login-nome">👤 Nome do Tripulante</label>
                        <input type="text" id="login-nome" required placeholder="Comandante Silva">
                    </div>
                    <div class="input-group">
                        <label for="login-email">📡 Frequência Digital (E-mail)</label>
                        <input type="email" id="login-email" required placeholder="comandante@galaxia.com">
                    </div>
                    <button type="submit" class="btn-submit-login">Cadastrar / Autenticar Assinatura</button>
                </form>

                <!-- FORMULÁRIO DE LOGIN EXISTENTE -->
                <form id="form-login-existente" onsubmit="fazerLoginTripulante(event)" style="display: none;">
                    <div class="input-group">
                        <label for="login-existente-email">📡 Frequência Digital Registrada (E-mail)</label>
                        <input type="email" id="login-existente-email" required placeholder="comandante@galaxia.com">
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
            <div class="admin-header" style="text-align: center; margin-bottom: 30px;">
                <h2>🛸 Centro de Comando Orbital (Admin)</h2>
                <p>Gerenciamento de chamados, fluxo do mês e aprovação de encomendas.</p>
            </div>

            <!-- CARDS DE MÉTRICAS -->
            <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px solid var(--glass-border); text-align: center;">
                    <small>Total de Pedidos</small>
                    <h3 id="metric-total" style="font-size: 2em; margin: 5px 0;">0</h3>
                </div>
                <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #ffc107; text-align: center;">
                    <small>⌛ Pendentes</small>
                    <h3 id="metric-pendentes" style="font-size: 2em; margin: 5px 0; color: #ffc107;">0</h3>
                </div>
                <div style="background: rgba(40, 167, 69, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #28a745; text-align: center;">
                    <small>✅ Aprovados</small>
                    <h3 id="metric-aprovados" style="font-size: 2em; margin: 5px 0; color: #28a745;">0</h3>
                </div>
            </div>

            <!-- PAINEL DUPLO: GRÁFICO E CALENDÁRIO -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                    <h3>📊 Distribuição dos Pedidos</h3>
                    <canvas id="graficoPedidos" style="max-height: 250px;"></canvas>
                </div>

                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                    <h3 id="titulo-calendario">🗓️ Calendário de Atendimento</h3>
                    <div id="grid-calendario" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; margin-top: 15px; text-align: center;"></div>
                </div>
            </div>

            <!-- TABELA DE GESTÃO DE PEDIDOS -->
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid var(--glass-border);">
                <h3>📜 Pedidos Cadastrados</h3>
                <div id="tabela-pedidos-admin" style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;"></div>
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

    // Configura botões adicionais no menu lateral
    const linkPedidos = document.querySelector('aside#sidePanel a[href="#pedidos"]');
    if (linkPedidos) linkPedidos.setAttribute('onclick', "event.preventDefault(); abrirCaixaDePedidos();");

    const linkClientes = document.querySelector('aside#sidePanel a[href="#clientes"]');
    if (linkClientes) linkClientes.setAttribute('onclick', "event.preventDefault(); abrirCaixaDeClientes();");

    const linkAdmin = document.querySelector('a[href="#admin"]');
    if (linkAdmin) linkAdmin.setAttribute('onclick', "event.preventDefault(); mudarTela('admin');");
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

function mudarTela(nomeDaTela) {
    const containerPrincipal = document.querySelector('main');
    
    if (telasCelestine[nomeDaTela] !== undefined) {
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
                carregarMantosDoJson();
            } else if (nomeDaTela === 'exploracao') {
                carregarGuiaMateriais();
            } else if (nomeDaTela === 'admin') {
                carregarPainelAdmin();
            } else if (nomeDaTela === 'cliente') {
                carregarPerfilCliente();
            } else if (nomeDaTela === 'agendamento') {
                preencherFormularioAgendamentoSeLogado();
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
        formCadastro.style.display = 'none';
        formLogin.style.display = 'flex';
        titulo.innerText = "Acessar Conta de Tripulante";
        subtitulo.innerText = "Digite seu e-mail cadastrado para sintonizar sua sessão.";
        textoAlternar.innerHTML = `Não tem uma assinatura ainda? <a href="#" onclick="event.preventDefault(); alternarModoLogin('cadastro');">Criar novo cadastro</a>`;
    } else {
        formCadastro.style.display = 'flex';
        formLogin.style.display = 'none';
        titulo.innerText = "Identificação de Tripulante";
        subtitulo.innerText = "Sincronize seus dados orbitais para acessar seus mantos cósmicos privados.";
        textoAlternar.innerHTML = `Já possui registro no ateliê? <a href="#" onclick="event.preventDefault(); alternarModoLogin('login');">Entrar com conta existente</a>`;
    }
}

async function autenticarTripulante(event) {
    event.preventDefault();
    const nome = document.getElementById('login-nome').value;
    const email = document.getElementById('login-email').value;

    try {
        const resposta = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            const cliente = { id: dados.id, nome, email };
            localStorage.setItem('celestine_cliente', JSON.stringify(cliente));
            atualizarBotaoSessaoCabecalho();
            alert(`⚡ Tripulante ${nome} cadastrado com sucesso!`);
            mudarTela('cliente');
        } else {
            alert(`⚠️ Aviso: ${dados.erro}`);
        }
    } catch (erro) {
        alert('❌ Falha ao conectar ao servidor Node.js.');
    }
}

async function fazerLoginTripulante(event) {
    event.preventDefault();
    const email = document.getElementById('login-existente-email').value;

    try {
        const resposta = await fetch(`${API_URL}/clientes/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('celestine_cliente', JSON.stringify(dados.cliente));
            atualizarBotaoSessaoCabecalho();
            alert(`🚀 Bem-vindo(a) de volta, Comandante ${dados.cliente.nome}!`);
            mudarTela('cliente');
        } else {
            alert(`❌ ${dados.erro}`);
        }
    } catch (erro) {
        alert('❌ Falha na conexão com o servidor.');
    }
}

function atualizarVisibilidadeMenuLateral() {
    const itemPedidos = document.getElementById('menu-item-pedidos');
    const itemClientes = document.getElementById('menu-item-clientes');
    const itemAdmin = document.getElementById('menu-item-admin');

    const clienteLogado = obterClienteLogado();

    if (clienteLogado) {
        if (itemPedidos) itemPedidos.style.display = 'none';
        if (itemClientes) itemClientes.style.display = 'none';
        if (itemAdmin) itemAdmin.style.display = 'none';
    } else {
        if (itemPedidos) itemPedidos.style.display = 'block';
        if (itemClientes) itemClientes.style.display = 'block';
        if (itemAdmin) itemAdmin.style.display = 'block';
    }
}

// ==========================================
// 5. SISTEMA DE FAVORITOS (REQUER CADASTRO/LOGIN)
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

    // Se estivermos na tela de perfil do cliente, atualiza a lista em tempo real
    carregarFavoritosNoPerfil();
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

    container.innerHTML = favoritos.map(manto => `
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: 14px; padding: 18px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
            <div>
                <div style="font-size: 2.2rem; margin-bottom: 5px;">✨</div>
                <strong style="color: #fff; font-size: 1rem; display: block; margin-bottom: 5px;">${manto}</strong>
                <span style="font-size: 0.75rem; color: var(--saturn-gold);">Manto Autoral Salvo</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px;">
                <button onclick="mudarTela('agendamento')" style="background: var(--saturn-gold); color: #000; border: none; padding: 8px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.85rem;">🌙 Agendar Prova</button>
                <button onclick="alternarFavorito('${manto}')" style="background: rgba(255,82,82,0.15); color: #ff5252; border: 1px solid #ff5252; padding: 6px; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">💔 Remover dos Favoritos</button>
            </div>
        </div>
    `).join('');
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

    // Carrega seção de favoritos
    carregarFavoritosNoPerfil();

    // Carrega histórico de pedidos do cliente
    if (containerPedidos) {
        try {
            const res = await fetch(`${API_URL}/pedidos/cliente/${encodeURIComponent(cliente.email)}`);
            const pedidos = await res.json();

            if (!pedidos || pedidos.length === 0) {
                containerPedidos.innerHTML = '<p style="text-align:center; padding: 10px; color: var(--lavender-glow);">Você ainda não possui pedidos registrados nesta conta.</p>';
            } else {
                containerPedidos.innerHTML = pedidos.map(p => `
                    <div class="card-pedido-item" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>#${p.id} - ${p.estilo}</strong><br>
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
                            <button type="button" onclick="alternarFavorito('${produto.titulo}', event)" style="background: rgba(255,255,255,0.05); border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 8px; padding: 6px 12px; font-size: 0.85rem; cursor: pointer; white-space: nowrap;">
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
        console.error('Erro ao carregar o arquivo JSON de mantos:', erro);
    }
}

function verDetalhesProduto(index) {
    const produto = produtosGlobais[index];
    if (!produto) return;

    const containerPrincipal = document.querySelector('main');
    const precoEstimado = produto.preco || "R$ 1.850,00 - R$ 2.400,00 (Sob Medida)";
    const tempoConfeccao = produto.tempo || "15 a 20 Dias Orbitais";
    const favoritado = ehFavorito(produto.titulo);

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
                        <button type="button" class="btn-submit-quiz" onclick="iniciarAgendamentoComProduto('${produto.titulo}')">
                            🌙 Agendar Prova & Medidas Desta Peça
                        </button>

                        <button type="button" onclick="alternarFavorito('${produto.titulo}', event)" style="margin-top: 10px; background: transparent; border: 1px solid var(--saturn-gold); color: var(--saturn-gold); border-radius: 12px; padding: 12px; font-weight: bold; cursor: pointer; width: 100%;">
                            ${favoritado ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Meus Favoritos'}
                        </button>

                        <button type="button" class="btn-interagir-material" style="margin-top: 10px; padding: 12px;" onclick="acionarAtendimentoPersonalizado('${produto.titulo}')">
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
            indicador.textContent = "Órbita 2 de 2";
            if (btnVoltar) btnVoltar.removeAttribute('disabled');
            if (btnAvancar) btnAvancar.setAttribute('disabled', 'true');
        }, 250);
    } else {
        p2.classList.remove('ativa');
        setTimeout(() => {
            p1.classList.add('ativa');
            indicador.textContent = "Órbita 1 de 2";
            if (btnVoltar) btnVoltar.setAttribute('disabled', 'true');
            if (btnAvancar) btnAvancar.removeAttribute('disabled');
        }, 250);
    }

    const topoBoutique = document.querySelector('.catalogo-header');
    if (topoBoutique) {
        topoBoutique.scrollIntoView({ behavior: 'smooth' });
    }
}

function iniciarAgendamentoComProduto(nomeProduto) {
    mudarTela('agendamento');
    setTimeout(() => {
        alert(`✨ Manto "${nomeProduto}" selecionado! Complete o formulário para agendar sua sessão de confecção.`);
    }, 300);
}

function acionarAtendimentoPersonalizado(nomeProduto) {
    const mensagem = encodeURIComponent(`Olá, equipe Celestine Ateliê! Gostaria de mais detalhes e atendimento sobre o manto: ${nomeProduto}`);
    const urlWhatsapp = `https://api.whatsapp.com/send?phone=5541999999999&text=${mensagem}`;
    window.open(urlWhatsapp, '_blank');
}

// ==========================================
// 8. EXPLORAÇÃO, QUIZ & MATERIAIS
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
                </div>

                <button type="button" class="btn-interagir-material" onclick="alert('⚡ Sintonizando amostra tátil de ${mat.nome}...')">
                    🔍 Examinar Textura
                </button>
            </article>
        `;
    });
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
        misterio: "exe Aura Eclipse (Misteriosa & Sóbria)",
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

                <div class="resultado-acoes">
                    <button type="button" class="btn-submit-login" onclick="mudarTela('agendamento')">🌙 Agendar Manto com este Tecido</button>
                    <button type="button" class="btn-back-home" style="margin-top: 10px;" onclick="refazerQuiz()">🔄 Refazer Scanner</button>
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
// 9. AGENDAMENTO & CONSULTAS BANCO DE DADOS
// ==========================================

function preencherFormularioAgendamentoSeLogado() {
    const cliente = obterClienteLogado();
    if (!cliente) return;

    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    if (inputNome) inputNome.value = cliente.nome;
    if (inputEmail) inputEmail.value = cliente.email;
}

async function processarAgendamentoEspacial(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const estilo = document.getElementById('Estilo').value;

    try {
        const resposta = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, estilo })
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
                    <small>✨ Estilo: ${p.estilo}</small>
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
// 10. PAINEL ADMIN, CALENDÁRIO & ESTATÍSTICAS
// ==========================================

async function carregarPainelAdmin() {
    await carregarMetricasEGrafico();
    await carregarTabelaAdmin();
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

        if (!pedidos || pedidos.length === 0) {
            container.innerHTML = '<p style="text-align:center;">Nenhum pedido encontrado no banco de dados.</p>';
            return;
        }

        container.innerHTML = pedidos.map(p => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <strong>#${p.id} - ${p.nome_cliente || p.nome}</strong> (${p.email})<br>
                    <small>✨ Estilo: ${p.estilo} | Status: <span class="badge-status ${(p.status||'pendente').toLowerCase()}">${p.status||'Pendente'}</span></small>
                </div>
                <div style="display: flex; gap: 6px;">
                    <button onclick="atualizarStatusPedido(${p.id}, 'Aprovado')" style="background: #28a745; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">✅ Aprovar</button>
                    <button onclick="atualizarStatusPedido(${p.id}, 'Recusado')" style="background: #dc3545; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">❌ Recusar</button>
                    <button onclick="atualizarStatusPedido(${p.id}, 'Pendente')" style="background: rgba(255,255,255,0.1); color: #ffc107; border: 1px solid #ffc107; padding: 6px 10px; border-radius: 4px; cursor: pointer;">⏳ Pendente</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p style="color: #ff6b6b;">Erro ao carregar lista de pedidos.</p>';
    }
}

async function atualizarStatusPedido(id, novoStatus) {
    try {
        const res = await fetch(`${API_URL}/pedidos/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });

        if (res.ok) {
            alert(`Pedido #${id} ${novoStatus} com sucesso!`);
            carregarPainelAdmin();
        } else {
            alert('Erro ao atualizar o status.');
        }
    } catch (err) {
        alert('Falha na conexão com o servidor.');
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
// 11. EFEITOS VISUAIS E ESTILOS DINÂMICOS
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