"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");
const userNewTaskInput = document.querySelector("#new-task");

const btnAddTask = document.querySelector("#add-task");

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

const todoList = new ToDoList();

// Functions
// Add items to the list
const addItemsToList = function (task) {
	todoList.addItem(new ToDoItem(null, task));
};

// Toggle completed tasks
const toggleItemCompletion = function (event) {
	if (event.target && event.target.matches(".form-checkbox")) {
		const itemId = event.target.getAttribute("data-id");
		todoList.getItemById(Number(itemId)).toggleComplete();

		if (event.target.checked) {
			console.log("Checked Item ID:", itemId);
		} else {
			console.log("Unchecked Item ID:", itemId);
		}

		updateUI();
	}
};

// Display items
const displayItemsToList = function () {
	taskListContainer.innerHTML = "";
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
		taskListContainer.insertAdjacentHTML("beforeend", html);
	});
};

const updateUI = function () {
	displayItemsToList();
};

// Events
btnAddTask.addEventListener("click", function (e) {
	e.preventDefault();
	addItemsToList(userNewTaskInput.value);
	updateUI();
});

taskListContainer.addEventListener("change", toggleItemCompletion);
