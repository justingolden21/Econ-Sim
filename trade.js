/*
sellers sorted by resource sold, from cheapest to most expensive
order of buyers is randomized then each one buys as much as it wants
*/

// enums
const PRICE = 0;
const AVAILABLE = 1;
const FIRM_NUM = 2;

function doTrades(firms) {
	// create purchase costs object

	// might increase number of different goods a firm can sell from 1
	let purchaseCosts = {};
	for(firm in firms) {
		let resource = Object.keys(firms[firm].sell)[0];
		if(firms[firm].has(resource, 1) ) { // has resource it's selling
			if(purchaseCosts[resource]==undefined) {
				// initiate empty array if doesn't exist
				purchaseCosts[resource] = [];
			}
			// each resource is a key and the value is a sorted (will sort later)
			// list of the resource's cost, amount available, and firm number
			let tmp = [];
			tmp[PRICE] = firms[firm].sell[resource];
			// tmp[AVAILABLE] = firms[firm].inventory[resource];
			tmp[AVAILABLE] = firms[firm].forSale;
			tmp[FIRM_NUM] = firms[firm].firmNum;
			purchaseCosts[resource].push(tmp);
		}
	}

	for(resource in purchaseCosts) {
		// first randomize so that if same prices, lower firm nums don't always get to sell first
		purchaseCosts[resource].sort( (a,b)=> {
			return Math.random() > 0.5 ? 1 : -1;
		});
		// sort each resource in obj by its price low to high
		purchaseCosts[resource].sort( (a,b)=> {
			return a[PRICE]-b[PRICE];
		});
	}
	// console.log(purchaseCosts);

	// loop through buyers in random order
	let buyerIdxs = [...Array(firms.length).keys()]; // list of nums 0 to n-1
	shuffle(buyerIdxs);
	for(let i = 0; i < buyerIdxs.length; i++) {
		let buyer = firms[buyerIdxs[i] ];
		doBuy(buyer, purchaseCosts);
	}
}

function doTrade(seller, buyer, resource, amount) {
	let price = seller.sell[resource];
	if(!seller.has(resource, amount) || !buyer.has('money', price*amount) ) {
		console.error('Not enough resource or money', seller.has(resource, amount), buyer.has('money', price*amount) );
		return false;
	}

	seller.give(buyer, resource, amount);
	buyer.give(seller, 'money', price*amount);

	seller.prevAmountSold += amount;
	activity += amount;

	// console.log('traded', seller, buyer, resource, amount);
	return true;
}