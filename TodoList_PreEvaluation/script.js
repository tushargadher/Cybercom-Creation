const LOCALSTORAGE = {
  taskList: "taskList",
};
let form = document.querySelector("form");
let addTaskButton = document.getElementById("addTaskButton");


//form validation function
function formValidation(taskName, taskDescription) {
  let vaild = true;
  if (taskName === "") {
    $("#name_error").html("Enter Name");
    vaild = false;
  } else {
    $("#name_error").html("");
  }
  if (taskDescription === "") {
    $("#description_error").html("Enter Task Description");
    vaild = false;
  } else {
    $("#description_error").html("");
  }
  return vaild;
}
const updateTask = (id) => {
  let taskName = $("#taskName").val();
  let taskDescription = $("#taskDescription").val();
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  let taskIndex = taskList.findIndex((task) => task.id === id);
  console.log(taskIndex);
  if (taskIndex >= 0) {
    taskList[taskIndex] = {
      ...taskList[taskIndex],
      name: taskName,
      description: taskDescription,
      updatedOn: new Date().toLocaleString(),
    };
    localStorage.setItem(LOCALSTORAGE.taskList, JSON.stringify(taskList));
  }
  $("form")[0].reset();
  $("#addTaskButton").attr("value", "ADD TASK");
  $("#addTaskButton").removeAttr("data-id");
  renderTasks();
};

//save task into localstorage
const addToLocalStorage = () => {
  let taskName = document.getElementById("taskName").value;
  let taskDescription = document.getElementById("taskDescription").value;
  let taskUpdateId = parseInt(addTaskButton.getAttribute("data-id"));
  // let formVaild = validateForm();
  const formValid = formValidation(taskName, taskDescription);
  if (formValid) {
    if (taskUpdateId) {
      updateTask(taskUpdateId);
    } else {
      let taskList =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
      let taskName = document.getElementById("taskName").value;
      let taskDescription = document.getElementById("taskDescription").value;
      let newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        savedOn: new Date().toLocaleString(),
        updatedOn: null,
      };
      taskList = [...taskList, newTask];
      localStorage.setItem(LOCALSTORAGE.taskList, JSON.stringify(taskList));
      alert("Task Added...");
      $("form")[0].reset();
      renderTasks();
    }
  }
};

//delete task
const handleDelete = (id) => {
  let conformed = confirm("Are you sure to delete this task?");
  if (conformed) {
    let taskList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
    let filterTaskList = taskList.filter((task) => task.id !== id);
    localStorage.setItem(LOCALSTORAGE.taskList, JSON.stringify(filterTaskList));
    renderTasks();
  }
};

//edit task function
const bindTaskData = (id) => {
  $("#addTaskButton").attr("data-id", id);
  $("#addTaskButton").attr("value", "UPDATE TASK");
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  let filterTaskList = taskList.filter((task) => task.id === id);
  //   console.log(filterTaskList);
  const { name, description } = filterTaskList[0];
  $("#taskName").val(name);
  $("#taskDescription").val(description);
};

//renderTask function
const renderTasks = () => {
  let taskListContainer = document.querySelector(".taskList");
  taskListContainer.innerHTML = "";
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  console.log(taskList);
  taskList.forEach((task) => {
    const HTMLDATE = `<div class="taskControl">
            <span class="taskHead">${task.name}</span>
            <div class="buttonGroup">
              <button onClick="bindTaskData(${task.id});">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button onClick="handleDelete(${task.id});"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
          <span class="taskDetail">${task.description}</span>
          <div class="timeStatus">
            <span>Saved on : ${task.savedOn}</span>
            <span>Update On : ${task.updatedOn}</span>
          </div>
    `;
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.innerHTML = HTMLDATE;
    taskListContainer.appendChild(taskDiv);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToLocalStorage();
});
renderTasks();
