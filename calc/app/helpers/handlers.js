import { buttonsValues, result } from "./dom";
import { state } from "../main";


export function clickNumEventHandler(e) {
    result.value += e.target.value;
}

export function clickOperatorEventHandler(e) {
    if(e.target.value !== "√" && e.target.value !== "%") {
        state.action = buttonsValues[e.target.value];
        if(!state.n1) {
            state.n1 = Number(result.value);
        }
        result.value = "";
    } else if(e.target.value === "√") {
        result.value = buttonsValues[e.target.value](Number(result.value));
        state.n1 = Number(result.value);
        // state.n2 = "";
        // state.action = "";
    } else if(e.target.value === "%") {
        if(state.action) {
            state.n2 = Number(result.value);
            result.value = buttonsValues["="](state.n1, buttonsValues["%"](state.n2), state.action);
            state.n1 = Number(result.value);
            // state.n2 = "";
            // state.action = "";
        }
    }
}

export function clickEqualEventHandler(e) {
    state.n2 = Number(result.value);
    result.value = buttonsValues[e.target.value](state.n1, state.n2, state.action);
    state.n1 = Number(result.value);
    // state.n2 = "";
    // state.action = "";
}

export function clickDeleteEventHandler(e) {
    state.n1 = "";
    state.n2 = "";
    state.action = "";
    result.value = "";
}