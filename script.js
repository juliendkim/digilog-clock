function createClock() {
    const clock = document.getElementById("clock");


    // Create hour labels (1 to 12)
    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30) * (Math.PI / 180); // Convert degrees to radians
        const radius = 165; // Distance from center to labels
        const x = 150 + Math.sin(angle) * radius; // x-coordinate
        const y = 150 - Math.cos(angle) * radius; // y-coordinate
        const label = document.createElement("div");
        label.className = "time-label";
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.innerText = i; // Display hour number
        clock.appendChild(label);
    }

    // Create 60 positions for each second/minute
    for (let i = 0; i < 60; i++) {
        for (let j = 1; j <= 7; j++) { // Layers of numbers (for hands)
            const angle = (i * 6) * (Math.PI / 180); // Convert degrees to radians
            const radius = j * 20; // Distance from center
            const x = 150 + Math.sin(angle) * radius; // x-coordinate
            const y = 150 - Math.cos(angle) * radius; // y-coordinate
            const number = document.createElement("div");
            number.className = "number";
            number.style.left = `${x}px`;
            number.style.top = `${y}px`;
            number.setAttribute("data-layer", j); // Save layer info
            number.setAttribute("data-index", i); // Save position index
            clock.appendChild(number);
        }
    }
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12; // Convert to 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const numbers = document.querySelectorAll(".number");

    // Clear all numbers
    numbers.forEach(number => {
        number.classList.remove("hour", "minute", "second");
        number.innerText = "";
    });

    // Display hour hand
    for (let j = 1; j <= 4; j++) { // Hour hand spans 3 layers
        const hourIndex = (hours * 5) % 60; // Hour position on clock
        const number = document.querySelector(
            `.number[data-index="${hourIndex}"][data-layer="${j}"]`
        );
        if (number) {
            number.classList.add("hour");
            number.innerText = hours;
        }
    }

    // Display minute hand
    for (let j = 1; j <= 6; j++) { // Minute hand spans 4 layers
        const number = document.querySelector(
            `.number[data-index="${minutes}"][data-layer="${j}"]`
        );
        if (number) {
            number.classList.add("minute");
            number.innerText = minutes;
        }
    }

    // Display second hand
    for (let j = 1; j <= 7; j++) { // Second hand spans 5 layers
        const number = document.querySelector(
            `.number[data-index="${seconds}"][data-layer="${j}"]`
        );
        if (number) {
            number.classList.add("second");
            number.innerText = seconds;
        }
    }
}

createClock(); // Initialize the clock structure
setInterval(updateClock, 1000); // Update every second
updateClock(); // Initial update
