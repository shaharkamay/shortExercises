function changeColors(time, color, callback, reject) {
  setTimeout(() => {
    const rand = Math.floor(Math.random() * 10);
    if (rand > 5) {
      changeBGColor(color);
      callback();
    } else {
      reject();
    }
  }, time);
}

function reject(count) {
  console.log(`${count} callback was rejected`);
}

function changeBGColor(color) {
  document.body.style.backgroundColor = color;
}

changeColors(
  1000,
  "red",
  () => {
    changeColors(
      1000,
      "blue",
      () => {
        changeColors(
          1000,
          "purple",
          () => {
            changeColors(
              1000,
              "yellow",
              () => {
                changeColors(
                  1000,
                  "green",
                  () => {
                    changeColors(
                      1000,
                      "pink",
                      () => {
                        changeColors(
                          1000,
                          "brown",
                          () => {},
                          () => {
                            reject(7);
                          }
                        );
                      },
                      () => {
                        reject(6);
                      }
                    );
                  },
                  () => {
                    reject(5);
                  }
                );
              },
              () => {
                reject(4);
              }
            );
          },
          () => {
            reject(3);
          }
        );
      },
      () => {
        reject(2);
      }
    );
  },
  () => {
    reject(1);
  }
);
