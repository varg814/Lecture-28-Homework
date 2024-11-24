let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[date.getDay()].slice(0, 3);
let number = date.getDate();
let period = hours >= 12 ? "PM" : "AM";

let smallTime = document.getElementById("smallTime");
smallTime.textContent = `${day} ${number}`;

let largeTime = document.getElementById("largeTime");
largeTime.textContent = `${hours}:${formattedMinutes} ${period}`;

let contentDiv = document.getElementById("contentDiv");
let input = document.getElementById("input");
let form = document.getElementById("form");
let data = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let taskTime = new Date().toLocaleTimeString();
  if (input.value.length !== 0) {
    data.push({
      task: input.value,
      taskTime: taskTime,
    });
  } else {
    alert("enter a task!!!");
  }

  localStorage.setItem("tasks", JSON.stringify(data));

  runCode();
  input.value = "";
});

function runCode() {
  contentDiv.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    const item = document.createElement("div");
    item.classList.add("item");

    const itemTask = document.createElement("div");
    itemTask.classList.add("itemTask");

    const h1 = document.createElement("h1");
    h1.textContent = data[index].task;

    const p = document.createElement("p");
    p.textContent = `today at ${data[index].taskTime}`;

    const itemStatus = document.createElement("div");
    itemStatus.classList.add("itemStatus");

    const radio = document.createElement("input");
    radio.type = "radio";

    const jsButton = document.createElement("button");
    jsButton.classList.add("jsButton");
    jsButton.addEventListener("click", () => {
      del(index);
    });

    itemStatus.appendChild(radio);
    itemStatus.appendChild(jsButton);

    itemTask.appendChild(h1);
    itemTask.appendChild(p);

    item.appendChild(itemTask);
    item.appendChild(itemStatus);

    contentDiv.appendChild(item);
  }
}

function del(index) {
  data.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(data));

  runCode();
}

runCode();
