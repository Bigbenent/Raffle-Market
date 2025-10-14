// Auto-scroll carousel every few seconds (like Jumia)
document.querySelectorAll('.draws-carousel').forEach(carousel => {
  let scrollPos = 0;
  setInterval(() => {
    scrollPos += 240;
    if (scrollPos >= carousel.scrollWidth - carousel.clientWidth) scrollPos = 0;
    carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
  }, 3000);
});

// Manual scroll buttons
document.querySelectorAll('.category-card').forEach(category => {
  const carousel = category.querySelector('.draws-carousel');
  category.querySelector('.next-btn').onclick = () => carousel.scrollBy({ left: 240, behavior: 'smooth' });
  category.querySelector('.prev-btn').onclick = () => carousel.scrollBy({ left: -240, behavior: 'smooth' });
});

// 72-hour countdown timers
function startCountdown() {
  document.querySelectorAll('.countdown').forEach(el => {
    let [h, m, s] = el.dataset.time.split(':').map(Number);
    const interval = setInterval(() => {
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { clearInterval(interval); el.textContent = "Expired"; return; }
      el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
  });
}
startCountdown();

 // Countdown Simulation (48 hours = 172,800 seconds)
  const countdown = document.getElementById("cd1");
  let seconds = 172800; // 48 hours in seconds

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      countdown.textContent = `${hrs}:${mins}:${secs}`;
    } else {
      countdown.textContent = "Draw Closed";
    }
  }, 1000);



    // Theme Toggle
    const toggle = document.getElementById("themeToggle");
    toggle.addEventListener("click", () => {
      const html = document.documentElement;
      const current = html.getAttribute("data-bs-theme");
      html.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
      toggle.innerHTML = current === "dark" 
        ? '<i class="fa-solid fa-moon"></i> Light Mode' 
        : '<i class="fa-solid fa-sun"></i>  Dark Mode';
    });

    // Hide WhatsApp on Scroll
    let lastScroll = 0;
    const whatsappBtn = document.getElementById("whatsappBtn");
    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        whatsappBtn.classList.add("hidden");
      } else {
        whatsappBtn.classList.remove("hidden");
      }
      lastScroll = currentScroll;
    });

    //  JS: Local Time 

  function updateLocalTime() {
    const timeElement = document.getElementById('local-time');
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    timeElement.textContent = now.toLocaleTimeString([], options);
  }
  setInterval(updateLocalTime, 1000);
  updateLocalTime();


//  JS: Theme Toggle 

  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    icon.className = isDark ? 'fa-solid fa-sun text-warning' : 'fa-solid fa-moon';
  });


  document.addEventListener('DOMContentLoaded', function() {
  // Handle Buy Ticket Modal
  const buyButtons = document.querySelectorAll('.buy-ticket-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelector('.modal-draw-title').textContent = this.dataset.title;
      document.querySelector('.modal-ticket-price').textContent = '🎫 Ticket Price: ' + this.dataset.price;
      document.querySelector('.modal-ticket-sold').textContent = `🎫 Tickets Sold: ${this.dataset.sold} / ${this.dataset.total}`;
      document.querySelector('.modal-img').src = this.dataset.img;
      document.querySelector('.modal-progress').style.width = this.dataset.progress + '%';
      document.querySelector('.modal-total-sold').textContent = this.dataset.totalSold + ' Sold';
      document.querySelector('.modal-remaining').textContent = this.dataset.remaining + ' Remaining';
    });
  });

  // Handle Details Modal
  const detailsButtons = document.querySelectorAll('.details-btn');
  detailsButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelector('.modal-details-title').textContent = this.dataset.title;
      document.querySelector('.modal-details-price').textContent = '💰 Ticket Price: ' + this.dataset.price;
      document.querySelector('.modal-details-prize').textContent = '🏆 Prize: ' + this.dataset.prize;
      document.querySelector('.modal-details-desc').textContent = this.dataset.desc;
      document.querySelector('.modal-details-img').src = this.dataset.img;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const walletCard = document.querySelector(".card");
  walletCard.classList.add("animate__animated", "animate__fadeInUp");
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.podium-slider');
  let index = 0;
  setInterval(() => {
    index = (index + 1) % slides.children.length;
    slides.style.transition = 'transform 1s ease';
    slides.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);
});

let lastScrollTop = 0;
const bottomNav = document.getElementById('bottomNav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down → hide navbar
    bottomNav.classList.add('hide');
  } else {
    // Scrolling up → show navbar
    bottomNav.classList.remove('hide');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative
});

