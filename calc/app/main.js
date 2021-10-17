import "./styles.css";
import { starter } from "./helpers/dom.js";
import { equal, summery, difference, division, product, root, percent, } from "./helpers/math";

export const state = { n1: "", n2: "", action: "", };
export const operators = { 
    "=": equal,
    "+": summery,
    "-": difference,
    "/": division,
    "X": product,
    "√": root,
    "%": percent,
};

starter();