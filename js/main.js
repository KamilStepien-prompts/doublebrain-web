// main.js – DoubleBrain + Future is Now (stabilna, bezpieczna)
document.addEventListener("DOMContentLoaded", () => {
  // Ukryj splash jeśli w URL jest ?noSplash=1
  if (window.location.search.includes('noSplash=1')) {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleIdentity");
  const backBtn = document.getElementById("backButton");
  const nextBtn = document.getElementById("nextButton");
  const intro = document.getElementById("identityIntro");
  const obecnosc = document.querySelector(".identity-obecnosc");
  const manifest = document.getElementById("manifest");
  const dbrainIntro = document.getElementById("dbrainIntro");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  

  // Obsługa przycisków – Future is Now
  if (toggleBtn && backBtn && intro && obecnosc) {
    toggleBtn.addEventListener("click", () => {
      intro.style.display = "none";
      obecnosc.classList.add("show");
      toggleBtn.style.display = "none";
      backBtn.style.display = "inline-block";
      if (nextBtn) nextBtn.style.display = "inline-block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    backBtn.addEventListener("click", () => {
      intro.style.display = "flex";
      obecnosc.classList.remove("show");
      toggleBtn.style.display = "inline-block";
      backBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Obsługa manifestu – dbrain.html
  if (toggleBtn && manifest && dbrainIntro) {
    toggleBtn.addEventListener("click", () => {
      dbrainIntro.style.display = "none";
      manifest.classList.add("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Hamburger menu toggle
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !expanded);
    });
  }

  // Hover & follow effect
  document.querySelectorAll('.identity-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
      box.style.setProperty('--bg-transform', 'scale(1.05)');
    });

    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / centerX * 10;
      const moveY = (y - centerY) / centerY * 10;
      const transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      box.style.setProperty('--bg-transform', transform);
    });

    box.addEventListener('mouseleave', () => {
      box.style.setProperty('--bg-transform', 'scale(1)');
    });
  });

  // Matrix canvas (PoeMode only)
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chars = "01@#&*%$+=-";
    const fontSize = 16;
    let columns, drops;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setupMatrix();
    }

    function setupMatrix() {
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#5ef2e6";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    

    setInterval(draw, 60);
  }
  
});
 // Splash screen - kliknięcie w pytanie
 const splash = document.getElementById("splash");
 const splashText = document.querySelector("#splash-text span");

 if (splash && splashText) {
   splashText.style.cursor = "pointer";
   splashText.addEventListener("click", () => {
     splash.style.opacity = "0";
     setTimeout(() => {
       splash.style.display = "none";
     }, 1000);
   });
 }

 // Kompaktowy header przy scrollu
 window.addEventListener("scroll", () => {
   const header = document.querySelector(".site-header");
   if (window.scrollY > 30) {
     header.classList.add("scrolled");
   } else {
     header.classList.remove("scrolled");
   }
 });

 // Klik w identity-box → pokazuje detail-view
 document.querySelectorAll('.identity-box').forEach(box => {
   box.addEventListener('click', () => {
     const id = box.getAttribute('data-id');
     const target = document.getElementById(`detail-${id}`);
     const grid = document.getElementById('identityIntro');
     if (target && grid) {
       grid.style.display = 'none';
       target.classList.add('active');
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
   });
 });

 // Klik w przycisk powrotu
 document.querySelectorAll('.back-to-boxes').forEach(btn => {
   btn.addEventListener('click', () => {
     document.querySelectorAll('.detail-view').forEach(view => view.classList.remove('active'));
     const grid = document.getElementById('identityIntro');
     if (grid) {
       grid.style.display = 'flex';
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
   });
 });

 // Klik w presence-trigger
 document.querySelector('.presence-trigger')?.addEventListener('click', () => {
   const obecnosc = document.querySelector('.identity-obecnosc');
   const intro = document.getElementById('identityIntro');
   if (obecnosc && intro) {
     intro.style.display = 'none';
     obecnosc.classList.add('show');
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }
 });

 // Fade-in dla elementów
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

fadeEls.forEach(el => observer.observe(el));

// Klik poza menu = zamknięcie
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.main-nav');
  const burger = document.querySelector('.hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// Batonik pojawia się po kliknięciu 3 różnych boxów
const clickedDivs = new Set();

document.querySelectorAll('.identity-box').forEach(box => {
  box.addEventListener('click', () => {
    const id = box.getAttribute('data-id');
    if (id) {
      clickedDivs.add(id);
    }

    if (clickedDivs.size === 3) {
      const btn = document.getElementById('presence-button');
      if (btn) btn.style.display = 'block';
    }
  });
});



