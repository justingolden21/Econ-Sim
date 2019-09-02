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
		updateBuyValues(buyer, purchaseCosts); // note: is infinite need to fix
		for(resource in buyer.buy) {
			let amountToBuy = buyer.buy[resource];
			let resourceCosts = purchaseCosts[resource];
			for(saleItem in resourceCosts) {
				// get vals
				let sellerNum = resourceCosts[saleItem][2]; // firm num
				let seller = AIs[sellerNum];
				let amount = Math.min(buyer.buy[resource], seller.sell[resource]);
				// do stuff
				doTrade(seller, buyer, seller.sell[resource], resource, amount);
				// update stuff
				buyer.buy[resource] -= amount;
				purchaseCosts[resource][saleItem][1] -= amount; // amount is idx 1
				if(amount = buyer.buy[resource])
				// check break conditon
				if(buyer.buy[resource]==0) {
					break;
				}
			}
		}
	}
}

// double check if they have the money and resource
// return if successful transaction
function doTrade(seller, buyer, price, resource, amount) {
	if(!seller.has(resource, amount) || buyer.has('money', amount) ) {
		return false;
	}

	seller.give(buyer, resource, 1*amount);
	buyer.give(seller, 'money', price*amount);

	// console.log('Trading between ' + seller.type() + ' and ' + buyer.type() + '. ' +
	// 	' Amount: ' + amount + ' Resource: ' + resource + ' Price: ' + price);
	return true;
}