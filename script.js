document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 40) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => entry.target.classList.add('active'), delay * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    const bars = document.querySelectorAll('.bar');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalHeight = entry.target.getAttribute('data-final') || '0%';
                requestAnimationFrame(() => {
                    entry.target.style.height = finalHeight;
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => barObserver.observe(bar));

    const heroCard = document.getElementById('heroCard');
    if (heroCard && window.matchMedia('(min-width: 1025px)').matches) {
        const heroSection = document.getElementById('hero');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroCard.style.transform = `perspective(1200px) rotateY(${-6 + x * 4}deg) rotateX(${2 - y * 4}deg) translateY(0)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroCard.style.transform = '';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                }
            }
        });
    });
});
