import { clickNumEventHandler, clickOperatorEventHandler, clickEqualEventHandler, clickDeleteEventHandler } from "./handlers";

const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const equalButton = document.querySelector(".equal");
const deleteButton = document.querySelector(".delete");
export const result = document.querySelector(".result");

export function starter() {
    result.value = "";
    addListeners(operatorButtons, "click", clickOperatorEventHandler);
    addListeners(numberButtons, "click", clickNumEventHandler);
    equalButton.addEventListener("click", clickEqualEventHandler);
    deleteButton.addEventListener("click", clickDeleteEventHandler);
}

function addListeners(elements, event, handler) {
    elements.forEach((elem) => {
        elem.addEventListener(event, handler);
    });
}
