"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const userNewTaskInput = document.querySelector("#new-task");
const todoItemCheckboxes = document.querySelectorAll(".form-checkbox");
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
		this._nextId = 1;
	}

	// add items to todo list
	addItem(item) {
		// type safety
		if (!(item instanceof ToDoItem)) {
			throw new Error("item must be an instance of ToDoItem");
		}
		item.id = this._nextId++;
		this.todoItems.set(item.id, item);
	}

	// remove item from list
	removeItem(itemId) {
		if (!this.todoItems.has(itemId)) {
			throw new Error("Item with the specified ID could not be found");
		}
		this.todoItems.delete(itemId);
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

// Functions
// Add items to the list
const addItemsToList = function (task) {
	todoList.addItem(new ToDoItem(null, task));
};

// Toggle completed tasks
const toggleItemCompletion = function () {};

// Display items
const displayItemsToList = function () {
	taskListContainer.innerHTML = "";
	const itemsArray = todoList.listAllItems();

	itemsArray.forEach((item) => {
		const html = `
		<li class="flex items-center justify-between p-2 border-b border-gray-200">
			<label class="flex items-center space-x-3">
				<input type="checkbox"
					class="form-checkbox h-5 w-5 border-2 border-gray-400 rounded-full text-blue-600 focus:ring-transparent"  />
				<span class="text-gray-700">${item.title}</span>
			</label>
		</li>
		`;
		taskListContainer.insertAdjacentHTML("beforeend", html);
	});
};

// TESTING AREA - DELETE LATA
const todoList = new ToDoList();

todoList.getItemById(1).toggleComplete();

displayItemsToList();

// ////////////////////////

// Events
btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
	addItemsToList(userNewTaskInput.value);
	displayItemsToList();
	console.log(todoItemCheckboxes);
});
