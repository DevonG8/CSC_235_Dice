//rollcount and total chips outside function
let rollCount = 0;
let totalChips = 10;

function roll_dice() {
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;

    // Hide all dice images first
    for (let i = 1; i <= 6; i++) {
        document.getElementById("dice" + i + "_1").style.display = "none";
        document.getElementById("dice" + i + "_2").style.display = "none";
    }

    // Show rolled dice
    document.getElementById("dice" + die1 + "_1").style.display =
        "inline-block";
    document.getElementById("dice" + die2 + "_2").style.display =
        "inline-block";

    // Update roll count
    rollCount++;
    document.getElementById("counter").textContent = rollCount;

    // Remove chips from boxes corresponding to die1 and die2
    let chips_removed = remove_chips(die1 + die2);

    // Update the status message based on chips removed
    let statusMessageElement = document.getElementById("status-message");
    if (chips_removed > 0) {
        totalChips -= chips_removed;
        statusMessageElement.textContent = "Status: A chip was decreased!";
    } else {
        statusMessageElement.textContent =
            "Status: Sorry, you missed that time!";
    }

    // Update remaining chips
    document.getElementById("remaining-chips").textContent = totalChips;

    // Perform partial reset after the roll
    partial_reset();

    // check if player won
    if (check_win_condition()) {
        statusMessageElement.textContent =
            "You won! it took you " + rollCount + " chips";
    }
}

function remove_chips(dieResult) {
    let box = document.getElementById(`box-${dieResult}`);
    let chips_Removed = 0;

    if (box) {
        let chipCountElement = box.querySelector(".chip-count");
        let current_Count = parseInt(chipCountElement.textContent);

        //remove chip if on box
        if (current_Count > 0) {
            chipCountElement.textContent = current_Count - 1;
            chips_Removed = 1;

            //hide boxes when only one chip
            if (current_Count - 1 === 0) {
                chipCountElement.style.display = "none";
                box.style.visibility = "hidden";
                box.style.pointerEvents = "none";
            }
        }
    }

    return chips_Removed;
}

function check_win_condition() {
    // Check if no chips remain
    let remainingChips = parseInt(
        document.getElementById("remaining-chips").textContent
    );
    return remainingChips === 0;
}

function reset_game() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        // Reset number for all boxes
        let chipCountElement = box.querySelector(".chip-count");
        chipCountElement.textContent = "0";
        chipCountElement.style.display = "none";

        // bring back hiden boxes
        box.style.visibility = "visible";
        box.style.pointerEvents = "auto";
    });

    // Reset chips to 10
    totalChips = 10;
    document.getElementById("remaining-chips").textContent = totalChips;

    // Reset roll count and update display
    rollCount = 0;
    document.getElementById("counter").textContent = rollCount;

    // reset start message
    document.getElementById("status-message").textContent = "Start game";

    // hide all dice images
    for (let i = 1; i <= 6; i++) {
        document.getElementById("dice" + i + "_1").style.display = "none";
        document.getElementById("dice" + i + "_2").style.display = "none";
    }
}

//reset of boxes and remaining chips upon roll
function partial_reset() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.querySelector(".chip-count").textContent = "0";
        box.querySelector(".chip-count").style.display = "none";
    });
    // Reset remaining chips
    document.getElementById("remaining-chips").textContent = totalChips;
}

// Clicking on boxes adds chips
document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
        let remainingChipsElement = document.getElementById("remaining-chips");
        let remaining_Chips = parseInt(remainingChipsElement.textContent);

        if (remaining_Chips > 0) {
            let chipCountElement = this.querySelector(".chip-count");
            let currentChipCount = parseInt(chipCountElement.textContent);
            chipCountElement.textContent = currentChipCount + 1;
            chipCountElement.style.display = "inline-block";
            remainingChipsElement.textContent = remaining_Chips - 1;
        }
    });
});
