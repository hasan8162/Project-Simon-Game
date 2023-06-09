/*Time delation*/
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/*Queue implemntattion*/
class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.item = [];
  }

  enqueue(val) {
    if (this.front == 0) {
      this.front = 1;
      this.rear = 1;
    } else {
      this.rear = this.rear + 1;
    }
    this.item[this.rear] = val;
  }

  dequeue() {
    if (this.rear == this.front) {
      this.rear = 0;
      this.front = 0;
    } else {
      this.front = this.front + 1;
    }
  }

  size() {
    if (this.front == 0) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  Front() {
    return this.item[this.front];
  }
}

/*global variable*/
var lvl,
  toStart = 1;
var storeTheSequence = new Queue();

/*---------------STARTS HERE---------------*/

document.addEventListener("keypress", function (event) {
  lvl = 0;
  levelup(event.key, toStart);
  return;
});

async function levelup(key, start) {
  toStart = 0;
  if (key == "Enter" && start == 1) {
    lvl++;

    //task to do in each level

    document.querySelector("h1").innerHTML = "Level " + lvl; //update the level from the previous level
    await delay(1000);
    generateTheSequence(); //create a new sequence and make the computer to play the sequence
    await delay(lvl * 1000 + 500);
    userClick(); ////This function handles the buttons clicked by the user
  } else {
    document.querySelector("h1").innerHTML = "Game Over, Refresh to Restart";
  }
}

//This function will create a new sequence and make the computer to play the sequence
async function generateTheSequence() {
  for (var i = 0; i < lvl; i++) {
    let x = Math.floor(Math.random() * 16 + 1);
    storeTheSequence.enqueue(x);
    var activeButton = document.querySelector(".btn" + x.toString());
    activeButton.classList.add("pressed");
    await delay(500);
    activeButton.classList.remove("pressed");
    await delay(500);
  }
}

//This function handles the buttons clicked by the user
function userClick() {
  for (var i = 0; i < 16; i++) {
    var element = document.querySelectorAll(".bt")[i];
    element.addEventListener("click", byClick);
  }
}

//This function will do the comparisons with the buttons clicked by the user and the generated sequence
async function byClick() {
  var buttonNum = this.innerHTML;
  var clickedButton = document.querySelector(".btn" + buttonNum);
  clickedButton.classList.add("pressed");
  await delay(200);
  clickedButton.classList.remove("pressed");
  if (storeTheSequence.Front() == buttonNum) {
    storeTheSequence.dequeue();
    if (storeTheSequence.size() == 0) {
      levelup("Enter", 1);
    }
  } else {
    while (storeTheSequence.size()) {
      storeTheSequence.dequeue();
    }
    levelup("a");
  }
}
