"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const userNewTaskInput = document.querySelector("#new-task");
const btnAddTask = document.querySelector("#add-task");

// Data
const tasks = ["Buy", "Cook", "Wash"];

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

const clearInputField = function () {
	userNewTaskInput.value = "";
};

const displayTasks = function () {};

const addTask = function () {
	tasks.push(userNewTaskInput.value);
};

addTask();

btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
	addTask();
	displayTasks();
	clearInputField();
});
