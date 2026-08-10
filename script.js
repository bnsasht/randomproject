const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const tasklist = document.getElementById("tasklist");

function createTask(text, done) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  if (done) {
    li.classList.add("done");
  }

  li.addEventListener("click", function() {
    li.classList.toggle("done");
    saveTasks();
  });

  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  li.appendChild(delBtn);

  delBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
  });

  tasklist.appendChild(li);
}

function saveTasks() {
  let tasks = [];
  for (let i = 0; i < tasklist.children.length; i++) {
    let li = tasklist.children[i];
    let span = li.querySelector("span");
    tasks.push({
      text: span.textContent,
      done: li.classList.contains("done")
    });
  }
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = localStorage.getItem("myTasks");
  if (!saved) return;
  let tasks = JSON.parse(saved);
  tasks.forEach(function(task) {
    createTask(task.text, task.done);
  });
}

addButton.addEventListener("click", function() {
  let taskText = input.value;
  if (taskText.trim() === "") {
    return;
  }
  createTask(taskText, false);
  saveTasks();
  input.value = "";
});

loadTasks();