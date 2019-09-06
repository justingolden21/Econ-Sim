// note: currently none of the upkeep costs are things that they sell
class Mine extends Firm {
	constructor() {
		super({'money':400, 'bread':40, 'tools':40}); // starting inventory

		this.sell = {'ore': 1}; // resource sold and its price

		this.upkeep = {'tools': 10, 'interval': 19};

		this.produceCost = {'bread': 30, 'tools': 10}; // what it takes for this to produce
		this.producedGoods = {'ore': 100}; // what this is producing
		this.variance = 15; // amount production will vary from the value set in producedGoods

		// requirement before firm starting trying to accumulate resources necessary to expand
		this.expandRequirement = {'bread': 120, 'tools': 30};

		// resources necessary to expand
		this.expandReady = {'money': 700, 'bread': 120, 'tools': 30, 'lumber': 20};

		// resources deducted from inventory upon expansion
		// note: this is less than expandReady so that firm doesn't go bankrupt upon expansion
		this.expandCost = {'money': 400, 'bread': 60, 'tools': 20, 'lumber': 20};
	}
}

class Smith extends Firm {
	constructor() {
		super({'money': 300, 'metal': 20, 'lumber': 20});

		this.sell = {'tools': 1};

		this.upkeep = { 'bread': 10, 'interval': 9};

		this.produceCost = {'metal': 10, 'lumber': 10};
		this.producedGoods = {'tools': 20};
		this.variance = 10;
		
		this.expandRequirement = {'metal': 60, 'lumber': 60};
		this.expandReady = {'money': 600, 'metal': 60, 'lumber': 60};
		this.expandCost = {'money': 300, 'metal': 20, 'lumber': 20};
	}
}

class Forester extends Firm {
	constructor() {
		super({'money': 300, 'bread': 20, 'tools': 10});

		this.sell = {'lumber': 1};

		this.upkeep = { 'bread': 10, 'tools':1, 'interval': 12};

		this.produceCost = {'bread': 10, 'tools': 5};
		this.producedGoods = {'lumber': 10 };
		this.variance = 5;

		this.expandRequirement = {'bread': 80, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 80, 'tools': 30};
		this.expandCost = {'money': 300, 'bread': 30, 'tools': 10};
	}
}

class Farm extends Firm {
	constructor() {
		super({'money': 200, 'bread': 20, 'tools': 10});

		this.sell = {'wheat': 1};

		this.upkeep = { 'bread': 10, 'tools':2, 'interval': 17};

		this.produceCost = {'bread': 10, 'tools': 2};
		this.producedGoods = {'wheat': 300};
		this.variance = 100;

		this.expandRequirement = {'bread': 70, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 70, 'tools': 30, 'lumber': 15};
		this.expandCost = {'money': 200, 'bread': 30, 'tools': 10, 'lumber': 15}; 
	}
}

class Mill extends Firm {
	constructor() {
		super({'money': 200, 'bread': 20, 'wheat': 500, 'tools': 10});
		
		this.sell = {'flour': 1};

		this.upkeep = { 'bread': 10, 'tools':2, 'interval': 10};

		this.produceCost = {'wheat': 200, 'bread':10};
		this.producedGoods = {'flour': 100};
		this.variance = 25;

		this.expandRequirement = {'bread': 50, 'wheat': 1000};
		this.expandReady = {'money': 500, 'bread': 50, 'wheat': 1000, 'tools': 20, 'lumber': 15};
		this.expandCost = {'money': 200, 'wheat': 500, 'bread': 30, 'tools': 10, 'lumber': 15};
	}
}

class Baker extends Firm {
	constructor() {
		super({'money': 200, 'bread': 20, 'tools': 10, 'lumber': 6});

		this.sell = {'bread': 1};

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 18};

		this.produceCost = {'flour': 40, 'lumber': 2};
		this.producedGoods = {'bread': 100};
		this.variance = 20;

		this.expandRequirements = {'flour': 120, 'lumber': 10};
		this.expandReady = {'money': 500, 'bread': 50, 'tools': 20, 'lumber': 30};
		this.expandCost = {'money': 200, 'bread': 30, 'tools': 10, 'lumber': 20};
	}
}

class Refinery extends Firm {
	constructor() {
		super({'money': 300, 'bread': 30, 'tools': 5, 'ore': 80, 'lumber': 10,});

		this.sell = {'metal': 1};

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 14};

		this.produceCost = {'bread':10, 'ore': 40};
		this.producedGoods = {'metal': 30};
		this.variance = 5;

		this.expandRequirements = {'bread': 40, 'ore': 160};
		this.expandReady = {'money': 600, 'bread': 40, 'ore': 160, 'tools': 20, 'lumber': 30};
		this.expandCost = {'money': 300, 'bread': 30, 'ore': 80, 'tools': 10, 'lumber': 20};
	}
}

// The mint class actually isn't special. It will just not sell anything
// I imagine this working as each coin being individually molded metal like a piece of art, with
// very fine artwork making it valuable. Therefore, it will require metal and a large amount of food
class Mint extends Firm {
	constructor() {
		super({'money': 400, 'bread': 40, 'tools': 10, 'metal': 40, 'lumber': 10,});

		this.sell = {'money': 1}; // sells 1 money for 1 money... might want to change later...

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 21};

		this.produceCost = {'bread':20, 'metal': 20};
		this.producedGoods = {'money': 40};
		this.variance = 5;

		this.expandRequirements = {'bread': 80, 'metal': 80};
		this.expandReady = {'money': 600, 'bread': 80, 'tools': 20, 'metal': 80, 'lumber': 30};
		this.expandCost = {'money': 400, 'bread': 40, 'tools': 10, 'metal': 40, 'lumber': 20};
	}
}