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
	constructor(startInventory, firmNum) {
		this.inventory = {
			'money': startInventory.money || 0,
			'food': startInventory.food || 0,
			'iron': startInventory.iron || 0,
			'tools': startInventory.tools || 0
		};
		this.firmNum = firmNum;

		this.ticks = 0;
		this.bankrupt = false;
	}
	tick() {
		if(this.bankrupt) return;
		this.ticks++;
		this.payUpkeep();
		this.doProduction();
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
	doProduction() {
		let canProduce = true;
		for(let resource in this.produceCost) {
			if(!this.has(resource, this.produceCost[resource]) ) {
				canProduce = false;
			}
		}
		if(!canProduce) return;
		for(let resource in this.produceCost) {
			this.pay(resource, this.produceCost[resource]);
		}
		this.get(Object.keys(this.producedGoods)[0], this.producedGoods[Object.keys(this.producedGoods)[0] ]);
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
	get(resource, amount) {
		this.inventory[resource] += amount;	
	}
	type() {
		return this.constructor.name;
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
	let firmType = random(1,5);
	if(firmType == 5) {
		AIs.push(new Mine(AIs.length) );
	} else if(firmType > 3) {
		AIs.push(new Smith(AIs.length) );
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

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function normalFloat() {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	if (num > 1 || num < 0) return normalFloat(); // resample between 0 and 1
	return num;
}

// normal int in range
function normal(min, max) {
	return Math.floor(normalFloat() * (max - min + 1) ) + min;
}