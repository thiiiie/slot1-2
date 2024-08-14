document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.querySelector(".modal");
  const wheel = document.querySelector(".js-wheel");
  const spinButton = document.querySelector(".js-spin-wheel-btn");
  const wheelMainPart = wheel.querySelector(".js-wheel-main-part");
  const wheelMainPartStyles = getComputedStyle(wheelMainPart);
  let isSpinning = false;
  let spinCount = 0;

  const showModal = () => {
    modalOverlay.classList.add("is-visible");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("is-visible");
  };

  const spinWheel = () => {
    if (isSpinning) return;
    isSpinning = true;

    if (spinCount === 0) {
      wheel.classList.add("wheel--spinning-1");
    } else if (spinCount === 1) {
      wheel.classList.remove("wheel--spinning-1");
      wheel.classList.add("wheel--spinning-2");
    }

    const animationDuration = Number.parseFloat(wheelMainPartStyles.animationDuration) * 1000;

    setTimeout(() => {
      wheel.classList.remove("wheel--spinning-1", "wheel--spinning-2");
      isSpinning = false;
      if (spinCount === 0) {
        document.querySelector(".bonuses-section__bonus-img--first").style.opacity = "1";
      } else if (spinCount === 1) {
        document.querySelector(".bonuses-section__bonus-img--second").style.opacity = "1";
        setTimeout(showModal, 1000);
      }
      spinCount++;
    }, animationDuration);
  };

  wheel.addEventListener("click", spinWheel);
  spinButton.addEventListener("click", spinWheel);

  const yesButton = document.querySelector(".popup__button");
  yesButton.addEventListener("click", closeModal);

  const scrollListener = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      spinWheel();
      window.removeEventListener('scroll', scrollListener);
    }
  };

  window.addEventListener('scroll', scrollListener);
});