$(document).ready(function () {
  // console.log("Ready");
  $("#AlertModal").modal('show');
});

let menu = document.querySelector("#menuBars");
let navbar = document.querySelector(".head-navbar");

menu.onclick = () => {
  menu.classList.toggle('fa-times')
  navbar.classList.toggle('active')
}

window.onscroll = () => {
  menu.classList.remove('fa-times')
  navbar.classList.remove('active')
}

VANTA.RINGS({
  el: "#home",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  backgroundColor: window.matchMedia("(max-width: 768px)").matches ? "#fff" : "#000",
  color: "#5595d1",
  backgroundAlpha: window.matchMedia("(max-width: 768px)").matches ? 0 : 1,
})


function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}


document.getElementById("reveal-button").addEventListener("click", function () {
  const blurContainer = document.getElementById("blurred-content");
  const button = this;

  if (blurContainer.style.filter === 'none') {
      blurContainer.style.filter = 'blur(5px)';
      button.textContent = 'Click to view a hint!';
  } else {
      blurContainer.style.filter = 'none';
      button.textContent = 'Click to hide a hint!';
  }
});