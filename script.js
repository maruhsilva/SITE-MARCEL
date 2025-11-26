document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuração ---
    // COLOQUE SEU NÚMERO AQUI (Código País + DDD + Número)
    const SEU_NUMERO_WHATSAPP = "5512997580299"; 
    
    // 1. Menu Mobile
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // 2. Animações de Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // 3. Envio para WhatsApp
    const form = document.getElementById('whatsapp-form');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;

            // Cria a mensagem formatada
            // \n cria uma quebra de linha
            const textoCompleto = `*Olá! Vim pelo site Neto de Aluguel.*\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Mensagem:* ${mensagem}`;

            // Codifica a mensagem para URL
            const textoCodificado = encodeURIComponent(textoCompleto);
            const url = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${textoCodificado}`;

            window.open(url, '_blank');
            
            // Opcional: Limpar formulário após envio
            form.reset();
        });
    }
});