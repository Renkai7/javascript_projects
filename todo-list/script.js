"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const userNewTaskInput = document.querySelector("#new-task");
const btnAddTask = document.querySelector("#add-task");

// Data
const tasks = ["Buy", "Cook", "Wash"];

// Classes
class ToDoItem {
	constructor(title) {
		this.title = title;
		this.completed = false;
	}

	// Set item status to completed
	markCompleted() {
		this.completed = true;
	}

	// Remove completed status
	markIncomplete() {
		this.completed = false;
	}
}

class ToDoList {
	constructor() {
		this.todoItems = [];
	}

	// add items to todo list
	addItem(item) {
		this.todoItems.push(item);
	}

	// remove item from list
	removeItem(itemToRemove) {
		const indexOfItem = this.todoItems.indexOf(itemToRemove);
		if (indexOfItem === -1) {
			// TODO: convert this into an error message in html
			console.log("Item could not be found.");
			return null;
		}
		this.todoItems.splice(indexOfItem, 1);
	}

	// Display all items in todo list
	listAllItems() {
		this.todoItems.forEach((item) => {
			console.log(item.title, item.completed);
		});
	}
}

// ////////////////////////
const clearInputField = function () {
	userNewTaskInput.value = "";
};

btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
});
