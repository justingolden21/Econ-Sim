class Mine extends Firm {
	constructor(firmNum) {
		super({'money':300, 'food':50, 'iron':20, 'tools':40}, firmNum);

		this.sell = {'iron': 40};
		this.buy = {'food': 30};
		this.upkeep = {'resource': 'iron', 'cost': 2, 'interval': 10};
		this.efficiency = normal(-2,2);
	}
	produce() {
		if(this.has('food', 10) ) {
			this.inventory['food'] -= 10;
			this.inventory['iron'] += 30 + this.efficiency + random(-1,1);
		}
	}
}

class Farm extends Firm {
	constructor(firmNum) {
		super({'money':200, 'food':20, 'iron':20, 'tools':30}, firmNum);

		this.sell = {'food':20};
		this.buy = {'tools': 50};
		this.upkeep = {'resource': 'food', 'cost': 1, 'interval': 15};
		this.efficiency = normal(-3,3);
	}
	produce() {
		if(this.has('tools', 5) ) {
			this.inventory['tools'] -= 5;
			this.inventory['food'] += 15 + this.efficiency + random(-1,1);
		}
	}
}

class Smith extends Firm {
	constructor(firmNum) {
		super({'money':150, 'food':30, 'iron':30, 'tools':25}, firmNum);

		this.sell = {'tools': 35};
		this.buy = {'food': 30, 'iron': 40};
		this.upkeep = {'resource': 'tools', 'cost': 1, 'interval': 20};
		this.efficiency = normal(-1,1);
	}
	produce() {
		if(this.has('food',10) && this.has('iron',5) ) {
			this.inventory['food'] -= 10;
			this.inventory['iron'] -= 5;
			this.inventory['tools'] += 25 + this.efficiency + random(-1,1);
		}
	}
}