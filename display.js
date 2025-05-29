// display.js
const socket = new WebSocket("ws://localhost:8080");

const video = document.getElementById("video");
const quote = document.getElementById("quote");
const fullQuote = document.getElementById("fullQuote");
const nameDisplay = document.getElementById("submittedName");
const nameContainer = document.getElementById("nameContainer");
const quoteProtect = document.querySelector(".quote-protect");

socket.onmessage = (event) => {
  if (event.data === "knock") {
    video.src = "doorsopen.mp4";
    video.loop = false;
    video.play();
    video.onended = () => {
      document.getElementById("floatingScreen").style.display = "block";
      setTimeout(() => {
        quote.classList.add("fade-in");
        floatNames();
        if (socket.readyState === WebSocket.OPEN) {
          socket.send("ready-for-input");
        }
      }, 500);
    };
  }

  if (event.data.startsWith("name:")) {
    const name = event.data.slice(5).trim();

    if (nameDisplay) {
      nameDisplay.textContent = name;
      nameDisplay.style.opacity = 1;
    }
    if (fullQuote) fullQuote.style.opacity = 1;
    if (quoteProtect) quoteProtect.classList.remove("hidden");

    // 🔽 Animate quotes + shrink name + float
    setTimeout(() => {
      if (fullQuote) fullQuote.classList.add("fade-out");
      setTimeout(() => {
        if (quote) quote.classList.add("fade-out");
        if (quoteProtect) quoteProtect.classList.add("fade-out");
      }, 2000);

      setTimeout(() => {
        if (nameDisplay) {
          nameDisplay.classList.add("shrink-to-float");

          setTimeout(() => {
            const span = document.createElement("span");
            span.className = "name";
            span.textContent = name;
            nameContainer.appendChild(span);

            startGalaxyEffect();
          }, 2000);
        }
      }, 4000);
    }, 6000);
  }
};

function floatNames() {
  const names = [
    "Ryan", "Kim", "Phil", "Mike", "Hannah", "Tom", "John", "Ted",
    "Lena", "Marcus", "Elijah", "Nora", "Ava", "Isaac", "Faith", "Julian",
    "Sofia", "Grace", "Daniel", "Liam", "Zoe", "Ethan", "Olivia", "Emma",
    "Noah", "Lucas", "Mia", "Layla", "Logan", "Chloe", "Ella", "Jack",
    "Anna", "Joshua", "Carter", "Natalie", "Ruby", "James", "Amelia",
    "Henry", "Victoria", "Sebastian", "Skylar", "Leo", "Hazel", "Aaron", "Piper"
  ];

  names.forEach((name) => {
    const span = document.createElement("span");
    span.className = "name";
    span.textContent = name;

    const sides = ["top", "bottom", "left", "right"];
    const side = sides[Math.floor(Math.random() * sides.length)];
    let animationName = "";

    span.style.top = Math.random() * 80 + 10 + "%";
    span.style.left = Math.random() * 80 + 10 + "%";

    switch (side) {
      case "top": animationName = "floatFromTop"; break;
      case "bottom": animationName = "floatFromBottom"; break;
      case "left": animationName = "floatFromLeft"; break;
      case "right": animationName = "floatFromRight"; break;
    }

    const angle = Math.floor(Math.random() * 40 - 20);
    span.style.setProperty('--angle', angle + "deg");
    span.style.animation = `${animationName} 20s cubic-bezier(0.33, 1, 0.68, 1) forwards`;
    nameContainer.appendChild(span);
  });
}

function startGalaxyEffect() {
  const names = document.querySelectorAll('.name');
  names.forEach(name => {
    name.classList.add('galaxy-star');
  });

  const additionalNames = [
    "Ryan", "Kim", "Phil", "Mike", "Hannah", "Tom", "John", "Ted",
    "Lena", "Marcus", "Elijah", "Nora", "Ava", "Isaac", "Faith", "Julian",
    "Sofia", "Grace", "Daniel", "Liam", "Zoe", "Ethan", "Olivia", "Emma",
    "Noah", "Lucas", "Mia", "Layla", "Logan", "Chloe", "Ella", "Jack",
    "Anna", "Joshua", "Carter", "Natalie", "Ruby", "James", "Amelia",
    "Henry", "Victoria", "Sebastian", "Skylar", "Leo", "Hazel", "Aaron", "Piper"
  ];

  additionalNames.forEach(nameText => {
    const span = document.createElement("span");
    span.className = "name galaxy-star";
    span.textContent = nameText;
    span.style.top = Math.random() * 100 + "%";
    span.style.left = Math.random() * 100 + "%";
    nameContainer.appendChild(span);
  });

  setTimeout(() => {
    const allNames = document.querySelectorAll('.name');
    allNames.forEach(name => {
      name.classList.add('converge');
    });
  }, 5000);
}
