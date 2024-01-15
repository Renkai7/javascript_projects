"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const completedTasksContainer = document.querySelector("#completed-task-list");
const userNewTaskInput = document.querySelector("#new-task");

const btnAddTask = document.querySelector("#add-task");
const btnDeleteTask = document.querySelector("#delete-task");

// Classes
// Observer pattern
class Observer {
	constructor() {
		this.observers = [];
	}

	subscribe(fn) {
		this.observers.push(fn);
	}

	unsubscribe(fn) {
		this.observers = this.observers.filter((subscriber) => subscriber !== fn);
	}

	notify(data) {
		this.observers.forEach((observer) => observer(data));
	}
}

// Class for items in todo list
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

// Class for entire todo list
class ToDoList {
	constructor() {
		this.todoItems = new Map();
		this._nextId = 1;
		this.observer = new Observer();
	}

	// add items to todo list
	addItem(item) {
		// type safety
		if (!(item instanceof ToDoItem)) {
			throw new Error("item must be an instance of ToDoItem");
		}
		item.id = this._nextId++;
		this.todoItems.set(item.id, item);
		this.observer.notify(this.listAllItems());
	}

	// remove item from list
	removeItem(itemId) {
		if (!this.todoItems.has(itemId)) {
			throw new Error("Item with the specified ID could not be found");
		}
		this.todoItems.delete(itemId);
		this.observer.notify(this.listAllItems());
	}

	// Notify observers when an item is toggled
	toggleComplete(itemId) {
		if (this.todoItems.has(itemId)) {
			this.todoItems.get(itemId).toggleComplete();
			this.observer.notify(this.listAllItems());
		}
	}

	// Retrieve specific item by ID
	getItemById(itemId) {
		if (!this.todoItems.has(itemId)) {
			throw new Error("Item with the specified ID could not be found");
		}
		return this.todoItems.get(itemId);
	}

	// Display all items in todo list
	listAllItems() {
		return Array.from(this.todoItems.values());
	}
}

const todoList = new ToDoList();

// Functions
// Add items to the list
const addItemsToList = function (task) {
	todoList.addItem(new ToDoItem(null, task));
};

// Remove items from the list
const deleteItemsFromList = function () {
	const itemsArray = todoList.listAllItems();
	itemsArray.forEach((item) => {
		if (item.completed) {
			todoList.removeItem(item.id);
		}
	});
};

// Toggle completed tasks
const toggleItemCompletion = function (event) {
	// Check if the event target is a checkbox
	if (event.target && event.target.matches(".form-checkbox")) {
		const itemId = Number(event.target.getAttribute("data-id"));
		todoList.toggleComplete(itemId);
	}
};

// Display items
const displayItemsToList = function () {
	const itemsArray = todoList.listAllItems();

	itemsArray.forEach((item) => {
		const title = item.completed ? `<s>${item.title}</s>` : `${item.title}`;
		const isChecked = item.completed ? "checked" : "";
		const html = `
		<li class="flex items-center justify-between p-2 border-b border-gray-200">
			<label class="flex items-center space-x-3">
				<input type="checkbox" data-id=${item.id}
					class="form-checkbox h-5 w-5 border-2 border-gray-400 rounded-full text-blue-600 focus:ring-transparent" ${isChecked} />
				<span class="text-gray-700">${title}</span>
			</label>
		</li>
		`;
		if (!item.completed) {
			taskListContainer.insertAdjacentHTML("beforeend", html);
		} else {
			completedTasksContainer.insertAdjacentHTML("beforeend", html);
		}
	});
};

const updateUI = function () {
	taskListContainer.innerHTML = "";
	completedTasksContainer.innerHTML = "";
	userNewTaskInput.value = "";
	displayItemsToList();
};

todoList.observer.subscribe(updateUI);

// Events
btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
	addItemsToList(userNewTaskInput.value);
	updateUI();
});

btnDeleteTask.addEventListener("click", function (e) {
	e.preventDefault();
	deleteItemsFromList();
	updateUI();
});

taskListContainer.addEventListener("change", toggleItemCompletion);
completedTasksContainer.addEventListener("change", toggleItemCompletion);
