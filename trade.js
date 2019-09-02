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
			purchaseCosts[resource].push(
				[firms[firm].sell[resource], // resource cost (will sort by this)
				firms[firm].inventory[resource], // amount available
				firms[firm].firmNum] // firm number
			);
		}
	}

	for(resource in purchaseCosts) {
		// sort each resource in obj by its cost
		purchaseCosts[resource].sort( (a,b)=> {
			// cost is element at idx 0
			return a[0]-b[0];
		});
	}

	// console.log(purchaseCosts);

	// loop through buyers in random order
	// let them update their buy info and then make purchases
	let buyerIdxs = [...Array(firms.length).keys()]; // list of nums 0 to n-1
	shuffle(buyerIdxs);
	for(let i = 0; i < buyerIdxs.length; i++) {
		let buyer = firms[buyerIdxs[i] ];
		// let the firm update their buy info first
		// updateBuyValues(buyer, purchaseCosts); // need to add back
		for(resource in buyer.buy) {
			let resourceCosts = purchaseCosts[resource];
			let tmp = buyer.buy[resource]; // store val. won't need when buy.js works
			for(saleItem in resourceCosts) {
				// check break conditon
				if(buyer.buy[resource]==0) {
					break;
				}
				// get vals
				let sellerNum = resourceCosts[saleItem][2]; // firm num
				let seller = AIs[sellerNum];
				let amount = Math.min(buyer.buy[resource], seller.inventory[resource]);
				// console.log(amount);
				if(amount==0) {
					break;
				}
				// do stuff
				doTrade(seller, buyer, seller.sell[resource], resource, amount);
				// update stuff
				buyer.buy[resource] -= amount;
				purchaseCosts[resource][saleItem][1] -= amount; // amount is idx 1
			}
			buyer.buy[resource] = tmp; // set it back. won't need when buy.js works
		}
	}
}

// double check if they have the money and resource
// return if successful transaction
// function not being called correctly... sometimes fails
function doTrade(seller, buyer, price, resource, amount) {
	if(amount<1) {
		console.log(amount);
	}
	if(amount==0) return;
	// console.log(seller, buyer, price, resource, amount);
	if(!seller.has(resource, amount) || !buyer.has('money', price*amount) ) {
		// console.log('oh no');
		return false;
	}

	seller.give(buyer, resource, amount);
	buyer.give(seller, 'money', price*amount);

	seller.prevAmountSold += amount;

	// console.log('Trading between ' + seller.type() + ' and ' + buyer.type() + '. ' +
	// 	' Amount: ' + amount + ' Resource: ' + resource + ' Price: ' + price);
	// console.log('yeah');
	return true;
}