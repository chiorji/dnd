const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onholdList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onholdListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;

// Get Arrays from localStorage if available, set default values if not
const getSavedColumns = () => {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onholdListArray = JSON.parse(localStorage.onholdItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onholdListArray = ["Being uncool"];
  }
};

// getSavedColumns();

// Set localStorage Arrays
const updateSavedColumns = () => {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onholdListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onhold"];

  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      arrayName + "Items",
      JSON.stringify(listArrays[index])
    );
  });
};

// updateSavedColumns();

// Create DOM Elements for each list item
const createItemEl = (columnEl, column, item, index) => {
  // console.log("columnEl:", columnEl);
  // console.log("column:", column);
  // console.log("item:", item);
  // console.log("index:", index);
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'dragstart(event)');
  columnEl.appendChild(listEl)
};

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
const updateDOM = () => {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = "";
  backlogListArray.forEach((item, index) => {
    createItemEl(backlogList, 0, item, index);
  });

  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((item, index) => {
    createItemEl(progressList, 0, item, index);
  });

  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((item, index) => {
    createItemEl(completeList, 0, item, index);
  });

  // On Hold Column
  onholdList.textContent = "";
  onholdListArray.forEach((item, index) => {
    createItemEl(onholdList, 0, item, index);
  });
  // Run getSavedColumns only once, Update Local Storage
};


const dragstart = (event) => {
  draggedItem = event.target;
  console.log('draggedItem: ', draggedItem)
}

const allowDrop = (event) => {
  event.preventDefault();
  
}

const dragEnter = (column)=>{
  listColumns[column].classList.add('over')
}

const drop = (event) => {
  event.preventDefault();

}

updateDOM();
