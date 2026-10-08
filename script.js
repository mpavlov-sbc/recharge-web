const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const verseCards = [
  {
    text: "“I can do all things through Christ...”",
    reference: "Philippians 4:13"
  },
  {
    text: "“...who gives me strength.”",
    reference: "Philippians 4:13"
  },
  {
    text: "What can you ask God for strength with today?",
    reference: "A moment to reflect"
  }
];

const nextCardButton = document.querySelector("[data-next-card]");
const verseCard = document.querySelector("[data-verse-card]");
const verseText = document.querySelector("[data-verse-text]");
const verseReference = document.querySelector("[data-verse-reference]");
const cardNumber = document.querySelector("[data-card-number]");
const batteryFill = document.querySelector("[data-battery-fill]");
const energyValue = document.querySelector("[data-energy]");
const progressSegments = document.querySelectorAll(".verse-progress span");
let activeCard = 0;

nextCardButton?.addEventListener("click", () => {
  activeCard = (activeCard + 1) % verseCards.length;
  verseCard?.classList.add("changing");

  window.setTimeout(() => {
    if (verseText) verseText.textContent = verseCards[activeCard].text;
    if (verseReference) verseReference.textContent = verseCards[activeCard].reference;
    if (cardNumber) cardNumber.textContent = String(activeCard + 1);
    progressSegments.forEach((segment, index) => segment.classList.toggle("active", index === activeCard));

    const energy = 64 + activeCard * 12;
    if (batteryFill) batteryFill.style.width = `${energy}%`;
    if (energyValue) energyValue.textContent = String(energy);
    if (nextCardButton) nextCardButton.firstChild.textContent = activeCard === 2 ? "Finish quest " : "Continue ";
    verseCard?.classList.remove("changing");
  }, 150);
});

const signupPanel = document.querySelector(".signup-panel");
const signupForm = document.querySelector("#sib-form");
const brevoSuccess = document.querySelector("#success-message");
const signupSuccess = document.querySelector("[data-signup-success]");
let signupPending = false;

const showSignupSuccess = () => {
  if (!signupPanel || !signupSuccess || signupPanel.classList.contains("is-complete")) return;
  signupPanel.classList.add("is-complete");
  signupSuccess.hidden = false;
  signupSuccess.focus({ preventScroll: true });
};

signupForm?.addEventListener("submit", () => {
  signupPending = signupForm.checkValidity();
});

signupForm?.addEventListener("reset", () => {
  if (signupPending) window.setTimeout(showSignupSuccess, 0);
});

if (brevoSuccess) {
  const successObserver = new MutationObserver(() => {
    const isVisible = brevoSuccess.style.display !== "" && brevoSuccess.style.display !== "none";
    if (isVisible) showSignupSuccess();
  });
  successObserver.observe(brevoSuccess, { attributes: true, attributeFilter: ["class", "style"] });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());