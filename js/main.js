
// main.js – DoubleBrain v2 (refactor)


  // 🎛️ TOGGLE identity / manifest
  const toggleBtn = document.getElementById("toggleIdentity");
  const backBtn = document.getElementById("backButton");
  const nextBtn = document.getElementById("nextButton");
  const intro = document.getElementById("identityIntro");
  const obecnosc = document.querySelector(".identity-obecnosc");
  const manifest = document.getElementById("manifest");
  const dbrainIntro = document.getElementById("dbrainIntro");

  if (toggleBtn && intro && obecnosc) {
    toggleBtn.addEventListener("click", () => {
      intro.style.display = "none";
      obecnosc.classList.add("show");
      toggleBtn.style.display = "none";
      if (backBtn) backBtn.style.display = "inline-block";
      if (nextBtn) nextBtn.style.display = "inline-block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (backBtn && intro && obecnosc) {
    backBtn.addEventListener("click", () => {
      intro.style.display = "flex";
      obecnosc.classList.remove("show");
      toggleBtn.style.display = "inline-block";
      backBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (toggleBtn && manifest && dbrainIntro) {
    toggleBtn.addEventListener("click", () => {
      dbrainIntro.style.display = "none";
      manifest.classList.add("show");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 🍔 Hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
      hamburger.classList.toggle("open");
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !expanded);
    });

    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 🌠 Hover + follow efekt
  document.querySelectorAll('.identity-box').forEach(box => {
    box.addEventListener('mouseenter', () => box.style.setProperty('--bg-transform', 'scale(1.05)'));
    box.addEventListener('mousemove', e => {
      const rect = box.getBoundingClientRect();
      const moveX = ((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2) * 10;
      const moveY = ((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2) * 10;
      box.style.setProperty('--bg-transform', `translate(${moveX}px, ${moveY}px) scale(1.05)`);
    });
    box.addEventListener('mouseleave', () => box.style.setProperty('--bg-transform', 'scale(1)'));
  });

  // 💻 Matrix canvas
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chars = "01@#&*%$+=-";
    const fontSize = 16;
    let columns, drops;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#5ef2e6";
      ctx.font = fontSize + "px monospace";
      drops.forEach((drop, i) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drop * fontSize);
        if (drop * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setInterval(draw, 60);
  }

  // 🔽 Kompaktowy header przy scrollu
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  });

  // 🧬 Klik w identity-box = przejście
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

  // ↩️ Powrót z detail-view
  document.querySelectorAll('.back-to-boxes').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.detail-view').forEach(view => view.classList.remove('active'));
      const grid = document.getElementById('identityIntro') || document.getElementById('sigma-modes');
      if (grid) {
        grid.style.display = grid.id === 'identityIntro' ? 'flex' : 'grid';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
       // Przywróć teksty
    document.querySelectorAll('.identity-box').forEach(box => box.classList.remove('hidden-text'));
    });
  });

  // ✨ Fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => observer.observe(el));

  // 👁️‍🗨️ Presence trigger
  document.querySelector('.presence-trigger')?.addEventListener('click', () => {
    const obecnosc = document.querySelector('.identity-obecnosc');
    const intro = document.getElementById('identityIntro');
    if (obecnosc && intro) {
      intro.style.display = 'none';
      obecnosc.classList.add('show');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // 🕳️ Stealth trigger
  document.querySelector('.stealth-trigger')?.addEventListener('click', () => {
    document.getElementById('corpoRage').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 🧠 Klik w sigma-mode-card
  document.querySelectorAll('.sigma-mode-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const detail = document.getElementById(`detail-${id}`);
      const section = document.getElementById('sigma-modes');
      if (detail && section) {
        section.style.display = 'none';
        detail.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // 🚪 Klikalna sigma-portal-link z "sekretnym wyjściem"
  let clickCount = 0;
  const portal = document.querySelector('.sigma-portal-link');
  if (portal) {
    portal.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;
      if (clickCount === 1) {
        portal.style.opacity = '0.7';
      } else if (clickCount === 2) {
        portal.textContent = 'Nie każda droga prowadzi do światła...';
      } else if (clickCount >= 3) {
        window.location.href = 'wyjscie.html';
      }
    });
  }

  // ✅ Lucide (ikony)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  };


// 🔊 Grajek: funkcje przycisków
function enterWithMusic() {
  localStorage.setItem("splashShown", "true");
  window.location.href = "home.html?music=1";
}

function enterSilently() {
  localStorage.setItem("splashShown", "true");
  window.location.href = "home.html";
}
// 🎧 Jeśli URL zawiera ?music=1, przekieruj do doublebrain_intro.html
if (window.location.search.includes('music=1')) {
  window.location.href = "doublebrain_intro.html";
}
document.querySelectorAll('.identity-box').forEach(box => {
  box.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      // Jeśli już jest ukryty tekst – przechodzimy dalej
      if (box.classList.contains('hidden-text')) {
        const id = box.getAttribute('data-id');
        const target = document.getElementById(`detail-${id}`);
        const grid = document.getElementById('identityIntro');
        if (target && grid) {
          grid.style.display = 'none';
          target.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Ukryj tekst (klik #1)
        document.querySelectorAll('.identity-box').forEach(b => b.classList.remove('hidden-text'));
        box.classList.add('hidden-text');
      }
    }
  });
});
