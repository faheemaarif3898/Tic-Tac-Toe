let boxes = document.querySelectorAll(".hover")
let reset_btn = document.querySelector(".reset")
let msg_status = document.querySelector(".status")
let new_btn = document.querySelector("#new-btn")
let msg = document.querySelector(".msg")

let draw = true;
let count = 0;

let turn_O = true;



const reset_game = () => {
    turn_O = true;
    draw = true;
    count = 0;
    enb_btn()
    msg_status.classList.add("hide")
    new_btn.classList.add("hide")
}

let win_combo = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const dis_btn = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

const enb_btn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }

}

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}`
    msg_status.classList.remove("hide")
    new_btn.classList.remove("hide")
    dis_btn()
}

const showDraw = () => {
    msg.innerText = `🤝 The match was a Tie`
    msg_status.classList.remove("hide")
    new_btn.classList.remove("hide")
    dis_btn()
}



const check_winner = () => {
    for (let combo of win_combo) {
        let pos1_val = boxes[combo[0]].innerText
        let pos2_val = boxes[combo[1]].innerText
        let pos3_val = boxes[combo[2]].innerText

        if (pos1_val != "" && pos2_val != "" && pos3_val != "") {
            if (pos1_val === pos2_val && pos2_val === pos3_val) {
                draw = false;
                showWinner(pos1_val);
                return;
            }
        }
    }
    if (count == 9) {
        if (draw) {
            showDraw()
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_O) {
            box.innerText = "O";
            box.classList.add("O")
            turn_O = false;
        }
        else {
            box.innerText = "X"
            box.classList.add("X")
            turn_O = true;
        }
        count++;
        box.disabled = true;

        check_winner()

    })

});



new_btn.addEventListener("click", reset_game)
reset_btn.addEventListener("click", reset_game)
