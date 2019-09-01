class Mine extends Firm {
	constructor(firmNum) {
		super({'money':300, 'food':50, 'iron':20, 'tools':40}, firmNum);

		this.sell = {'iron': 40};
		this.buy = {'food': 30};

		this.upkeep = {'resource': 'iron', 'cost': 2, 'interval': 10};
		this.efficiency = normal(-2,2);

		this.produceCost = {'food': 10};
		this.producedGoods = {'iron': 30};
	}
}

class Farm extends Firm {
	constructor(firmNum) {
		super({'money':200, 'food':20, 'iron':20, 'tools':30}, firmNum);

		this.sell = {'food':20};
		this.buy = {'tools': 50};

		this.upkeep = {'resource': 'food', 'cost': 1, 'interval': 15};
		this.efficiency = normal(-3,3);

		this.produceCost = {'tools': 5};
		this.producedGoods = {'food': 15};
	}
}

class Smith extends Firm {
	constructor(firmNum) {
		super({'money':150, 'food':30, 'iron':30, 'tools':25}, firmNum);

		this.sell = {'tools': 35};
		this.buy = {'food': 30, 'iron': 40};

		this.upkeep = {'resource': 'tools', 'cost': 1, 'interval': 20};
		this.efficiency = normal(-1,1);

		this.produceCost = {'food': 10, 'iron': 5};
		this.producedGoods = {'tools': 25};
	}
}