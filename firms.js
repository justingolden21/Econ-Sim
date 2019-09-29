// note: currently none of the upkeep costs are things that they sell
// note: expandReady must be > expandCost
// start money and expandCost money should be equal
class Mine extends Firm {
	constructor(sellPrice) {
		super({'money':400, 'bread':80, 'tools':30}); // starting inventory

		this.sell = {'ore': sellPrice}; // resource sold and its price

		this.upkeepCost = {'tools': 10};
		this.upkeepInterval = 19;

		this.produceCost = {'bread': 40, 'tools': 10}; // what it takes for this to produce
		this.producedGoods = {'ore': 100}; // what this is producing
		this.variance = 15; // amount production will vary from the value set in producedGoods

		// requirement before firm starting trying to accumulate resources necessary to expand
		this.expandRequirement = {'bread': 120, 'tools': 30};

		// resources necessary to expand
		this.expandReady = {'money': 700, 'bread': 130, 'tools': 40, 'lumber': 40};

		// resources deducted from inventory upon expansion
		// note: this is less than expandReady so that firm doesn't go bankrupt upon expansion
		this.expandCost = {'money': 400, 'bread': 90, 'tools': 30, 'lumber': 40};
	}
}

class Smith extends Firm {
	constructor(sellPrice) {
		super({'money': 300, 'metal': 40, 'lumber': 30});

		this.sell = {'tools': sellPrice};

		this.upkeepCost = {'bread': 10};
		this.upkeepInterval = 9;

		this.produceCost = {'metal': 20, 'lumber': 10};
		this.producedGoods = {'tools': 20};
		this.variance = 10;
		
		this.expandRequirement = {'metal': 100, 'lumber': 70};
		this.expandReady = {'money': 600, 'metal': 100, 'lumber': 80 };
		this.expandCost = {'money': 300, 'metal': 50, 'lumber': 50};
	}
}

class Forester extends Firm {
	constructor(sellPrice) {
		super({'money': 300, 'bread': 20, 'tools': 10});

		this.sell = {'lumber': sellPrice};

		this.upkeepCost = {'bread': 10, 'tools':1};
		this.upkeepInterval = 12;

		this.produceCost = {'bread': 10, 'tools': 5};
		this.producedGoods = {'lumber': 10 };
		this.variance = 5;

		this.expandRequirement = {'bread': 80, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 100, 'tools': 50, 'flour': 1};
		this.expandCost = {'money': 300, 'bread': 30, 'tools': 10};
	}
}

class Farm extends Firm {
	constructor(sellPrice) {
		super({'money': 200, 'bread': 20, 'tools': 10});

		this.sell = {'wheat': sellPrice};

		this.upkeepCost = { 'bread': 10, 'tools':2};
		this.upkeepInterval = 17;

		this.produceCost = {'bread': 10, 'tools': 2};
		this.producedGoods = {'wheat': 300};
		this.variance = 100;

		this.expandRequirement = {'bread': 70, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 70, 'tools': 30, 'lumber': 15};
		this.expandCost = {'money': 200, 'bread': 30, 'tools': 10, 'lumber': 15};
	}
}

class Mill extends Firm {
	constructor(sellPrice) {
		super({'money': 200, 'bread': 20, 'wheat': 500, 'tools': 10});
		
		this.sell = {'flour': sellPrice};

		this.upkeepCost = {'bread': 10, 'tools':2};
		this.upkeepInterval = 10;

		this.produceCost = {'wheat': 200, 'bread':10};
		this.producedGoods = {'flour': 150};
		this.variance = 25;

		this.expandRequirement = {'bread': 50, 'wheat': 1000};
		this.expandReady = {'money': 500, 'bread': 60, 'wheat': 1000, 'tools': 20, 'lumber': 20};
		this.expandCost = {'money': 200, 'wheat': 500, 'bread': 40, 'tools': 10, 'lumber': 20};
	}
}

class Baker extends Firm {
	constructor(sellPrice) {
		super({'money': 200, 'bread': 20, 'tools': 10, 'lumber': 6});

		this.sell = {'bread': sellPrice};

		this.upkeepCost = {'lumber': 2, 'tools':2};
		this.upkeepInterval = 18;

		this.produceCost = {'flour': 40, 'lumber': 2};
		this.producedGoods = {'bread': 100};
		this.variance = 20;

		this.expandRequirement = {'flour': 240, 'lumber': 20};
		this.expandReady = {'money': 1000, 'bread': 100, 'tools': 40, 'lumber': 60};
		this.expandCost = {'money': 400, 'bread': 60, 'tools': 20, 'lumber': 40};
	}
}

class Refinery extends Firm {
	constructor(sellPrice) {
		super({'money': 300, 'bread': 30, 'tools': 5, 'ore': 80, 'lumber': 10,});

		this.sell = {'metal': sellPrice};

		this.upkeepCost = {'lumber': 2, 'tools':2};
		this.upkeepInterval = 14;

		this.produceCost = {'bread':10, 'ore': 40};
		this.producedGoods = {'metal': 30};
		this.variance = 5;

		this.expandRequirement = {'bread': 40, 'ore': 160};
		this.expandReady = {'money': 600, 'bread': 40, 'ore': 160, 'tools': 20, 'lumber': 30};
		this.expandCost = {'money': 300, 'bread': 30, 'ore': 80, 'tools': 10, 'lumber': 20};
	}
}

// The mint class actually isn't special. It will just not sell anything
// I imagine this working as each coin being individually molded metal like a piece of art, with
// very fine artwork making it valuable. Therefore, it will require metal and a large amount of food
class Mint extends Firm {
	constructor(sellPrice) {
		super({'money': 400, 'bread': 40, 'tools': 10, 'metal': 40, 'lumber': 10,});

		this.sell = {'money': 1}; // sells 1 money for 1 money... might want to change later...

		this.upkeepCost = {'lumber': 2, 'tools':2};
		this.upkeepInterval = 21;

		this.produceCost = {'bread':20, 'metal': 20};
		this.producedGoods = {'money': 40};
		this.variance = 5;

		this.expandRequirement = {'bread': 80, 'metal': 80};
		this.expandReady = {'money': 600, 'bread': 100, 'tools': 25, 'metal': 100, 'lumber': 40};
		this.expandCost = {'money': 400, 'bread': 50, 'tools': 15, 'metal': 40, 'lumber': 30};
	}
}