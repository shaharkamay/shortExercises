function isRightAngleTriangle(leg1, leg2, leg3) {
  if (square(leg1) + square(leg2) === square(leg3)) {
    return true;
  }
  return false;
}

function square(num) {
  return multiply(num, num);
}

function multiply(num1, num2) {
  return num1 * num2;
}

console.log(isRightAngleTriangle(3, 4, 5));
