//bobbyFirms.js

class Mine extends Firm {
	constructor(firmNum) {
		super({'money':400, 'bread':40, 'tools':40}, firmNum);//starting inventory

		this.sell = {'ore': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'tools': 100}; //what it is buying, can be mutliple

		this.upkeep = { 'tools': 10, 'interval': 19}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 30, 'tools': 10};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'ore': 100};//what this firm is producing
    this.variance = [1,15]; //amount praoduction will vary from the value set in producedGoods
	  this.expandRequirement = {'bread': 120, 'tools': 30  };
		this.expandReady = {'money': 700, 'bread': 120, 'tools': 30, 'lumber': 20}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 400, 'bread': 60, 'tools': 20, 'lumber': 20};//what to deduct from inventory
//while we do not have money being added to the system through a 'Mint' firm, we need to have the money supply increase here
//by deducting less than we add.
//for the sake of simplicity, a firm will not need have any of what they produce to expand for now.
//if you think about it, you'll see why that's hard to program
	}
}

class Smith extends Firm {
	constructor(firmNum) {
		super({'money': 300, 'metal': 20, 'lumber': 20}, firmNum);//starting inventory

		this.sell = {'tools': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'metal': 10, 'lumber': 15}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'interval': 9}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'metal': 10, 'lumber': 10};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'tools': 20};//what this firm is producing

    this.variance = [1,10];
	  this.expandRequirement = {'metal': 60, 'lumber': 60};
		this.expandReady = {'money': 600, 'metal': 60, 'lumber': 60}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 300, 'metal': 20,  'lumber': 20};//what to decuct from inventory

	}
}

class Forester extends Firm {
	constructor(firmNum) {
		super({'money': 300, 'bread': 20, 'tools': 10}, firmNum);//starting inventory

		this.sell = {'lumber': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 40, 'tools': 35}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':1, 'interval': 12}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'tools': 5};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'lumber': 10 };//what this firm is producing
	
    this.variance = [1,5];
    this.expandRequirement = {'bread': 80, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 80, 'tools': 30}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 300, 'bread': 30, 'tools': 10};//what to decuct from inventory

	}
}


class Farm extends Firm {
	constructor(firmNum) {
		super({'money': 200, 'bread': 20, 'tools': 10}, firmNum);//starting inventory

		this.sell = {'wheat': 10};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'tools': 30}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':2, 'interval': 17}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-15,15);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'tools': 2};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'wheat': 300};//what this firm is producing
    this.variance = [1,100];
	
    this.expandRequirement = {'bread': 70, 'tools': 30};
		this.expandReady = {'money': 500, 'bread': 70, 'tools': 30, 'lumber': 15}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 200, 'bread': 30, 'tools': 10, 'lumber': 15};//what to decuct from inventory

	}
}

class Mill extends Firm {
	constructor(firmNum) {
		super({'money': 200, 'bread': 20, 'wheat': 500, 'tools': 10}, firmNum);//starting inventory

		this.sell = {'flour': 15};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'wheat': 10}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':2, 'interval': 10}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-3,3);// a random stand in for the 'talent' of the firm

		this.produceCost = {'wheat': 200, 'bread':10};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'flour': 100};//what this firm is producing
    this.variance = [1, 25];
	 
    this.expandRequirement = {'bread': 50, 'wheat': 1000};
		this.expandReady = {'money': 500, 'bread': 50, 'wheat': 1000, 'tools': 20, 'lumber': 15}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 200, 'wheat': 500, 'bread': 30, 'tools': 10, 'lumber': 15};//what to decuct from inventory

	}
}

class Baker extends Firm {
	constructor(firmNum) {
		super({'money': 200, 'bread': 20, 'tools': 10, 'lumber': 6}, firmNum);//starting inventory

		this.sell = {'bread': 30};//what it is selling, one item for now. don't know what this number is
		this.buy = {'flour': 50, 'lumber': 10}; //what it is buying, can be mutliple

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 18}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-3,3);// a random stand in for the 'talent' of the firm

		this.produceCost = {'flour': 40, 'lumber': 2};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'bread': 100};//what this firm is producing
    this.variance = [1, 20];
	
    this.expandRequirements = {'flour': 120, 'lumber': 10};
		this.expandReady = {'money': 500, 'bread': 50, 'tools': 20, 'lumber': 30}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 200, 'bread': 30, 'tools': 10, 'lumber': 20};//what to decuct from inventory

	}
}

class Refinery extends Firm {
	constructor(firmNum) {
		super({'money': 300, 'bread': 30, 'tools': 5, 'ore': 80, 'lumber': 10,}, firmNum);

		this.sell = {'metal': 10};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'ore': 10,}; //what it is buying, can be mutliple

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 14}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-3,3);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread':10, 'ore': 40};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'metal': 30};//what this firm is producing
    this.variance = [1, 5];
	
    this.expandRequirements = {'bread': 40, 'ore': 160};
		this.expandReady = {'money': 600, 'bread': 40, 'ore': 160, 'tools': 20, 'lumber': 30}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 300, 'bread': 30, 'ore': 80, 'tools': 10, 'lumber': 20};//what to decuct from inventory

	}
}

class Mint extends Firm { //The mint class actually isn't special. It will just not sell anything
//I imagine this working as each coin being individually molded metal like a piece of art, with
//very fine artwork making it valuable. Therefore, it will require metal and a large amount of food
	constructor(firmNum) {
		super({'money': 400, 'bread': 40, 'tools': 10, 'metal': 40, 'lumber': 10,}, firmNum);

		this.sell = {'money': 1}; //the mint does not sell anything, code doesnt understand.
		this.buy = {'bread': 30, 'metal': 30,}; //what it is buying, can be mutliple

		this.upkeep = { 'lumber': 2, 'tools':2, 'interval': 21}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-3,3);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread':20, 'metal': 20};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'money': 40};//what this firm is producing
    this.variance = (1, 5);
	
    this.expandRequirements = {'bread': 80, 'metal': 80};
		this.expandReady = {'money': 600, 'bread': 80, 'tools': 20, 'metal': 80, 'lumber': 30}; //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 400, 'bread': 40, 'tools': 10, 'metal': 40, 'lumber': 20};//what to decuct from inventory

	}
}


/*TO DO:

Add where firms buy from lowest price to highest
Add firms buying in the proper ratio
Add firms buying their fixed  (add to while loop if tic % 10 == 0 (ie is rent day)
then try to buy your requirements, if you can't roll to die. Must watch if this results in
price of lumber fluctuating wildly. (YOU ARE HERE)

Add firms, upon reaching a point of wealth, buying their expansion requirements

add expansion (reproduction), including a 'if this rich, start looking for expansion' item list

add all of 'Bobby's firms'
add graphs and other helpful ways to look at the data
(end backend stuff ver 1.0)

WHY-> the way we buy things, will we build up a reserve that will trigger the 'expandRequirement' conditions?
Possibly, just needs to be tried.

Savings are necisary so that a firm can pay rent, otherwise all of its money will be in product, and if it hasn't sold already it is unlikely to have any cash on hand.

Going to need to adjust Buy-> wood 10, because apparently it is actually saying how much of what to buy for standard recources. Sigh.


*/