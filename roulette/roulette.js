function generate() {
  let spin = Math.floor(Math.random() * 37);
  let color = "";

  if (spin === 0) {
    color = "limegreen";
  } else if (spin % 2 === 0) {
    if ((spin >= 1 && spin <= 10) || (spin >= 19 && spin <= 28)) {
      color = "Black";
    } else {
      color = "Red";
    }
  } else if (spin % 2 === 1) {
    if ((spin >= 11 && spin <= 18) || (spin >= 29 && spin <= 36)) {
      color = "Black";
    } else {
      color = "Red";
    }
  }

  let spinOutput = document.getElementById("spinOutput");
  let spinOutputDiv = document.getElementById("spinOutputDiv");
  spinOutput.innerText = spin.toString();
  spinOutputDiv.style.backgroundColor = color.toLowerCase().toString();

  return [spin, color];
}

function payout(inputMap, spin, color) {
  let payout = 0;

  for (let item of inputMap.keys()) {
    if (item === spin.toString()) {
      payout += inputMap.get(item) * 36;
    } else if (item === "first12" && spin >= 1 && spin <= 12) {
      payout += inputMap.get(item) * 3;
    } else if (item === "second12" && spin >= 13 && spin <= 24) {
      payout += inputMap.get(item) * 3;
    } else if (item === "third12" && spin >= 25 && spin <= 36) {
      payout += inputMap.get(item) * 3;
    } else if (item === "evens" && spin % 2 === 0) {
      payout += inputMap.get(item) * 2;
    } else if (item === "odds" && spin % 2 !== 0) {
      payout += inputMap.get(item) * 2;
    } else if (item === "red" && color == "Red") {
      payout += inputMap.get(item) * 2;
    } else if (item === "black" && color == "Black") {
      payout += inputMap.get(item) * 2;
    } else if (item === "high" && spin > 18) {
      payout += inputMap.get(item) * 2;
    } else if (item === "low" && spin <= 18) {
      payout += inputMap.get(item) * 2;
    }
  }

  return payout;
}

function main() {
  const cells = document.getElementsByTagName("td");
  const chips = document.getElementsByClassName("chips");
  const spinButton = document.getElementById("spin");
  const balanceDisplay = document.getElementById("balanceDisplay");
  const thisBetDisplay = document.getElementById("thisBetDisplay");
  let chipSize = 0;
  let thisBet = 0;
  let balance = 100;
  let userBets = new Map();
  let validStrings = [
    "first12",
    "second12",
    "third12",
    "evens",
    "odds",
    "red",
    "black",
    "high",
    "low",
  ];

  balanceDisplay.innerText = balance;
  thisBetDisplay.innerText = thisBet;

  for (let i = 0; i < 37; i++) {
    validStrings.push(i.toString());
  }

  for (let cell of cells) {
    cell.addEventListener("click", () => {
      if (balance < chipSize) {
        window.alert("Insufficient funds!");
      } else if (userBets.has(cell.id)) {
        let currentBet = userBets.get(cell.id);
        userBets.set(cell.id, currentBet + chipSize);
        balance -= chipSize;
        thisBet += chipSize;
      } else if (!userBets.has(cell.id)) {
        userBets.set(cell.id, chipSize);
        balance -= chipSize;
        thisBet += chipSize;
      }

      balanceDisplay.innerText = balance;
      thisBetDisplay.innerText = thisBet;
    });
  }

  for (let chip of chips) {
    chip.addEventListener("click", () => {
      for (let chipTool of chips) {
        chipTool.style.border = "none";
      }

      chipSize = parseInt(chip.id);
      chip.style.border = "3px solid";
    });
  }

  spinButton.addEventListener("click", () => {
    let output = generate();

    for (let cell of cells) {
      if (parseInt(cell.id) === output[0]) {
        cell.style.animation = "none";
        void cell.offsetWidth;
        cell.style.animation = "flash 1.5s ease-in-out";
      } else if (cell.id === "zero" && output[0] === 0) {
        cell.style.animation = "none";
        void cell.offsetWidth;
        cell.style.animation = "flash 1.5s ease-in-out";
      }
    }

    let winnings = payout(userBets, output[0], output[1]);
    balance += winnings;
    userBets.clear();
    balanceDisplay.innerText = balance;
    thisBet = 0;
    thisBetDisplay.innerText = thisBet;
  });
}

main();
