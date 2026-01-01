document.addEventListener('DOMContentLoaded', () => {
    // 1. Success Intro Animation Logic
    const introOverlay = document.createElement('div');
    introOverlay.id = 'intro-overlay';
    introOverlay.innerHTML = `
        <div class="staircase">
            <div class="step" style="--step-index: 5"></div>
            <div class="step" style="--step-index: 4"></div>
            <div class="step" style="--step-index: 3"></div>
            <div class="step" style="--step-index: 2"></div>
            <div class="step" style="--step-index: 1"></div>
            <div class="step" style="--step-index: 0"></div>
        </div>
        <div class="intro-text">Path to Success</div>
    `;
    document.body.appendChild(introOverlay);

    // Only play intro on index.html or if not seen
    const hasSeenIntro = sessionStorage.getItem('galaxy_intro_seen');
    if (!hasSeenIntro && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('progress/'))) {
        playIntro();
    } else {
        introOverlay.style.display = 'none';
    }

    // 2. Page Load Animation Trigger
    document.body.classList.add('page-enter');

    // 3. Create background stars
    initGalaxy();
});

function playIntro() {
    const steps = document.querySelectorAll('.step');
    const text = document.querySelector('.intro-text');
    const overlay = document.getElementById('intro-overlay');

    steps.forEach((step, i) => {
        setTimeout(() => {
            step.classList.add('animate');
            if (i === steps.length - 1) step.classList.add('success');
        }, i * 200);
    });

    setTimeout(() => {
        text.classList.add('show');
    }, 1200);

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.visibility = 'hidden';
            overlay.remove(); // Completely remove to avoid z-index/ghosting issues
            sessionStorage.setItem('galaxy_intro_seen', 'true');
        }, 1000);
    }, 3500);
}

function initGalaxy() {
    const galaxy = document.querySelector('.galaxy-bg');
    if (!galaxy) return;

    // Create 3 layers of stars for parallax
    for (let i = 1; i <= 3; i++) {
        const starLayer = document.createElement('div');
        starLayer.className = `stars stars-${i}`;

        let boxStyle = '';
        const count = i === 1 ? 80 : i === 2 ? 40 : 20;

        for (let j = 0; j < count; j++) {
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * 2000);
            const color = 'rgba(255, 255, 255, 0.15)';
            boxStyle += `${x}px ${y}px ${color}${j === count - 1 ? '' : ','}`;
        }

        starLayer.style.boxShadow = boxStyle;
        starLayer.style.animation = `stars-anim ${count * 0.5}s linear infinite`;
        galaxy.appendChild(starLayer);
    }
}

// Navigation Helper
function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
window.onload = setActiveLink;
