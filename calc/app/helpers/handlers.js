import { result } from "./dom";
import { state, operators } from "../main";


export function clickNumEventHandler(e) {
    result.value += e.target.value;
}

export function clickOperatorEventHandler(e) {
    if(e.target.value !== "√" && e.target.value !== "%") {
        state.action = operators[e.target.value];
        if(!state.n1) {
            state.n1 = Number(result.value);
        }
        result.value = "";
    } else if(e.target.value === "√") {
        result.value = operators[e.target.value](Number(result.value));
        state.n1 = Number(result.value);
    } else if(e.target.value === "%") {
        if(state.action) {
            state.n2 = Number(result.value);
            result.value = operators["="](state.n1, operators["%"](state.n2), state.action);
            state.n1 = Number(result.value);
        }
    }
}

export function clickEqualEventHandler(e) {
    state.n2 = Number(result.value);
    result.value = operators[e.target.value](state.n1, state.n2, state.action);
    state.n1 = Number(result.value);
}

export function clickDeleteEventHandler(e) {
    state.n1 = "";
    state.n2 = "";
    state.action = "";
    result.value = "";
}