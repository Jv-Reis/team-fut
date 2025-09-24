// script.js ATUALIZADO
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // ======== BANCO DE DADOS CENTRAL DOS JOGADORES ========
    // (AQUI É O ÚNICO LUGAR QUE VOCÊ PRECISA EDITAR NO FUTURO)
    // ==========================================================
    const jogadores = [
        // Goleiros
        { nome: 'Jogador 1', numero: 1, posicao: 'Goleiro', foto: 'img/logo_ori_2.png', jogos: 15, gols: 0, assistencias: 0 },
        { nome: 'Jogador 2', numero: 12, posicao: 'Goleiro', foto: 'img/logo_ori_2.png', jogos: 5, gols: 0, assistencias: 0 },

        // Defensores
        { nome: 'Jogador 3', numero: 2, posicao: 'Lateral Direito', foto: 'img/logo_ori_2.png', jogos: 18, gols: 1, assistencias: 3 },
        { nome: 'Jogador 4', numero: 16, posicao: 'Lateral Direito', foto: 'img/logo_ori_2.png', jogos: 12, gols: 0, assistencias: 0 },
        { nome: 'Jogador 5', numero: 3, posicao: 'Zagueiro', foto: 'img/logo_ori_2.png', jogos: 20, gols: 1, assistencias: 0 },
        { nome: 'Jogador 6', numero: 4, posicao: 'Zagueiro', foto: 'img/logo_ori_2.png', jogos: 19, gols: 0, assistencias: 0 },
        { nome: 'Jogador 7', numero: 17, posicao: 'Zagueiro', foto: 'img/logo_ori_2.png', jogos: 10, gols: 0, assistencias: 0 },
        { nome: 'Jogador 8', numero: 18, posicao: 'Zagueiro', foto: 'img/logo_ori_2.png', jogos: 8, gols: 0, assistencias: 0 },
        { nome: 'Jogador 9', numero: 6, posicao: 'Lateral Esquerdo', foto: 'img/logo_ori_2.png', jogos: 17, gols: 1, assistencias: 2 },

        // Meio-campistas
        { nome: 'Jogador 10', numero: 5, posicao: 'Volante', foto: 'img/logo_ori_2.png', jogos: 22, gols: 0, assistencias: 1 },
        { nome: 'Jogador 11', numero: 8, posicao: 'Volante', foto: 'img/logo_ori_2.png', jogos: 21, gols: 0, assistencias: 2 }, 
        { nome: 'Jogador 12', numero: 13, posicao: 'Volante', foto: 'img/logo_ori_2.png', jogos: 7, gols: 0, assistencias: 0 },
        { nome: 'Jogador 13', numero: 7, posicao: 'Meio Campo', foto: 'img/logo_ori_2.png', jogos: 18, gols: 1, assistencias: 2 },
        
        // Atacantes
        { nome: 'Jogador 14', numero: 21, posicao: 'Ponta', foto: 'img/logo_ori_2.png', jogos: 14, gols: 1, assistencias: 0 },
        { nome: 'Jogador 15', numero: 22, posicao: 'Ponta', foto: 'img/logo_ori_2.png', jogos: 16, gols: 2, assistencias: 2 }, 
        { nome: 'Jogador 16', numero: 10, posicao: 'Ponta', foto: 'img/logo_ori_2.png', jogos: 22, gols: 4, assistencias: 2 }, 
       
        
        // Comissão Técnica
        { nome: 'Nome do Técnico', posicao: 'Treinador Principal', foto: 'img/jogadores/tecnico.jpg' },
        { nome: 'Nome do Auxiliar', posicao: 'Auxiliar Técnico', foto: 'img/jogadores/auxiliar.jpg' }
    ];

    // ==========================================================
    // ======== FUNÇÃO PARA GERAR OS CARDS DO ELENCO ========
    // ==========================================================
    function gerarElenco() {
        const containers = {
            goleiros: document.getElementById('goleiros-grid'),
            defensores: document.getElementById('defensores-grid'),
            meioCampistas: document.getElementById('meio-campistas-grid'),
            atacantes: document.getElementById('atacantes-grid'),
            comissao: document.getElementById('comissao-tecnica-grid')
        };

        jogadores.forEach(jogador => {
            // Gera o HTML do overlay apenas se o jogador tiver estatísticas
            const overlayHTML = jogador.hasOwnProperty('jogos') ? `
                <div class="jogador-overlay">
                    <div class="overlay-content">
                        <h4>${jogador.nome}</h4>
                        <p>${jogador.posicao}</p>
                        <hr class="overlay-divider">
                        <div class="overlay-stats">
                            <div class="stat-item">
                                <span class="stat-number">${jogador.jogos}</span>
                                <span class="stat-label">Jogos</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${jogador.gols}</span>
                                <span class="stat-label">Gols</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${jogador.assistencias}</span>
                                <span class="stat-label">Assist.</span>
                            </div>
                        </div>
                    </div>
                </div>
            ` : '';

            // Cria o HTML do card para cada jogador, incluindo o overlay
            const cardHTML = `
                <div class="jogador-card">
                    <img src="${jogador.foto}" alt="Foto de ${jogador.nome}">
                    ${overlayHTML}
                    <div class="jogador-info">
                        ${jogador.numero ? `<span class="numero-camisa">${jogador.numero}</span>` : ''}
                        <h4>${jogador.nome}</h4>
                        <p>${jogador.posicao}</p>
                    </div>
                </div>
            `;

            // Coloca o jogador na sua respectiva seção
            switch (jogador.posicao) {
                case 'Goleiro':
                    if (containers.goleiros) containers.goleiros.innerHTML += cardHTML;
                    break;
                case 'Lateral Direito':
                case 'Zagueiro':
                case 'Lateral Esquerdo':
                    if (containers.defensores) containers.defensores.innerHTML += cardHTML;
                    break;
                case 'Volante':
                case 'Meio Campo':
                case 'Meia Atacante':
                    if (containers.meioCampistas) containers.meioCampistas.innerHTML += cardHTML;
                    break;
                case 'Ponta':
                case 'Centroavante':
                    if (containers.atacantes) containers.atacantes.innerHTML += cardHTML;
                    break;
                case 'Treinador Principal':
                case 'Auxiliar Técnico':
                    if (containers.comissao) containers.comissao.innerHTML += cardHTML;
                    break;
            }
        });
    }

    // ==========================================================
    // ======== FUNÇÃO PARA GERAR OS RANKINGS ========
    // ==========================================================
    function gerarRanking() {
        const rankingGolsList = document.getElementById('ranking-gols');
        const rankingAssistenciasList = document.getElementById('ranking-assistencias');

        // Ranking de Gols
        if (rankingGolsList) {
            const artilheiros = [...jogadores]
                .filter(j => j.gols > 0)
                .sort((a, b) => b.gols - a.gols);
            
            rankingGolsList.innerHTML = '';
            artilheiros.forEach((jogador, index) => {
                const listItem = `<li><span class="posicao">${index + 1}º</span><span class="nome-jogador">${jogador.nome}</span><span class="valor">${jogador.gols} Gols</span></li>`;
                rankingGolsList.innerHTML += listItem;
            });
            if (artilheiros.length === 0) {
                rankingGolsList.innerHTML = '<li>Nenhum jogador marcou gols ainda.</li>';
            }
        }

        // Ranking de Assistências
        if (rankingAssistenciasList) {
            const assistentes = [...jogadores]
                .filter(j => j.assistencias > 0)
                .sort((a, b) => b.assistencias - a.assistencias);

            rankingAssistenciasList.innerHTML = '';
            assistentes.forEach((jogador, index) => {
                const listItem = `<li><span class="posicao">${index + 1}º</span><span class="nome-jogador">${jogador.nome}</span><span class="valor">${jogador.assistencias} Assist.</span></li>`;
                rankingAssistenciasList.innerHTML += listItem;
            });
            if (assistentes.length === 0) {
                rankingAssistenciasList.innerHTML = '<li>Nenhum jogador deu assistências ainda.</li>';
            }
        }
    }

    // ==========================================================
    // ======== LÓGICAS DE INTERAÇÃO E NAVEGAÇÃO (JÁ EXISTENTES) ========
    // ==========================================================
    
    // Lógica para o menu fixo ao rolar
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }

    // Lógica para expandir seções de elenco
    const posicaoHeaders = document.querySelectorAll('.posicao-header');
    posicaoHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('aberto'); // Adiciona a classe no próprio header
            const elencoGrid = this.nextElementSibling;
            elencoGrid.classList.toggle('aberto');
        });
    });

    // Lógica para expandir detalhes dos jogos
    const cardsResultado = document.querySelectorAll('.card-resultado');
    cardsResultado.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('aberto');
        });
    });

    // Lógica para rolagem suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const offsetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================
    // ======== INICIALIZAÇÃO DAS FUNÇÕES DINÂMICAS ========
    // ==========================================================
    if (document.querySelector('.section-elenco')) {
        gerarElenco();
    }
    if (document.querySelector('.section-ranking')) {
        gerarRanking();
    }

    /* ========================================================== */
    /* ======== LÓGICA PARA DESTACAR O LINK DA PÁGINA ATIVA ======== */
    /* ========================================================== */
    function highlightActiveLink() {
        const navLinks = document.querySelectorAll('nav ul a');
        
        // Pega o nome do arquivo da URL atual (ex: "elenco.html")
        const currentPage = window.location.pathname.split('/').pop();

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();

            // Caso especial para a página inicial (pode ser "" ou "index.html")
            if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
                link.classList.add('active');
            }
            // Para as outras páginas
            else if (linkPage === currentPage && currentPage !== 'index.html' && currentPage !== '') {
                link.classList.add('active');
            }
        });
    }
    // Chama a função para executar assim que a página carregar
    highlightActiveLink();
});
