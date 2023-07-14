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
let currentColumn;
let draggingItem = false;

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

const filterArray = (array) => array.filter((item) => item !== null);

// Create DOM Elements for each list item
const createItemEl = (columnEl, column, item, index) => {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "dragstart(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
  columnEl.appendChild(listEl);
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
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((item, index) => {
    createItemEl(progressList, 1, item, index);
  });
  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((item, index) => {
    createItemEl(completeList, 2, item, index);
  });
  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onholdList.textContent = "";
  onholdListArray.forEach((item, index) => {
    createItemEl(onholdList, 3, item, index);
  });
  onholdListArray = filterArray(onholdListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
};

const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if (!draggingItem) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
};

const addToColumn = (column) => {
  const itemText = addItems[column].textContent;
  if (itemText === "") return;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = "";
  updateDOM();
};

const showInputBox = (column) => {
  addBtns[column].style.visibilty = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
};

const hideInputBox = (column) => {
  addBtns[column].style.visibilty = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
};

const rebuildArrays = () => {
  backlogListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }

  progressListArray = [];
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }

  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }

  onholdListArray = [];
  for (let i = 0; i < onholdList.children.length; i++) {
    onholdListArray.push(onholdList.children[i].textContent);
  }

  updateDOM();
};

const dragstart = (event) => {
  draggingItem = true;
  draggedItem = event.target;
};

const allowDrop = (event) => {
  event.preventDefault();
};

const dragEnter = (column) => {
  listColumns[column].classList.add("over");
  currentColumn = column;
};

const drop = (event) => {
  event.preventDefault();
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });

  const parentElement = listColumns[currentColumn];
  parentElement.appendChild(draggedItem);
  draggingItem = false;
  rebuildArrays();
};

updateDOM();
