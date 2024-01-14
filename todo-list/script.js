"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const userNewTaskInput = document.querySelector("#new-task");
const btnAddTask = document.querySelector("#add-task");

// Data
const tasks = ["Buy", "Cook", "Wash"];

// Classes
class ToDoItem {
	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.completed = false;
	}

	// Toggle completed status
	toggleComplete() {
		this.completed = !this.completed;
	}
}

class ToDoList {
	constructor() {
		this.todoItems = new Map();
	}

	// add items to todo list
	addItem(item) {
		this.todoItems.set(item.id, item);
	}

	// remove item from list
	removeItem(itemId) {
		if (!this.todoItems.has(itemId)) {
			throw new Error("Item with the specified ID could not be found");
		}
		this.todoItems.delete(itemId);
	}

	// Display all items in todo list
	listAllItems() {
		return Array.from(this.todoItems.values());
	}
}

// Functions
// Add items to the list
const addItemsToList = function (id, task) {
	todoList.addItem(new ToDoItem(id, task));
};

// Display items
const displayItemsToList = function () {
	const itemsArray = todoList.listAllItems();
	itemsArray.forEach((item) => {
		// TODO: Replace console.log() with creating HTML list items
		console.log(
			`ID: ${item.id}, Title: ${item.title}, Completed: ${item.completed}`
		);
	});
};

// TESTING AREA - DELETE LATA
let todoList = new ToDoList();
addItemsToList(1, "Learn JavaScript");
addItemsToList(2, "Write Code");

// Getting the array of todo items
displayItemsToList();
// ////////////////////////
const clearInputField = function () {
	userNewTaskInput.value = "";
};

btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
});
