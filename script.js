// 1. Guardamos as estruturas das telas organizadas por chaves
const telasCelestine = {
    'orbita': null, // Será preenchido automaticamente com o conteúdo original do seu HTML
    
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
                        <input type="password" id="login-password" required placeholder="••••••••">
                    </div>
                    
                    <div class="login-actions">
                        <a href="#" class="forgot-password" onclick="event.preventDefault(); alert('Pulso magnético enviado! Verifique sua caixa de entrada estelar.');">Perdeu acesso à frequência?</a>
                    </div>
                    
                    <button type="submit" class="btn-submit-login">Autenticar Assinatura</button>
                </form>
                
                <div class="login-footer">
                    <p>Novo nesta galáxia? <a href="#" onclick="event.preventDefault(); alert('Lista de espera aberta para o próximo alinhamento planetário.');">Solicitar Código de Acesso</a></p>
                    <button class="btn-back-home" onclick="mudarTela('orbita')">🪐 Retornar à Órbita Inicial</button>
                </div>
            </div>
        </section>
    `
};

// 2. Inicialização do sistema assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    // Captura o conteúdo original da <main> (Sua página inicial) para não perdê-lo
    telasCelestine['orbita'] = document.querySelector('main').innerHTML;
    
    // Configura o botão "Entrar no Espaço" do cabeçalho para abrir o login
    const btnLogin = document.querySelector('.btn-space-login');
    if (btnLogin) {
        btnLogin.setAttribute('onclick', "mudarTela('login')");
    }

    // ATIVAÇÃO DO HEADER: Configura o link "Órbita" do menu de navegação para voltar para a home
    const linkOrbita = document.querySelector('nav.desktop-nav a[href="#inicio"]');
    if (linkOrbita) {
        linkOrbita.setAttribute('onclick', "event.preventDefault(); mudarTela('orbita');");
    }
});

// 3. Função que faz a mágica de trocar de página instantaneamente
function mudarTela(nomeDaTela) {
    const containerPrincipal = document.querySelector('main');
    
    if (telasCelestine[nomeDaTela]) {
        // Fecha o menu lateral automaticamente se ele estiver aberto ao trocar de tela
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel && sidePanel.classList.contains('open')) {
            sidePanel.classList.remove('open');
        }

        // Aplica um efeito suave de sumiço (fade-out)
        containerPrincipal.style.opacity = 0;
        
        setTimeout(() => {
            // Injeta o novo HTML na main
            containerPrincipal.innerHTML = telasCelestine[nomeDaTela];
            // Rola a página para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Aplica o efeito de aparecimento (fade-in)
            containerPrincipal.style.opacity = 1;
        }, 200);
    }
}

// 4. Simulação de autenticação no envio do formulário
function autenticarTripulante(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`Tripulante ${email} autenticado com sucesso! Iniciando salto hiperespacial...`);
    mudarTela('orbita');
}

// Manter a sua função original do menu hambúrguer ativa
function toggleMenu() {
    const sidePanel = document.getElementById('sidePanel');
    sidePanel.classList.toggle('open');
}
// 2. Inicialização do sistema assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    // Captura o conteúdo original da <main> (Sua página inicial) para não perdê-lo
    telasCelestine['orbita'] = document.querySelector('main').innerHTML;
    
    // Configura o botão "Entrar no Espaço" do cabeçalho para abrir o login
    const btnLogin = document.querySelector('.btn-space-login');
    if (btnLogin) {
        btnLogin.setAttribute('onclick', "mudarTela('login')");
    }

    // ATIVAÇÃO DO HEADER: Configura o link "Órbita" do menu de navegação para voltar para a home
    const linkOrbita = document.querySelector('nav.desktop-nav a[href="#inicio"]');
    if (linkOrbita) {
        linkOrbita.setAttribute('onclick', "event.preventDefault(); mudarTela('orbita');");
    }

    // ATIVAÇÃO DO JORNADA: Configura o botão "Iniciar Jornada" da seção Hero para abrir o login
    configurarBotaoJornada();
});

// Função auxiliar para ativar o botão da seção Hero sempre que a Órbita for carregada
function configurarBotaoJornada() {
    const btnJornada = document.querySelector('.hero-content button');
    if (btnJornada) {
        btnJornada.setAttribute('onclick', "mudarTela('login')");
    }
}
// 3. Função que faz a mágica de trocar de página instantaneamente
function mudarTela(nomeDaTela) {
    const containerPrincipal = document.querySelector('main');
    
    if (telasCelestine[nomeDaTela]) {
        // Fecha o menu lateral automaticamente se ele estiver aberto ao trocar de tela
        const sidePanel = document.getElementById('sidePanel');
        if (sidePanel && sidePanel.classList.contains('open')) {
            sidePanel.classList.remove('open');
        }

        // Aplica um efeito suave de sumiço (fade-out)
        containerPrincipal.style.opacity = 0;
        
        setTimeout(() => {
            // Injeta o novo HTML na main
            containerPrincipal.innerHTML = telasCelestine[nomeDaTela];
            
            // Reconfigura o botão de jornada se voltarmos para a órbita
            if (nomeDaTela === 'orbita') {
                configurarBotaoJornada();
            }

            // Rola a página para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Aplica o efeito de aparecimento (fade-in)
            containerPrincipal.style.opacity = 1;
        }, 200);
    }
}
