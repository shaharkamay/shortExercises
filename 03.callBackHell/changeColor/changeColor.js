let flag = 0;

function func(time, colors, callback, reject) {
  if (flag > colors.length) return;
  const rand = Math.floor(Math.random() * 10);
  if (biggerThenFive(rand)) {
    if (time < 1000) time = 1000;
  } else {
    console.log("your request was rejected ☹");
    console.log(`callback num: ${flag}`);
    return;
  }

  setTimeout(() => {
    changeColor(colors[flag]);
    flag++;
    func(time, colors);
  }, time);
}

function biggerThenFive(num) {
  return num > 5;
}

function changeColor(color) {
  document.body.style.backgroundColor = color;
}

func(300, ["red", "green", "yellow", "purple", "pink", "blue", "brown"]);
