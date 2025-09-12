document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para "encolher" a nav ao rolar (opcional) ---
    const mainNav = document.querySelector('nav');
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // Se a rolagem for maior que 50px
                mainNav.classList.add('nav-scrolled');
            } else {
                mainNav.classList.remove('nav-scrolled');
            }
        });
    }

    /* ========================================================== */
    /* ======== LÓGICA PARA O MENU FIXO AO ROLAR ======== */
    /* ========================================================== */
    const nav = document.querySelector('nav');

    // Só executa se a barra de navegação existir na página
    if (nav) {
        window.addEventListener('scroll', function() {
            // Verifica se o usuário rolou a página mais de 50 pixels
            if (window.scrollY > 50) {
                // Adiciona a classe que muda o estilo
                nav.classList.add('nav-scrolled');
            } else {
                // Remove a classe para voltar ao estilo original
                nav.classList.remove('nav-scrolled');
            }
        });
    }
    
    // --- Lógica para a seção NOSSO ELENCO (apenas em elenco.html) ---
    // Mantenha este bloco APENAS se você realmente o usa em elenco.html
    // Caso contrário, pode removê-lo.
    const posicaoHeaders = document.querySelectorAll('.posicao-header');
    if (posicaoHeaders.length > 0) { // Só executa se houver headers de posição na página
        posicaoHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const elencoGrid = this.nextElementSibling;
                const icone = this.querySelector('.icone-expansao');

                if (elencoGrid.classList.contains('aberto')) {
                    elencoGrid.classList.remove('aberto');
                    icone.textContent = '▼'; 
                } else {
                    elencoGrid.classList.add('aberto');
                    icone.textContent = '▲'; 
                }
            });
        });
    }

    
        /// --- Lógica para EXPANDIR/CONTRAIR DETALHES DOS JOGOS (resultados.html) ---
    const cardsResultado = document.querySelectorAll('.card-resultado');

    cardsResultado.forEach(card => {
        // Adiciona o evento de clique ao card inteiro
        card.addEventListener('click', function() {
            // Simplesmente alterna a classe 'aberto' no card clicado
            this.classList.toggle('aberto');
        });

        // Impede que o clique nos links dentro dos detalhes propague para o card
        const linksInternos = card.querySelectorAll('a');
        linksInternos.forEach(link => {
            link.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });
    });


    // --- Lógica para rolagem suave para âncoras (links #id) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const navHeight = mainNav ? mainNav.offsetHeight : 0; // Pega a altura da nav, se existir

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Lógica para scroll suave de âncoras de outras páginas OU ao carregar a página com um hash ---
    // Esta parte precisa ser executada em AMBOS os arquivos (index.html e elenco.html)
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const navHeight = mainNav ? mainNav.offsetHeight : 0;
            
            // Pequeno delay para garantir que o layout esteja renderizado antes de rolar
            setTimeout(() => {
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100); 
        }
    }

    // --- DADOS DOS JOGADORES (Para o Ranking) ---
    const jogadores = [
        { nome: 'Bruninho', gols: 4, assistencias: 1, foto: 'img/jogadores/atacante_1.jpg' },
        { nome: 'Leandro', gols: 3, assistencias: 0, foto: 'img/jogadores/meio_3.jpg' },
        { nome: 'Zinho', gols: 3, assistencias: 2, foto: 'img/jogadores/atacante_2.jpg' },
        { nome: 'Roger', gols: 2, assistencias: 2, foto: 'img/jogadores/meio_2.jpg' },
        { nome: 'Robério', gols: 1, assistencias: 2, foto: 'img/jogadores/atacante_3.jpg' },
        { nome: 'André', gols: 1, assistencias: 2, foto: 'img/jogadores/defensor_1.jpg' },
        { nome: 'João Vitor', gols: 1, assistencias: 0, foto: 'img/jogadores/defensor_4.jpg' },
        { nome: 'Kito', gols: 1, assistencias: 0, foto: 'img/jogadores/meio_1.jpg' },
        { nome: 'Kevem', gols: 1, assistencias: 1, foto: 'img/jogadores/meio_1.jpg' },
        { nome: 'Vitorugo', gols: 1, assistencias: 0, foto: 'img/jogadores/meio_1.jpg' },
        { nome: 'Ivan', gols: 0, assistencias: 1, foto: 'img/jogadores/meio_1.jpg' },
        { nome: 'Elenaldo', gols: 1, assistencias: 0, foto: 'img/jogadores/meio_1.jpg' },
        { nome: 'Juninho', gols: 1, assistencias: 3, foto: 'img/jogadores/meio_1.jpg' },
    ];

    // --- Lógica para gerar os Rankings ---
    function gerarRanking() {
        // Ranking de Gols
        const rankingGolsList = document.getElementById('ranking-gols');
        if (rankingGolsList) { 
            const artilheiros = [...jogadores]
                                .filter(jogador => jogador.gols > 0)
                                .sort((a, b) => b.gols - a.gols); 
            rankingGolsList.innerHTML = ''; 

            artilheiros.forEach((jogador, index) => { 
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="posicao">${index + 1}º</span>
                    <span class="nome-jogador">${jogador.nome}</span>
                    <span class="valor">${jogador.gols} Gols</span>
                `;
                rankingGolsList.appendChild(listItem);
            });
            
            if (artilheiros.length === 0) {
                rankingGolsList.innerHTML = '<li>Nenhum jogador marcou gols ainda nesta temporada.</li>';
            }
        }

        // Ranking de Assistências
        const rankingAssistenciasList = document.getElementById('ranking-assistencias');
        if (rankingAssistenciasList) { 
            const assistentes = [...jogadores]
                                .filter(jogador => jogador.assistencias > 0)
                                .sort((a, b) => b.assistencias - a.assistencias); 
            rankingAssistenciasList.innerHTML = ''; 

            assistentes.forEach((jogador, index) => { 
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="posicao">${index + 1}º</span>
                    <span class="nome-jogador">${jogador.nome}</span>
                    <span class="valor">${jogador.assistencias} Assistências</span>
                `;
                rankingAssistenciasList.appendChild(listItem);
            });

            if (assistentes.length === 0) {
                rankingAssistenciasList.innerHTML = '<li>Nenhum jogador deu assistências ainda nesta temporada.</li>';
            }
        }
    }

    if (document.getElementById('ranking-gols') && document.getElementById('ranking-assistencias')) {
        gerarRanking();
    }
});