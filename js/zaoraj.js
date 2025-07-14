

 const words = ["FAIL", "FUCK", "BOOM", "BRAK", "0101", "CHUJ", "DUPA", "WATA", "LIPA", "ZERO", "404!"];
  const cubes = document.querySelectorAll('.glitch-cube');

  function rotateRandom() {
    const word = words[Math.floor(Math.random() * words.length)];
    cubes.forEach((cube, i) => {
      // OMIJAMY małpę = ostatni element
      if (i >= word.length || i === 4) return;

      const front = cube.querySelector('.front');
      const back = cube.querySelector('.back');

      back.textContent = word[i];
      cube.classList.add('flipping');
      setTimeout(() => cube.classList.remove('flipping'), 1000);
    });
  }

  setInterval(rotateRandom, 4000); 


const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('show');
});


const cytaty = [
  "Bezsens i absurd jest najlepszą odpowiedzią.",
  "Każda ścieżka pachnie inaczej...",
  "To nie smród. To przypomnienie.",
  "Zejdź do kabiny. Wróć z pytaniem.",
  "Tu nie ma ikonek. Są tylko ulotki."
];
let index = 0;
setInterval(() => {
  index = (index + 1) % cytaty.length;
  document.getElementById("cytat-glowny").textContent = cytaty[index];
}, 7000);

// Toggle navigation menu
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('show');
  });

