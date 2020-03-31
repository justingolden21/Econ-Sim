// note: currently none of the upkeep costs are things that they sell
// note: expandReady must be > expandCost
// start money and expandCost money should be equal
class Mine extends Firm {
	constructor(sellPrice) {
		super({'money':4000, 'bread':180, 'tools':80}); // starting inventory

		this.sell = {'ore': sellPrice}; // resource sold and its price

		this.upkeepCost = {'tools': 5};
		this.upkeepInterval = 19;

		this.produceCost = {'bread': 30, 'tools': 10}; // what it takes for this to produce
		this.producedGoods = {'ore': 100}; // what this is producing
		this.variance = 15; // amount production will vary from the value set in producedGoods

		// requirement before firm starting trying to accumulate resources necessary to expand
		this.expandRequirement = {'bread': 360, 'tools': 120};

		// resources necessary to expand
		this.expandReady = {'money': 8000, 'bread': 400, 'tools': 180, 'lumber': 70};

		// resources deducted from inventory upon expansion
		// note: this is less than expandReady so that firm doesn't go bankrupt upon expansion
		this.expandCost = {'money': 4000, 'bread': 220, 'tools': 90, 'lumber': 70};
	}
}

class Smith extends Firm {
	constructor(sellPrice) {
		super({'money': 3000, 'metal': 90, 'lumber': 60, 'bread': 40});

		this.sell = {'tools': sellPrice};

		this.upkeepCost = {'bread': 10};
		this.upkeepInterval = 9;

		this.produceCost = {'metal': 15, 'lumber': 10};
		this.producedGoods = {'tools': 20};
		this.variance = 10;
		
		this.expandRequirement = {'metal': 180, 'lumber': 120};
		this.expandReady = {'money': 6000, 'metal': 200, 'lumber': 140, 'bread': 100};
		this.expandCost = {'money': 3000, 'metal': 110, 'lumber': 80, 'bread': 60};
	}
}

class Forester extends Firm {
	constructor(sellPrice) {
		super({'money': 3000, 'bread': 80, 'tools': 40});

		this.sell = {'lumber': sellPrice};

		this.upkeepCost = {'bread': 10, 'tools':1};
		this.upkeepInterval = 12;

		this.produceCost = {'bread': 10, 'tools': 5};
		this.producedGoods = {'lumber': 10 };
		this.variance = 5;

		this.expandRequirement = {'bread': 160, 'tools': 80};
		this.expandReady = {'money': 6000, 'bread': 180, 'tools': 90};
		this.expandCost = {'money': 3000, 'bread': 100, 'tools': 50};
	}
}

class Farm extends Firm {
	constructor(sellPrice) {
		super({'money': 2000, 'bread': 80, 'tools': 20});

		this.sell = {'wheat': sellPrice};

		this.upkeepCost = { 'bread': 5, 'tools':1};
		this.upkeepInterval = 17;

		this.produceCost = {'bread': 10, 'tools': 2};
		this.producedGoods = {'wheat': 300};
		this.variance = 100;

		this.expandRequirement = {'bread': 110, 'tools': 40};
		this.expandReady = {'money': 4000, 'bread': 160, 'tools': 50, 'lumber': 30};
		this.expandCost = {'money': 2000, 'bread': 80, 'tools': 30, 'lumber': 30};
	}
}

class Mill extends Firm {
	constructor(sellPrice) {
		super({'money': 3000, 'bread': 80, 'wheat': 1200, 'tools': 10});
		
		this.sell = {'flour': sellPrice};

		this.upkeepCost = {'bread': 5, 'tools':1};
		this.upkeepInterval = 10;

		this.produceCost = {'wheat': 200, 'bread':10};
		this.producedGoods = {'flour': 150};
		this.variance = 25;

		this.expandRequirement = {'wheat': 2400, 'bread': 100};
		this.expandReady = {'money': 6000, 'bread': 200, 'wheat': 2400, 'tools': 10, 'lumber': 30};
		this.expandCost = {'money': 3000, 'wheat': 1200, 'bread': 120, 'tools': 15, 'lumber': 30};
	}
}

class Baker extends Firm {
	constructor(sellPrice) {
		super({'money': 4000, 'bread': 20,'flour': 240, 'tools': 10, 'lumber': 30});

		this.sell = {'bread': sellPrice};

		this.upkeepCost = {'lumber': 1, 'tools':1};
		this.upkeepInterval = 18;

		this.produceCost = {'flour': 40, 'lumber': 2};
		this.producedGoods = {'bread': 100};
		this.variance = 20;

		this.expandRequirement = {'flour': 480, 'lumber': 50};
		this.expandReady = {'money': 8000, 'flour':480, 'bread': 100, 'tools': 40, 'lumber': 80};
		this.expandCost = {'money': 4000, 'bread': 80, 'tools': 30, 'lumber': 50};
	}
}

class Refinery extends Firm {
	constructor(sellPrice) {
		super({'money': 3000, 'bread': 60, 'tools': 5, 'ore': 240, 'tools': 10,'lumber': 10,});

		this.sell = {'metal': sellPrice};

		this.upkeepCost = {'lumber': 1, 'tools':1};
		this.upkeepInterval = 14;

		this.produceCost = {'bread':10, 'ore': 40};
		this.producedGoods = {'metal': 30};
		this.variance = 5;

		this.expandRequirement = {'bread': 120, 'ore': 480};
		this.expandReady = {'money': 6000, 'bread': 140, 'ore': 480, 'tools': 40, 'lumber': 60};
		this.expandCost = {'money': 3000, 'bread': 80, 'ore': 240, 'tools': 30, 'lumber': 50};
	}
}

// The mint class actually isn't special. It will just not sell anything
// I imagine this working as each coin being individually molded metal like a piece of art, with
// very fine artwork making it valuable. Therefore, it will require metal and a large amount of food
class Mint extends Firm {
	constructor(sellPrice) {
		super({'money': 4000, 'bread': 120, 'tools': 10, 'metal': 120, 'lumber': 10,});

		this.sell = {'money': 1}; // sells 1 money for 1 money... might want to change later...

		this.upkeepCost = {'lumber': 1, 'tools':1};
		this.upkeepInterval = 21;

		this.produceCost = {'bread':20, 'metal': 20};
		this.producedGoods = {'money': 500};
		this.variance = 50;

		this.expandRequirement = {'bread': 240, 'metal': 220};
		this.expandReady = {'money': 8000, 'bread': 260, 'tools': 30, 'metal': 220, 'lumber': 40};
		this.expandCost = {'money': 4000, 'bread': 140, 'tools': 20, 'metal': 120, 'lumber': 30};
	}
}