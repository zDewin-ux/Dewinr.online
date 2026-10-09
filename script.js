// ============================================
// LOADER
// ============================================

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {

    loader.classList.add("hidden");

    document.documentElement.classList.remove("is-loading");
    document.body.classList.remove("is-loading");

    setTimeout(() => loader.remove(), 700);

  }, 500);

});


// ============================================
// SWITCH DE SOLUCIONES
// ============================================

document.querySelectorAll(".switch-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document
      .querySelectorAll(".switch-tab")
      .forEach(t => t.classList.remove("active"));

    document
      .querySelectorAll(".switch-content")
      .forEach(c => c.classList.remove("active"));

    tab.classList.add("active");

    document
      .querySelector(`.switch-content[data-panel="${tab.dataset.target}"]`)
      .classList.add("active");

  });

});


// ============================================
// FONDO INTERACTIVO (SPOTLIGHT + BLOBS)
// ============================================

const root = document.documentElement;

window.addEventListener(
  "mousemove",
  event => {

    const x =
      (event.clientX / window.innerWidth) * 100;

    const y =
      (event.clientY / window.innerHeight) * 100;

    root.style.setProperty("--mx", x + "%");
    root.style.setProperty("--my", y + "%");

  },
  { passive: true }
);




// ============================================
// SCROLL REVEAL
// ============================================

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("active");

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: .12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(
    element => {

      observer.observe(
        element
      );

    }
  );


// ============================================
// CONTADORES ANIMADOS
// ============================================

function animateCounter(element) {

  const target =
    Number(element.dataset.count);

  const suffix =
    element.dataset.suffix || "";

  const duration = 1400;

  const start = performance.now();

  function tick(now) {

    const progress =
      Math.min((now - start) / duration, 1);

    const eased =
      1 - Math.pow(1 - progress, 3);

    const value =
      Math.round(target * eased);

    element.textContent = value + suffix;

    if (progress < 1) {

      requestAnimationFrame(tick);

    }

  }

  requestAnimationFrame(tick);

}

const counterObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateCounter(entry.target);

          counterObserver.unobserve(entry.target);

        }

      });

    },

    { threshold: .5 }

  );

document
  .querySelectorAll("[data-count]")
  .forEach(el => counterObserver.observe(el));


// ============================================
// BOTONES MAGNÉTICOS
// ============================================

document
  .querySelectorAll(".btn-primary, .btn-demo")
  .forEach(btn => {

    btn.addEventListener("mousemove", event => {

      const rect = btn.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      btn.style.transform =
        `translate(${x * .18}px, ${y * .35}px)`;

    });

    btn.addEventListener("mouseleave", () => {

      btn.style.transform = "translate(0, 0)";

    });

  });


// ============================================
// NAVBAR
// ============================================

const navbar =
  document.querySelector(
    ".navbar"
  );


window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY > 40
    ) {

      navbar.style.background =
        "rgba(10,9,8,.88)";

      navbar.style.boxShadow =
        "0 15px 50px rgba(0,0,0,.2)";

    } else {

      navbar.style.background =
        "rgba(10,9,8,.55)";

      navbar.style.boxShadow =
        "none";

    }

  }

);