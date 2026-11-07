/* =================================
   MEASUREMATE JAVASCRIPT
================================= */


/* =================================
   UNIT CONVERTER
================================= */

const convertButton = document.getElementById("convertButton");
const lengthInput = document.getElementById("lengthValue");
const unitSelect = document.getElementById("unitFrom");
const resultLabel = document.getElementById("resultLabel");
const resultDisplay = document.getElementById("conversionResult");

function convertMeasurement() {

    const unit = unitSelect.value;
    const value = parseFloat(lengthInput.value);

    if (lengthInput.value.trim() === "" || !Number.isFinite(value) || value < 0) {

        resultLabel.textContent = "Please enter a valid measurement.";
        resultDisplay.textContent = "";

        return;
    }

    let result;

    if (unit === "cm") {

        result = value / 2.54;

        resultLabel.textContent = value + " cm equals";
        resultDisplay.textContent = result.toFixed(2) + " inches";

    } else {

        result = value * 2.54;

        resultLabel.textContent = value + " inches equals";
        resultDisplay.textContent = result.toFixed(2) + " cm";

    }

}

/* Convert on button click, while typing and when the unit changes */

convertButton.addEventListener("click", convertMeasurement);
lengthInput.addEventListener("input", convertMeasurement);
unitSelect.addEventListener("change", convertMeasurement);


/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

/** @param {boolean} isOpen */
function setMenuOpen(isOpen) {

    sidebar.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));

}

menuToggle.addEventListener("click", function () {

    setMenuOpen(!sidebar.classList.contains("open"));

});


/* Close mobile navigation after selecting a link */

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        setMenuOpen(false);

    });

});


/* Close mobile navigation when tapping outside it, or pressing Escape */

document.addEventListener("click", function (event) {

    if (!sidebar.classList.contains("open")) {
        return;
    }

    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenuOpen(false);
    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        setMenuOpen(false);
    }

});


/* =================================
   ACTIVE NAVIGATION HIGHLIGHT
================================= */

const navTargets = Array.from(navigationLinks)
    .map(function (link) {
        return {
            link: link,
            section: document.querySelector(link.getAttribute("href"))
        };
    })
    .filter(function (item) {
        return item.section !== null;
    });

/** @param {Element} activeLink */
function setActiveLink(activeLink) {

    navigationLinks.forEach(function (link) {
        link.classList.toggle("active", link === activeLink);
    });

}

function updateActiveLink() {

    const marker = 140; /* px from the top of the window */
    const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

    let current = navTargets[0];
    let currentTop = -Infinity;

    navTargets.forEach(function (item) {

        const top = item.section.getBoundingClientRect().top;

        /* Choose the section that has most recently passed the marker */
        if (top <= marker && top > currentTop) {
            current = item;
            currentTop = top;
        }

    });

    /* At the very bottom, highlight the last section on the page */
    if (atBottom) {

        let lastItem = navTargets[0];
        let lastTop = -Infinity;

        navTargets.forEach(function (item) {

            const top = item.section.getBoundingClientRect().top;

            if (top > lastTop) {
                lastItem = item;
                lastTop = top;
            }

        });

        current = lastItem;
    }

    setActiveLink(current.link);

}

let scrollQueued = false;

window.addEventListener("scroll", function () {

    if (scrollQueued) {
        return;
    }

    scrollQueued = true;

    window.requestAnimationFrame(function () {
        updateActiveLink();
        scrollQueued = false;
    });

}, { passive: true });

window.addEventListener("resize", updateActiveLink);

updateActiveLink();


/* =================================
   FEATURE NOTIFICATIONS
================================= */

const toast = document.getElementById("toast");

let toastTimeout;

/** @param {string} message */
function showMessage(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(function () {

        toast.classList.remove("show");

    }, 3500);

}


/* Buttons for features still under development */

const featureButtons = document.querySelectorAll("[data-message]");

featureButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showMessage(button.dataset.message);

    });

});


/* =================================
   INITIAL DASHBOARD MESSAGE
================================= */

console.log("Welcome to MeasureMate!");
console.log("Measure. Create. Perfect.");
