window.onload = function() {
	start();
	window.setInterval(tick, 100);
	document.getElementById('pause-btn').onclick = function() {
		paused = !paused;
	}
	document.getElementById('tick-btn').onclick = ()=> {
		let tmp = paused;
		paused = false;
		tick();
		paused = tmp;		
	};
}

let paused = false;
document.onkeydown = function(evt) {
	evt = evt || window.event;
	if(evt.keyCode == 27) {
		paused = !paused;
	}
	if(evt.keyCode == 84) {
		let tmp = paused;
		paused = false;
		tick();
		paused = tmp;
	}
};

class Firm {
	constructor(startMoney, startFood, startIron, firmNum) {
		this.inventory = {
			'money': startMoney,
			'food': startFood,
			'iron': startIron
		};
		this.firmNum = firmNum;

		this.ticks = 0;
		this.bankrupt = false;
	}
	tick() {
		if(this.bankrupt) return;
		this.ticks++;
		this.payUpkeep();
		this.produce();
	}
	payUpkeep() {
		if(this.ticks % this.upkeep['interval'] == 0) {
			// console.log(this.upkeep['resource'], this.upkeep['cost']);
			if(this.has(this.upkeep['resource'], this.upkeep['cost']) ) {
				this.pay(this.upkeep['resource'], this.upkeep['cost']);
			}
			else {
				this.bankrupt = true;
			}
		}
	}
	adjust(upwards) {
		// can edit function so seller prefers to not sell and save resources for later
		if(upwards) {
			this.sell['price'] += random(1,2);
		} else {
			this.sell['price'] -= random(1,2);
		}
		this.sell['price'] = Math.max(1, this.sell['price']);
	}
	give(firm, resource, amount) {
		firm.inventory[resource] += amount;
		this.inventory[resource] -= amount;
	}
	has(resource, amount) {
		return this.inventory[resource] >= amount;
	}
	pay(resource, amount) {
		this.inventory[resource] -= amount;
	}
}

class Mine extends Firm {
	constructor(firmNum) {
		super(300, 50, 20, firmNum);
		this.type = 'Mine';

		// this.sell = {'resource':'iron', 'price': 40, 'max': 6};
		this.sell = {'resource':'iron', 'price': 40};
		// this.buy = {'resource':'food', 'price': 30, 'max': 2};
		this.buy = {'resource':'food', 'price': 30};

		this.upkeep = {'resource': 'iron', 'cost': 2, 'interval': 10};

		this.efficiency = random(-2,2);
	}
	produce() {
		if(this.inventory['food'] >= 10) {
			this.inventory['food'] -= 10;
			this.inventory['iron'] += 30 + this.efficiency + random(-1,1);
		}
	}
}
class Farm extends Firm {
	constructor(firmNum) {
		super(200, 20, 20, firmNum);
		this.type = 'Farm';

		// this.sell = {'resource':'food', 'price': 20, 'max': 5};
		this.sell = {'resource':'food', 'price': 20};
		// this.buy = {'resource':'iron', 'price': 50, 'max': 4};
		this.buy = {'resource':'iron', 'price': 50};

		this.upkeep = {'resource': 'food', 'cost': 1, 'interval': 15};

		this.efficiency = random(-3,3);
	}
	produce() {
		if(this.inventory['iron'] >= 5) {
			this.inventory['iron'] -= 5;
			this.inventory['food'] += 15 + this.efficiency + random(-1,1);
		}
	}
}

let AIs = [];
function start() {
	for(let i=0; i<20; i++) {
		newFirm();
	}
	display(AIs);
}

function newFirm() {
	if(random(1,5) == 5) {
		AIs.push(new Mine(AIs.length) );
	} else {
		AIs.push(new Farm(AIs.length) );
	}	
}

let ticks = 0;
function tick() {
	if(paused) return;

	ticks++;

	for(let i=0; i<AIs.length; i++) {
		AIs[i].tick();
	}

	if(ticks%3==0) {
		// doTrades(AIs);
		doTrades(AIs.filter(AI => AI.bankrupt==false) );
	}

	display(AIs);
}

// Utility
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
	let j, x, i;
	for(i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1) );
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}