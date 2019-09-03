/* TODO:
sort sellers by resource sold, from cheapest to most expensive
randomize order of buyers, then each one goes and updates its buy info, then buys that many
*/

function doTrades(firms) {
	// create purchase costs object

	let purchaseCosts = {};
	for(firm in firms) {
		let resource = Object.keys(firms[firm].sell)[0];
		if(firms[firm].has(resource, 1) ) { // has resource it's selling
			// add to purchaseCosts
			if(purchaseCosts[resource]==undefined) {
				purchaseCosts[resource] = [];
			}
			// each resource is a key and the value is a sorted (will sort later)
			// list of the resource's cost, amount available, and firm number
			purchaseCosts[resource].push([
				firms[firm].sell[resource], // resource cost (will sort by this) [0]
				firms[firm].inventory[resource], // amount available [1]
				firms[firm].firmNum // firm number [2]
			]);
		}
	}

	for(resource in purchaseCosts) {
		// first randomize so that if same prices, lower firm nums don't always get to sell first
		purchaseCosts[resource].sort( (a,b)=> {
			return Math.random() > 0.5 ? 1 : -1;
		});
		// sort each resource in obj by its cost
		purchaseCosts[resource].sort( (a,b)=> {
			// cost is element at idx 0
			return a[0]-b[0];
		});
	}
	// console.log(purchaseCosts);

	// note: if purchaseCosts is decreasing probably isn't bug in buy scripts editing it
	// but because all the firms are going bankrupt
	// might also be buy script though

	// loop through buyers in random order
	// let them update their buy info and then make purchases
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
		return false;
	}

	seller.give(buyer, resource, amount);
	buyer.give(seller, 'money', price*amount);

	seller.prevAmountSold += amount;

	return true;
}