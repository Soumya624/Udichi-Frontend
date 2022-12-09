const gradient = document.querySelector(".gradient");

function onMouseMove(event) {
  gradient.style.backgroundImage =
    "radial-gradient(at " +
    event.clientX +
    "px " +
    event.clientY +
    "px, rgba(255, 255, 255, 0.9) 0, #ffffff 70%)";
}
document.addEventListener("mousemove", onMouseMove);
