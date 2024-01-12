"use strict";

// Elements
const taskListContainer = document.querySelector("#task-list");

// Data
const tasks = ["Buy", "Cook", "Wash"];

tasks.forEach(function (task) {
	const html = `<li>${task}</li>`;
	taskListContainer.insertAdjacentHTML("beforeend", html);
});
