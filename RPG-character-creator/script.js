const totalPoints = 33;

// Elements
const characterStatsInputContainer = document.querySelector("#options");

// Classes
class Character {
	constructor(name) {
		this.name = name;
		this.strength = 5;
		this.perception = 5;
		this.endurance = 5;
		this.charisma = 5;
		this.intelligence = 5;
		this.agility = 5;
		this.luck = 5;
	}
}
