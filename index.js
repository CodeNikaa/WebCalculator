/*let numberOfButtons = document.querySelectorAll(".button").length;

for (let i = 0; i < numberOfButtons; i++) {
    document.querySelectorAll(".button")[i].addEventListener("click", function() {
        let buttonInnerHtml = this.innerHTML;

        appendDisplay(buttonInnerHtml);
    })
}*/

const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll("button");

buttons.forEach(function(button)) {
    button.addEventListener("click", function() {
        const value = this.dataset.value;
        const type = this.dataset.type;

        if ( type === "number" || type == "decimal") {
            if (display.textContent === "0") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }

        if (value === "AC") {
            display.textContent = "0";
        }
        
})};