//bobbyFirms.js

class Mine extends Firm {
	constructor(firmNum) {
		super({'money':40, 'bread':30, 'ore':20, 'tools':40}, firmNum);//starting inventory

		this.sell = {'iron': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'food': 30}; //what it is buying, can be mutliple

		this.upkeep = { 'tools': 10, 'interval': 10}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 20, 'tools': 2};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'ore': 30 + Math.random(1,10)};//what this firm is producing
	
		this.expandRequire = {'money': 100, 'bread': 100, 'tools': 40, 'lumber': 20} //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 40, 'bread': 40, 'lumber': 20}//what to decuct from inventory
//while we do not have money being added to the system through a 'Mint' firm, we need to have the money supply increase here
//by deducting less than we add. 
//for the sake of simplicity, a firm will not need have any of what they produce to expand for now.
//if you think about it, you'll see why that's hard to program
	}
}

class Smith extends Firm {
	constructor(firmNum) {
		super({'money': 30, 'bread': 10, 'metal': 10 'lumber': 15}, firmNum);//starting inventory

		this.sell = {'tools': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'metal': 10, 'lumber': 15}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10 'interval': 5}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'metal': 10 'lumber': 10};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'tools': 20 + Math.random(1,10)};//what this firm is producing
	
		this.expandRequire = {'money': 60, 'bread': 60, 'lumber': 35} //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 20, 'bread': 20,  'lumber': 20}//what to decuct from inventory

	}
}

class Forester extends Firm {
	constructor(firmNum) {
		super({'money': 30, 'bread': 20, 'tools': 10}, firmNum);//starting inventory

		this.sell = {'lumber': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 20, 'tools': 15}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':1 'interval': 5}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-2,2);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'tools': 5};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'lumber': 10 + Math.random(1,5)};//what this firm is producing
	
		this.expandRequire = {'money': 50, 'bread': 50, 'tools': 15} //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 30, 'bread': 30, 'tools': 10}//what to decuct from inventory

	}
}


class Farm extends Firm {
	constructor(firmNum) {
		super({'money': 20, 'bread': 20, 'tools': 10}, firmNum);//starting inventory

		this.sell = {'wheat': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'tools': 10}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':2 'interval': 10}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-30,30);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'tools': 2};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'wheat': 300 + Math.random(1,100)};//what this firm is producing
	
		this.expandRequire = {'money': 50, 'bread': 70, 'tools': 20, 'lumber': 15} //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 20, 'bread': 30, 'tools': 10, 'lumber': 15}//what to decuct from inventory

	}
}

class Mill extends Firm {
	constructor(firmNum) {
		super({'money': 50, 'bread': 20, 'tools': 5}, firmNum);//starting inventory

		this.sell = {'wheat': 40};//what it is selling, one item for now. don't know what this number is
		this.buy = {'bread': 30, 'tools': 10}; //what it is buying, can be mutliple

		this.upkeep = { 'bread': 10, 'tools':2 'interval': 10}; /*it's upkeep fixed costs
		I changed upkeep to work exactly like the others, with an interval commented, so you can
		decide how to add it in */
		this.efficiency = normal(-15,15);// a random stand in for the 'talent' of the firm

		this.produceCost = {'bread': 10, 'tools': 2};//what it takes for this firm to produce
		/*in future there may be production substitutes, you can either have bread OR meat etc.
		That will make the supply curve smoother as well*/
		this.producedGoods = {'flour': 200 + Math.random(1,50)};//what this firm is producing
	
		this.expandRequire = {'money': 50, 'bread': 70, 'tools': 20, 'lumber': 15} //this code prevent firms from bankrupting themselves in expansion
		this.expandCost = {'money': 20, 'bread': 30, 'tools': 10, 'lumber': 15}//what to decuct from inventory

	}
}