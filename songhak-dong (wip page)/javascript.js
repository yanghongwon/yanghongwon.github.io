const themeToggleButtons = document.querySelectorAll(".toggle");

themeToggleButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

        // Add theme-transition class for smooth transitions
        document.documentElement.classList.add("theme-transition");

        // Retrieve the current theme and determine the target theme
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let targetTheme = (currentTheme === "light") ? "dark" : "light";

        // Remove theme-transition class after a short delay
        window.setTimeout(function () {
            document.documentElement.classList.remove("theme-transition");
        }, 50);

        // Set the data-theme attribute and store in local storage
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
    });
});

const tabElements = document.querySelectorAll('button[role="tab"]');
const panelElements = document.querySelectorAll('[role="tabpanel"]');
let activeIndex = 0;

// Listen to clicks and key presses on tabs
tabElements.forEach(function (tab, index) {
  tab.addEventListener("click", function (event) {
    setActiveTab(index);
  });

  tab.addEventListener("keydown", function (event) {
    const lastIndex = tabElements.length - 1;

    if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
      if (activeIndex === 0) {
        // First element, jump to end
        setActiveTab(lastIndex);
      } else {
        // Move left
        setActiveTab(activeIndex - 1);
      }
    } else if (event.code === "ArrowRight" || event.code === "ArrowDown") {
      if (activeIndex === lastIndex) {
        // Last element, jump to beginning
        setActiveTab(0);
      } else {
        // Move right
        setActiveTab(activeIndex + 1);
      }
    } else if (event.code === "Home") {
      // Move to beginning
      setActiveTab(0);
    } else if (event.code === "End") {
      // Move to end
      setActiveTab(lastIndex);
    }
  });
});

function setActiveTab(index) {
  // Make currently active tab inactive
  tabElements[activeIndex].setAttribute("aria-selected", "false");
  tabElements[activeIndex].tabIndex = -1;

  // Set the new tab as active
  tabElements[index].setAttribute("aria-selected", "true");
  tabElements[index].tabIndex = 0;
  tabElements[index].focus();

  setActivePanel(index);
  activeIndex = index;
}

function setActivePanel(index) {
  // Hide currently active panel
  panelElements[activeIndex].setAttribute("hidden", "");
  panelElements[activeIndex].tabIndex = -1;

  // Show the new active panel
  panelElements[index].removeAttribute("hidden");
  panelElements[index].tabIndex = 0;
}

$(document).ready(function(){
  $('.controls').click(function(){
      $('iframe.tmblr-iframe').toggleClass('active');
  });
});

let buttonContainer = document.querySelector(".scroll-and-credit");
let scrollButton = document.querySelector(".scroll-to-top");

window.onscroll = function() {
  scrollFunction();
}

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    buttonContainer.classList.add("show-scroll");
  } else {
    buttonContainer.classList.remove("show-scroll");
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollButton.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


tippy('[title]', {
    theme: 'custom',
    arrow: tippy.roundArrow,
    followCursor: true,
    zIndex: 9999999999,
    maxWidth: 300,

    content(reference) {
      const title = reference.getAttribute('title');
      reference.removeAttribute('title');
      return title;
    },
  });