// setting stuff up: ticks, buttons, key listeners
window.onload = ()=> {
	start();
	// window.setInterval(tick, 100);
	// window.setInterval(tick, 500);
	window.setInterval(tick, 1000);
	$('#pause-btn').click( ()=> {
		paused = !paused;
		if(paused)
			$('#pause-btn').html('Resume <i class="fas fa-play"></i>');
		else
			$('#pause-btn').html('Pause <i class="fas fa-pause"></i>');
	});
	$('#tick-btn').click( ()=> {
		tick(true);
	});
}

let paused = false;
// let paused = true;
document.onkeydown = (evt)=> {
	evt = evt || window.event;
	if(evt.keyCode == 27) { // esc
		$('#pause-btn').click();
	}
	if(evt.keyCode == 84) { // t
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
		this.upkeepOffset = random(0, 20);
		this.bankrupt = false;

		this.prevAmountProduced = 0;
		this.prevAmountSold = 0;

		this.forSale = 0;
		this.moneyToSave = 0;
		this.timesExpanded = 0;
	}
	tick() {
		if(this.bankrupt) return;
		this.prevAmountSold = 0;
		this.ticks++;

		if( (this.ticks + this.upkeepOffset) % this.upkeepInterval == 0) {
			this.payUpkeep();
		}

		this.doProduction();

		if(this.hasAll(this.expandReady) ) {
			this.payAll(this.expandCost);
			newFirm(this.type(), this.sell[Object.keys(this.sell)[0] ]); // type and sell price
			this.timesExpanded++;
		}

		// it should already have all other resources in expandReady before saving money
		// money is last step
		if(this.hasAll(this.expandRequirement) && this.hasAll(this.expandReady) ) {
			this.moneyToSave = this.expandReady['money'] || 0;
		} else {
			this.moneyToSave = 0;
		}
	}
	payUpkeep() {
		if(this.hasUpkeep() ) {
			this.payAll(this.upkeepCost);
		}
		else {
			this.bankrupt = true;
		}
	}
	doProduction() {
		if(!this.hasAll(this.produceCost) )
			return;

		if(this.hasAll(this.expandRequirement) ) {
			// if it's trying to expand but
			// can't produce and have enough leftover to get to expandReady, return

			// for each resource in expandReady
			// if produceCost has that resource
			// make sure there is enough to produce and still have amount necessary for expandReady
			// else return
			for(resource in this.expandReady) {
				if(this.produceCost[resource]) {
					if(this.inventory[resource] < this.produceCost[resource] + this.expandReady[resource]) {
						return;
					}
				}
			}
		}

		// -------- --------

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
		if(this.prevAmountProduced > this.prevAmountSold) { // produced more that 2 * sold
		// if(this.prevAmountProduced/2 > this.prevAmountSold) { // produced more that 2 * sold
			this.sell[sellResource] -= 1;
			//console.log("I sold!");
		} else {
			// console.log('goin up');
			let factor = this. prevAmountSold / this.prevAmountProduced;
			this.sell[sellResource] += Math.round(factor + 1); //maybe instead of + 1, it should be factor * 10% of price, or if price is 1, factor + 1?
		}
		this.sell[sellResource] = Math.max(1, this.sell[sellResource]);

		this.forSale = this.inventory[sellResource] - (this.upkeepCost[sellResource] || 0);
		if(this.hasExpand() ) {
			// save expand resource if preparing for expand
			if(this.expandReady[sellResource]) {
				this.forSale -= this.expandReady[sellResource];
			}
		}
		this.forSale = Math.max(this.forSale, 0);
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
		return this.hasAll(this.expandRequirement);
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
	str() {
		return this.type() + '#' + this.firmNum;
	}
}

// make all the firms :)
let AIs = [];
let currentFirmNum = 0;
const startFirms = 100;
// const startFirms = 50;
function start() {
	for(let i=0; i<startFirms; i++) {
		newFirm();
	}
	display(AIs);
	// setupPlayer();
}

// const MAX_FIRMS = 300;
const MAX_FIRMS_PER_TYPE = 100;
const MAX_FORESTERS = 10;

// can be called with firm type, if not random firm type
function newFirm(firmType, sellPrice=10) {
	// if(currentFirmNum>=MAX_FIRMS)
	// 	return false;

	if(!firmType)
		firmType = 'mine smith forester farm mill baker refinery mint'.split(' ')[random(0,7)];

	if(getFirmCount('forester')>=MAX_FORESTERS && firmType == 'forester') // bobby's stupid logic for experiments
	// if(getFirmCount(firmType)>=MAX_FIRMS_PER_TYPE)
		return false;

	if(firmType == 'forester')
		AIs[currentFirmNum] = new Forester(sellPrice);
	else if(firmType == 'smith')
		AIs[currentFirmNum] = new Smith(sellPrice);
	else if(firmType == 'farm')
		AIs[currentFirmNum] = new Farm(sellPrice);
	else if(firmType == 'mine')
		AIs[currentFirmNum] = new Mine(sellPrice);
	else if(firmType == 'mint')
		AIs[currentFirmNum] = new Mint(sellPrice);
	else if(firmType == 'baker')
		AIs[currentFirmNum] = new Baker(sellPrice);
	else if(firmType == 'refinery')
		AIs[currentFirmNum] = new Refinery(sellPrice);
	else
		AIs[currentFirmNum] = new Mill(sellPrice);

	return true;
}

//  tick stuff
let ticks = 0;
let activity = 0;
let prevActivity = 0;
const TRADE_INTERVAL = 3;
function tick(overridePause=false) {
	if(paused && !overridePause) return;

	for(let i=0; i<AIs.length; i++) {
		if(AIs[i])
			AIs[i].tick();
	}

	for(let i=0; i<AIs.length; i++) {
		if(AIs[i] && AIs[i].bankrupt) {
			console.log('removed bankrupt AI of type', AIs[i].type() );
			AIs[i] = undefined;
		}
	}

	if(ticks % TRADE_INTERVAL == 0) {
		prevActivity = activity;
		activity = 0;
		// doTrades(AIs.filter(AI => AI && !AI.bankrupt) );
		doTrades(AIs.filter(AI => AI!=undefined) );
		for(let i=0; i<AIs.length; i++) {
			if(AIs[i])
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

function print(str) {
	console.log('Tick:', ticks, '-', str);
}

function getFirmCount(type) {
	let count = 0;
	for(firm in AIs) {
		if(AIs[firm] && AIs[firm].type()==type)
			count++;
	}
	return count;
}

// note: currently unused. remove this comment when used
function subtractResources(resources1, resources2) {
	let rtn = {};

	// input checking
	for(resource in resources2) {
		if(!(resource in resources1) ) {
			console.error('Attempt to subtract resources that don\'t exist');
			console.error(resources1);
			console.error(resources2);
		}
	}

	for(resource in resources1) {
		if(resource in resources2) {
			rtn[resource] = resources1[resource] - resources2[resource];
		}
		else {
			rtn[resource] = resources1[resource];
		}
	}
	return rtn;
}
function subtractAllFrom(resourceName, resources) {
	// note: returns a copy
	// note: if resourceName isn't in resources, no worries, just returns copy of resources
	let rtn = {};
	for(resource in resources) {
		if(resource==resourceName) {
			rtn[resource] = 0;
		}
		else {
			rtn[resource] = resources[resource];
		}
	}
	return rtn;
}