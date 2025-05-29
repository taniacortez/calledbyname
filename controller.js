
const socket = new WebSocket("ws://localhost:8080");
const circle = document.getElementById("knockCircle");
const typeScreen = document.getElementById("typeScreen");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");

let bounceStage = 0;

// Handle knock interaction
circle.addEventListener("click", () => {
  if (!circle.classList.contains("shrink")) {
    circle.classList.add("shrink");
  }
});

circle.addEventListener("animationend", (e) => {
  if (e.animationName === "shrinkBounce") {
    circle.classList.remove("shrink");
    if (bounceStage === 1) {
      socket.send("knock");
      bounceStage = 0;

      // Fade to black and show input screen
      document.body.classList.add("fade-black");

      setTimeout(() => {
        typeScreen.classList.remove("hidden");
        typeScreen.classList.add("fade-in");
        document.querySelector(".circle-container").classList.add("hidden");
        document.querySelector(".verse").classList.add("hidden");
        document.querySelector(".ref").classList.add("hidden");
      }, 1000);
    } else {
      bounceStage = 1;
    }
  }
});

// Handle name submission
nameForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent refresh
  const name = nameInput.value.trim();
  if (name && socket.readyState === WebSocket.OPEN) {
    socket.send("name:" + name);
    console.log("Sent name to display:", name);
    nameInput.value = "";
  }
});
