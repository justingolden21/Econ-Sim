window.onload = function() {
	start();
	window.setInterval(tick, 1000);
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
			'bread': startInventory.bread || 0,
			'ore': startInventory.ore || 0,
			'lumber': startInventory.lumber || 0,
			'metal': startInventory.metal || 0,
			'wheat': startInventory.wheat || 0,
			'flour': startInventory.flour || 0,
			'tools': startInventory.tools || 0
		};
		this.reserve = {
			'money': 0,
			'bread': 0,
			'ore': 0,
			'lumber': 0,
			'metal': 0,
			'wheat': 0,
			'flour': 0,
			'tools': 0
		};
		// this.inventory = {
		// 	'money': startInventory.money || 0,//change to drachma
		// 	'food': startInventory.food || 0,//change to bread
		// 	'iron': startInventory.iron || 0,//change to metal
		// 	'tools': startInventory.tools || 0
		// };
		// this.reserve = {
		// 	'money': 0,
		// 	'food': 0,
		// 	'iron': 0,
		// 	'tools': 0
		// };
		this.firmNum = firmNum;
		this.efficiency = normal01();

		this.ticks = 0;
		this.bankrupt = false;

		this.prevAmountProduced = 0;
		this.prevAmountSold = 0;
	}
	tick() {
		if(this.bankrupt) return;
		this.prevAmountSold = 0;
		this.ticks++;
		if(this.ticks % this.upkeep['interval'] == 0) {
			this.payUpkeep();
			for(item in this.upkeep) {
				if(item=='interval') continue;
					this.saveMin(item, this.upkeep[item]*2);
			}
		}

		this.doProduction();
	}
	payUpkeep() {
		// console.log(this.upkeep['resource'], this.upkeep['cost']);
		for(item in this.upkeep) {
			if(item=='interval') continue;
			if(this.hasReserve(item, this.upkeep[item]) ) {
				this.payReserve(item, this.upkeep[item]);
			}
			else if(this.has(item, this.upkeep[item]) ) {
				this.pay(item, this.upkeep[item]);
			}
			else {
				// this.bankrupt = true;
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

		let amountProduced = this.producedGoods[Object.keys(this.producedGoods)[0] ] + random(this.variance[0], this.variance[1]);
		amountProduced *= 0.95 + 0.1*this.efficiency;
		amountProduced = Math.round(amountProduced);
		this.get(Object.keys(this.producedGoods)[0], amountProduced);
		this.prevAmountProduced = amountProduced;
	}
	adjust() {
		// can edit function so seller prefers to not sell and save resources for later
		let sellResource = Object.keys(this.sell)[0];
		// console.log(this.inventory[sellResource] );
		// if(this.inventory[sellResource]==0) { // if it ran out
		// if(this.inventory[sellResource]<50) { // if it doesn't have much
		if(this.prevAmountProduced > this.prevAmountSold) { // produced more than sold
			this.sell[sellResource] -= random(1,2);
			//console.log("I sold!");
		} else {
			this.sell[sellResource] += random(1,2);//could this make prices negative/0?
		}
		this.sell[sellResource] = Math.max(1, this.sell[sellResource]);
	}
	give(firm, resource, amount) {
		firm.inventory[resource] += amount;
		this.inventory[resource] -= amount;
	}
	has(resource, amount) {
		return this.inventory[resource] >= amount;
	}
	hasReserve(resource, amount) {
		return this.reserve[resource] >= amount;
	}
	pay(resource, amount) {
		this.inventory[resource] -= amount;
	}
	payReserve(resource, amount) {
		this.reserve[resource] -= amount;
	}
	get(resource, amount) {
		this.inventory[resource] += amount;
	}
	type() {
		return this.constructor.name;
	}
	save(resource, amount) {
		amount = Math.min(amount, this.inventory[resource]);
		this.inventory[resource] -= amount;
		this.reserve[resource] += amount;
	}
	saveMin(resource, amount) {
		amount -= this.reserve[resource];
		amount = Math.min(amount, this.inventory[resource]);
		this.inventory[resource] -= amount;
		this.reserve[resource] += amount;
	}
	unsave(resource, amount) {
		amount = Math.min(amount, this.reserve[resource]);
		this.reserve[resource] -= amount;
		this.inventory[resource] += amount;
	}
}

let AIs = [];
let currentFirmNum = 0;
function start() {
	for(let i=0; i<45; i++) {
		newFirm();
	}
	display(AIs);
}

function newFirm() {
	let firmType = random(1,8);//in the expand function, we will call this with the parent's firm type (we can work it so if no type is passed it's random)
	if(firmType == 5) {
		AIs[currentFirmNum] = new Mine(currentFirmNum);
	}
	  else if(firmType == 4) {
		AIs[currentFirmNum] = new Farm(currentFirmNum);
	}
	  else if(firmType == 3) {
		AIs[currentFirmNum] = new Smith(currentFirmNum);
	}
	  else if(firmType == 2) {
		AIs[currentFirmNum] = new Mill(currentFirmNum);
	}
	  else if(firmType == 6) {
		AIs[currentFirmNum] = new Mint(currentFirmNum);
	}
	  else if(firmType == 7) {
		AIs[currentFirmNum] = new Baker(currentFirmNum);
	}
	  else if(firmType == 8) {
		AIs[currentFirmNum] = new Refinery(currentFirmNum);
	}
	  else {
		AIs[currentFirmNum] = new Forester(currentFirmNum);
	}
	currentFirmNum++;
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
		for(let i=0; i<AIs.length; i++) {
			AIs[i].adjust();
		}
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
// Standard Normal variate using Box-Muller transform.
function normal() {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	return Math.sqrt(-2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v);
}
function normal01() {
	let tmp = 0.33*normal()+0.5;
	return tmp < 0 ? 0 : tmp > 1 ? 1 : tmp;
}