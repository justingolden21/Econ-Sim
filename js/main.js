// setting stuff up: ticks, buttons, key listeners
window.onload = ()=> {
	start();
	window.setInterval(tick, 100);
	document.getElementById('pause-btn').onclick = ()=> {
		paused = !paused;
	};
	document.getElementById('tick-btn').onclick = ()=> {
		tick(true);
	};
}

let paused = false;
// let paused = true;
document.onkeydown = (evt)=> {
	evt = evt || window.event;
	if(evt.keyCode == 27) {
		paused = !paused;
	}
	if(evt.keyCode == 84) {
		tick(true);
	}
};

// Firm class, all firms inherit from this
class Firm {
	constructor(startInventory) {
		this.inventory = {
			'money' :  startInventory.money  || 0,
			'bread' :  startInventory.bread  || 0,
			'ore'   :  startInventory.ore    || 0,
			'lumber':  startInventory.lumber || 0,
			'metal' :  startInventory.metal  || 0,
			'wheat' :  startInventory.wheat  || 0,
			'flour' :  startInventory.flour  || 0,
			'tools' :  startInventory.tools  || 0
		};
		this.firmNum = currentFirmNum++;
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
		if(this.ticks % this.upkeepInterval == 0) {
			this.payUpkeep();
		}
		this.doProduction();
		if(this.hasAll(this.expandReady) ) {
			this.payAll(this.expandCost);
			newFirm(this.type() );
			console.log('I had a baby! It\'s a ' + this.type() );
		}
	}
	payUpkeep() {
		if(this.hasUpkeep() ) {
			this.payAll(this.upkeepCost);
		}
		else {
			// this.bankrupt = true;
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

		let amountProduced = this.producedGoods[Object.keys(this.producedGoods)[0] ] + random(0, this.variance);
		amountProduced *= 0.95 + 0.1*this.efficiency;

		// amountProduced = Math.round(amountProduced);
		amountProduced = Math.round(amountProduced) * 2;

		this.get(Object.keys(this.producedGoods)[0], amountProduced);
		this.prevAmountProduced = amountProduced;
	}
	adjust() {
		// can edit function so seller prefers to not sell and save resources for later
		let sellResource = Object.keys(this.sell)[0];
		// console.log(this.prevAmountProduced, this.prevAmountSold);
		if(this.prevAmountProduced > this.prevAmountSold) { // produced more than sold
			this.sell[sellResource] -= 1;
			//console.log("I sold!");
		} else {
			// console.log('goin up');
			this.sell[sellResource] += 1;
		}
		this.sell[sellResource] = Math.max(1, this.sell[sellResource]);

		// this.forSale = this.inventory[sellResource] - (this.upkeep[sellResource] || 0);
	}
	give(firm, resource, amount) {
		firm.inventory[resource] += amount;
		this.inventory[resource] -= amount;
	}
	has(resource, amount) {
		return this.inventory[resource] >= amount;
	}
	hasAll(resources) {
		for(let resource in resources) {
			if(this.inventory[resource] < resources[resource]) {
				return false;
			}
		}
		return true;
	}
	hasExpand() {
		return this.hasAll(this.expandRequirements);
	}
	hasUpkeep() {
		return this.hasAll(this.upkeepCost);
	}
	pay(resource, amount) {
		this.inventory[resource] -= amount;
	}
	payAll(resources) {
		// assumes they have enough. check with hasAll()
		for(resource in resources) {
			this.inventory[resource] -= resources[resource];
		}
	}
	get(resource, amount) {
		this.inventory[resource] += amount;
	}
	type() {
		return this.constructor.name.toLowerCase();
	}
}

// make all the firms :)
let AIs = [];
let currentFirmNum = 0;
let startFirms = 100;
function start() {
	for(let i=0; i<startFirms; i++) {
		newFirm();
	}
	display(AIs);
}

// can be called with firm type, if not random firm type
function newFirm(firmType) {
	if(!firmType) 
		firmType = 'mine smith forester farm mill mill mill baker refinery mint'.split(' ')[random(0,9)];

	if(firmType == 'forester')
		AIs[currentFirmNum] = new Forester();
	else if(firmType == 'smith')
		AIs[currentFirmNum] = new Smith();
	else if(firmType == 'farm')
		AIs[currentFirmNum] = new Farm();
	else if(firmType == 'mine')
		AIs[currentFirmNum] = new Mine();
	else if(firmType == 'mint')
		AIs[currentFirmNum] = new Mint();
	else if(firmType == 'baker')
		AIs[currentFirmNum] = new Baker();
	else if(firmType == 'refinery')
		AIs[currentFirmNum] = new Refinery();
	else
		AIs[currentFirmNum] = new Mill();
}

//  tick stuff
let ticks = 0;
let activity = 0;
let prevActivity = 0;
let tradeInterval = 3;
function tick(overridePause=false) {
	if(paused && !overridePause) return;

	for(let i=0; i<AIs.length; i++) {
		AIs[i].tick();
	}
	if(ticks % tradeInterval == 0) {
		prevActivity = activity;
		activity = 0;
		doTrades(AIs.filter(AI => AI.bankrupt==false) );
		for(let i=0; i<AIs.length; i++) {
			AIs[i].adjust();
		}

		
	}
	ticks++;
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
function normal() {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); // converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	return Math.sqrt(-2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v);
}
function normal01() {
	let tmp = 0.33*normal()+0.5;
	return tmp < 0 ? 0 : tmp > 1 ? 1 : tmp;
}