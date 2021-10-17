import { equal, summery, difference, division, product, root, percent, } from "./math";
import { clickNumEventHandler, clickOperatorEventHandler, clickEqualEventHandler, clickDeleteEventHandler } from "./handlers";

export const buttonsValues = { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 0,
    "=": equal,
    "+": summery,
    "-": difference,
    "/": division,
    "X": product,
    "√": root,
    "%": percent,
};

const buttons = document.querySelectorAll("input[type=button]");
export const result = document.querySelector(".result");

export function starter() {
    result.value = "";
    buttons.forEach((button) => {
        if(isNaN(button.value)) {
            if(button.value !== "=" && button.value !== "Del") {
                button.addEventListener("click", clickOperatorEventHandler);
            }
            else {
                if(button.value === "=") button.addEventListener("click", clickEqualEventHandler);
                if(button.value === "Del") button.addEventListener("click", clickDeleteEventHandler);
            }
        } else {
            button.addEventListener("click", clickNumEventHandler);
        }
    })
};
