var asks = document.getElementsByClassName("ask");
var count = 0;
var progressBar = document.querySelector("#progress_bar");
var asksCount = asks.length;
var step = parseInt(100 / asksCount);
var firstPart = document.querySelector(".left-first");
var secPart = document.querySelector(".first__right");

function nextask(quest) {
    progressBar.value = parseInt(progressBar.value) + 50;
    if (document.querySelector(".inactive")) {
        document.querySelector(".inactive").classList.remove("inactive");
    }

    if (count < asks.length - 1) {
        if (count == 0) {
            hideMainPart();
        }
        quest.style.display = "none";
        quest.nextElementSibling.style.display = "block";
        quest.nextElementSibling.classList.add("ask-animation");
        count++;
    } else {
        progressBar.value = 100;
        showForm();
        console.log("finish"); //sending results...
        if (fxOfLnks !== "undefined") {
            fxOfLnks();
        }
    }
}

function hideMainPart() {
    var secPartDivs = secPart.querySelectorAll("div");
    fadeOut(firstPart);
    fadeOut(secPartDivs[0]);
}

function showForm() {
    fadeOut(secPart);
    setTimeout(() => {
        document.querySelector(".contform").style.display = "flex";
    }, 300);
}

function fadeOut(element) {
    element.style.transition = "0.3s";
    element.style.opacity = 0;
    setTimeout(() => (element.style.display = "none"), 300);
}

Array.prototype.map.call(asks, (ask) => {
    ask.addEventListener("click", (e) => {
        if (e.target.classList.contains("qbt")) {
            nextask(ask);
        }
    });
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function addcommtt() {
    let count = document.querySelector("#comment_count");
    let countNumber = Number(count.textContent);
    let coms = 12;
    for (let i = 1; i < 6; i++) {
        let elem = document.querySelector("#comment" + coms);
        coms++;
        countNumber++;
        count.textContent = countNumber;
        elem.classList.add("ask-animation");
        elem.style.display = "block";
        await sleep(i * 4000);
    }
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const coment0 = document.querySelector("#reviews");
var listener = function () {
    if (isInViewport(coment0)) {
        addcommtt();
        document.removeEventListener("scroll", listener);
    }
};
document.addEventListener("scroll", listener);

function getRandomNumberViewers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
