document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  document.getElementById("year").textContent = new Date().getFullYear();

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";

    const sections = [...document.querySelectorAll("main section[id]")];
    let current = sections[0]?.id;
    const position = window.scrollY + 150;
    sections.forEach(section => {
      if (section.offsetTop <= position) current = section.id;
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const photo = document.getElementById("aboutPhoto");
  const placeholder = document.getElementById("aboutPlaceholder");
  if (photo && placeholder) {
    photo.addEventListener("error", () => {
      photo.style.display = "none";
      placeholder.style.display = "flex";
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const note = document.getElementById("formNote");
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:jyotikakumari05@gmail.com?subject=${subject}&body=${body}`;
      note.textContent = "Opening your email app…";
    });
  }
});
