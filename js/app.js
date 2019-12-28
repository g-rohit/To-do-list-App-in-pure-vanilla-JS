// defining variables

let form = document.querySelector("#task-form");
let taskList = document.querySelector(".collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.querySelector("#filter");
let taskInput = document.querySelector("#task");
let emptyInput = document.querySelector("#emptyInput");
let clearInputErr = document.querySelector("#taskListDelErr");
let actionBtn1 = document.querySelector("#actionBtn1");
let actionBtn2 = document.querySelector("#actionBtn2");

//calling -  load all events
loadEventListeners();

// function for load all events
function loadEventListeners() {
// DOM load event, when the content is loaded on dom, load the tasks from LS
document.addEventListener('DOMContentLoaded', loadTasks);
  // add task event
  form.addEventListener("submit", addTask);

  //   removing task
  taskList.addEventListener("click", removeTask);

  //clear tasks events
  clearBtn.addEventListener("click", clearAllTasks);

  //filter task lists

  filter.addEventListener("keyup", filterTasks);

  // show icon on hover - actionBtn1
  // actionBtn1.addEventListener("mouseover", showFAIcon);

  // hide icon on mouse out - actionBtn1
  // actionBtn1.addEventListener("mouseout", hideFAIcon);

  // show icon on hover - actionBtn2
  // actionBtn2.addEventListener("mouseover", showFAIcon);

  // hide icon on mouse out - actionBtn2
  // actionBtn2.addEventListener("mouseout", hideFAIcon);
}

// Load tasks from Local storage

function loadTasks() {
  
  let todoList;
  if (localStorage.getItem('todoList') === null) {
    // if the local storage doesnt have the items, set it to an empty array
    todoList = [];
  } else {
    // since local storage can store only strings, we need to parse
    todoList =  JSON.parse(localStorage.getItem('todoList'));
  }

  todoList.forEach((task) => {
    
    //create li element
    const li = document.createElement("li");

    //add a class
    li.className = "collection-item";

    // add the input content to li
    li.innerHTML = task;

    //creating a link
    const link = document.createElement("a");

    // adding anchor tag to a
    link.setAttribute("href", "#");

    // adding class
    link.className = "delete-item secondary-content red-text  ";

    // add delete icon html
    link.innerHTML = '<i class="fal fa-trash-alt"></i>';

    //append the link to li
    li.appendChild(link);

    // console.log(li);

    //appending link to the UL
    taskList.appendChild(li);
  })

}
// adding task

function addTask(e) {
  if (taskInput.value === "") {
    // alert('Please add new task')
    emptyInput.innerHTML = "Please write a new Task and then click on Add";
  } else {
    emptyInput.innerHTML = "";
    clearInputErr.innerHTML = "";

    console.log(`Task added: ${taskInput.value}`);

    //create li element
    const li = document.createElement("li");

    //add a class
    li.className = "collection-item ";

    // add the input content to li
    li.innerHTML = taskInput.value;

    //creating a link
    const link = document.createElement("a");

    // adding anchor tag to a
    link.setAttribute("href", "#");

    // adding class
    link.className = "delete-item secondary-content red-text  ";

    // add delete icon html
    link.innerHTML = '<i class="fal fa-trash-alt"></i>';

    //append the link to li
    li.appendChild(link);

    // console.log(li);

    //appending link to the UL
    taskList.appendChild(li);

    // adding task to the local storage
    addToLocalStorage(taskInput.value);

    // clear input
    taskInput.value = "";
  }

  e.preventDefault();
}



// Store task in local storage

function addToLocalStorage(task) {
  console.log('input task incoming: ' + task);
  
  let todoList;
  if (localStorage.getItem('todoList') === null) {
    // if the local storage doesnt have the items, set it to an empty array
    todoList = [];
  } else {
    // since local storage can store only strings, we need to parse
    todoList =  JSON.parse(localStorage.getItem('todoList'));
  }

  // push to array

  console.log(`task to be pushed: ${task}`);
  todoList.push(task);
  console.log(`todoList: ${todoList}`);

  localStorage.setItem("todoList", JSON.stringify(todoList));
}



// removing item
function removeTask(e) {
  // console.log('e.target');
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure to delete?")) {
      console.log(
        `Task deleted: ${e.target.parentElement.parentElement.outerText}`
      );
      e.target.parentElement.parentElement.remove();
      
  // remove from local storage
 
  removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();

}

// removing items from Local Storage:

function removeTasksFromLocalStorage(taskItem) {
  
  let todoList;

  if (localStorage.getItem('todoList') === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem('todoList'))
  }


  todoList.forEach((task, index) => {
    if (taskItem.textContent === task) {
      todoList.splice(index, 1);
    }
  })


  localStorage.setItem('todoList', JSON.stringify(todoList));
}


//  clear all tasks button function

function clearAllTasks(e) {
  e.preventDefault();

  if (taskList.childElementCount != 0) {
    clearInputErr.innerHTML = "";
    if (confirm("Are you sure to delete?")) {
      console.log("All tasks deleted");
      taskList.innerHTML = "";
        //clear all from LS
  clearAllfromLocalStorage();
    }
  } else {
    clearInputErr.innerHTML = "Nothing to delete";
  }


}


// function to remove all items from LS

function clearAllfromLocalStorage() {
  localStorage.clear();
}
//  filter the task Lists

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // we have to get all the tasks items and run a loop over it, and querySelectorAll returns a nodelist so we can run for each

  //item is the iterator
  document.querySelectorAll(".collection-item").forEach(eachTask => {
    // console.log(eachTask);

    const item = eachTask.firstChild.textContent.toLowerCase();
    console.log(item);

    // indexof searches for text and when there is no match it returns -1, if the letter matches, it returns the index of it
    if (item.indexOf(text) != -1) {
      eachTask.style.display = "block";
    } else {
      eachTask.style.display = "none";
    }
  });
}

// show fa icon
// function showFAIcon(e) {
//   // console.log(`show icon`);
//   //  console.log(e.target);

//   if (e.target.childNodes.length != 0) {
//     if (e.target.childNodes[1].className.includes("fa__icon")) {
//       e.target.childNodes[1].style.cssText = "display: inline;";
//     }
//   }
// }

// // show fa icon
// function hideFAIcon(e) {
//   // console.log(`hide icon`);
//   //     console.log(e.target);
//   // console.log(e.type);

//   if (e.target.childNodes.length != 0) {
//     if (e.target.childNodes[1].className.includes("fa__icon")) {
//       e.target.childNodes[1].style.cssText = "display: none;";
//     }
//   }
// }
