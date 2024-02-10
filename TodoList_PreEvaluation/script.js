const LOCALSTORAGE = {
  taskList: "taskList",
};
let form = document.querySelector("form");
let addTaskButton = document.getElementById("addTaskButton");

//form validation function
function formValidation(taskName, taskDescription, dueDate, taskCategory) {
  let valid = true;
  if (taskName.trim() === "") {
    $("#name_error").html("Please Enter Task Name");
    valid = false;
  } else {
    $("#name_error").html("");
  }

  if (taskDescription.trim() === "") {
    $("#description_error").html("Please Enter Task Description");
    valid = false;
  } else {
    $("#description_error").html("");
  }

  if (taskCategory === "") {
    $("#category_error").html("Please Select Category");
    valid = false;
  } else {
    $("#category_error").html("");
  }

  if (!$('input[name="taskPriority"]:checked').length > 0) {
    $("#taskPriority_error").html("Please Select Priority");
    valid = false;
  } else {
    $("#taskPriority_error").html("");
  }
  if (!dueDate) {
    $("#dueDate_error").html("Select Due Date");
    valid = false;
  } else {
    $("#dueDate_error").html("");
  }
  return valid;
}

//task complete funtion
const handleCompleted = (id) => {
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  let taskIndex = taskList.findIndex((task) => task.id === id);
  if (taskList[taskIndex].isCompleted) {
    alert("Task is already marks as completed !");
    return;
  }
  let conformed = confirm("Mark this task as completed ?");
  if (conformed) {
    if (taskIndex >= 0) {
      taskList[taskIndex] = {
        ...taskList[taskIndex],
        isCompleted: true,
      };
      localStorage.setItem(LOCALSTORAGE.taskList, JSON.stringify(taskList));
    }
  }
  renderTasks();
};

//category wise redner
const rednerCategory = (selected) => {
  let taskListContainer = document.querySelector(".categoryTasklist");
  taskListContainer.innerHTML = "";
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  const filterCategory = taskList.filter((task) => task.category === selected);
  const filterPriority = taskList.filter((task) => task.priority === selected);

  let filterStatus = [];
  // if (selected == "true" || selected == "false") {
  //   if (selected == "true") {
  //     filterStatus = taskList.filter((task) => task.isCompleted);
  //   } else {
  //     filterStatus = taskList.filter((task) => !task.isCompleted);
  //   }
  // }
  if (selected === "true" || selected === "false") {
    filterStatus = taskList.filter((task) => task.isCompleted === (selected === "true"));
  }

  const filteredTasks = [...filterCategory, ...filterStatus, ...filterPriority];
  console.log(filteredTasks);
  filteredTasks.forEach((task) => {
    const HTMLDATE = `
          <div class="taskControl">
          <span class="taskHead">${task.name}</span>
         
        </div>
        <div class="taskInfo">
          <span>Category - ${task.category}</span>
          <span>Priority - ${task.priority} </span>
        </div>
        <span class="taskDetail">${task.description}</span>
        <span class="duedate">Due Date : ${task.dueDate}</span>
        <div class="timeStatus">
          <span>Added On : ${task.createdAt}</span>
          <span>Update On : ${task.updatedOn ? task.updatedOn : "NA"}</span>
        
        </div>
    `;
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    task.isCompleted ? taskDiv.setAttribute("id", "completeTask") : "";
    taskDiv.innerHTML = HTMLDATE;
    taskListContainer.appendChild(taskDiv);
  });
  taskListContainer.innerHTML = filteredTasks.length
    ? taskListContainer.innerHTML
    : "<h2>No Task Found For This Category</h2>";
};

//function for updating task
const updateTask = (id) => {
  let taskName = $("#taskName").val();
  let taskDescription = $("#taskDescription").val();
  let taskCategory = $("#taskCategory").val();
  let dueDate = $("#dueDate").val();
  let priorityValue = document.querySelector(
    'input[name="taskPriority"]:checked'
  ).value;
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  let taskIndex = taskList.findIndex((task) => task.id === id);

  if (taskIndex >= 0) {
    taskList[taskIndex] = {
      ...taskList[taskIndex],
      name: taskName,
      description: taskDescription,
      priority: priorityValue,
      category: taskCategory,
      dueDate: dueDate,
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
  let dueDate = document.getElementById("dueDate").value;
  let taskCategory = document.getElementById("taskCategory").value;
  let taskUpdateId = parseInt(addTaskButton.getAttribute("data-id"));

  const formValid = formValidation(
    taskName,
    taskDescription,
    dueDate,
    taskCategory
  );

  if (formValid) {
    if (taskUpdateId) {
      updateTask(taskUpdateId);
    } else {
      let priorityValue = document.querySelector(
        'input[name="taskPriority"]:checked'
      ).value;
      let taskList =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
      let taskName = document.getElementById("taskName").value;
      let taskDescription = document.getElementById("taskDescription").value;
      let newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        priority: priorityValue,
        category: taskCategory,
        dueDate: dueDate,
        isCompleted: false,
        createdAt: new Date().toLocaleString(),
        updatedOn: null,
      };
      taskList = [...taskList, newTask];
      localStorage.setItem(LOCALSTORAGE.taskList, JSON.stringify(taskList));
      alert("Task Added");
      $("form")[0].reset();
      renderTasks();
    }
  }
};

//delete task
const handleDelete = (id) => {
  let conformed = confirm("Are you sure to remove this task?");
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
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];
  let filterTaskList = taskList.filter((task) => task.id === id);
  const { name, description, category, dueDate, priority, isCompleted } =
    filterTaskList[0];
  if (isCompleted) {
    alert("You can't edit completed task !");
    return;
  }
  $("#addTaskButton").attr("data-id", id);
  $("#addTaskButton").attr("value", "UPDATE TASK");

  $("#taskName").val(name);
  $("#taskDescription").val(description);
  $("#taskCategory").val(category);
  $("#dueDate").val(dueDate);
  // document.querySelector('input[name="taskPriority"]').value = priority;
};

//renderTask function
const renderTasks = () => {
  let AllTasklist = document.querySelector(".AllTasklist");
  AllTasklist.innerHTML = "";
  let taskList = JSON.parse(localStorage.getItem(LOCALSTORAGE.taskList)) || [];

  taskList.forEach((task) => {
    const HTMLDATE = `
          <div class="taskControl">
          <span class="taskHead">${task.name}</span>
          <div class="buttonGroup">
            <button onClick="handleCompleted(${
              task.id
            });"><i class="fa-solid fa-check"></i></button>
            <button onClick="bindTaskData(${task.id});">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button onClick="handleDelete(${task.id});">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="taskInfo">
          <span>Category - ${task.category}</span>
          <span>Priority - ${task.priority} </span>
        </div>
        <span class="taskDetail">${task.description}</span>
        <span class="duedate">Due Date : ${task.dueDate}</span>
        <div class="timeStatus">
          <span>Added On : ${task.createdAt}</span>
          
          <span>Update On : ${task.updatedOn ? task.updatedOn : "NA"}</span>
        </div>
    `;
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.innerHTML = HTMLDATE;

    task.isCompleted ? taskDiv.setAttribute("id", "completeTask") : "";
    AllTasklist.appendChild(taskDiv);
  });
  AllTasklist.innerHTML = taskList.length
    ? AllTasklist.innerHTML
    : "<h3>Your Todo List is empty. </h3>";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToLocalStorage();
});

renderTasks();
