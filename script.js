let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let stat = document.querySelector(".status");

let playerO = true;
const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (playerO) {
                box.innerText = "O";
                playerO = false;
                stat.innerHTML = "<b>Player X's turn</b>";
            } else {
                box.innerText = "X";
                playerO = true;
                stat.innerHTML = "<b>Player O's turn</b>";
            }
            box.disabled = true;
            let winner = checkWinner();
            if (winner) {
                stat.innerHTML = `<b>Player ${winner} Wins. 🎉</b>`;
                stat.classList.add("highlight");
                disableBoxes();
                triggerConfetti();
            } else if (isDraw()) {
                stat.innerHTML = `<b>It's a Draw. 🤝</b>`;
                stat.classList.add("highlight");
            }
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    playerO = true;
    stat.innerHTML = "<b>Player O's turn</b>";
    stat.classList.remove("highlight");
}

const checkWinner = () => {
    for (let combination of winningCombinations) {
        let pos1 = boxes[combination[0]].innerText;
        let pos2 = boxes[combination[1]].innerText;
        let pos3 = boxes[combination[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                return pos1;
            }
        }
    }
    return null;
}

const isDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
}

resetBtn.addEventListener("click", enableBoxes);

const triggerConfetti = () => {
    var duration = 1 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 50,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'], 
            shapes: ['square', 'circle'],
            scalar: 1.2
        });
        confetti({
            particleCount: 3,
            angle: 130,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'], 
            shapes: ['square', 'circle'],
            scalar: 1.2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
