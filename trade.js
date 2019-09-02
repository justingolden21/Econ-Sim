/* TODO:
sort sellers by resource sold, from cheapest to most expensive
randomize order of buyers, then each one goes and updates its buy info, then buys that many
*/

function doTradesNew(firms) {

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

	console.log(purchaseCosts);



	// sort sell orders
	let sellOrders = [];
	for(firm in firms) {
		let resource = Object.keys(firms[firm].sell)[0];
		if(firms[firm].has(resource, 1) ) {
			// must have 1 of resource they're selling
			sellOrders.push({'sell': firms[firm].sell, 'firm': firms[firm].firmNum});
		}
	}
	// sort array of objects
	sellOrders.sort( (a,b)=> { // sort by keys
		let textA = Object.keys(a['sell'])[0];
		let textB = Object.keys(b['sell'])[0];
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	sellOrders.sort( (a,b)=> { // sort by vals
		let valA = Object.values(a['sell'])[0];
		let valB = Object.values(b['sell'])[0];
		return valA - valB;
	});
	console.log(sellOrders);

	// get rid of sell orders later?




}

function doTrades(firms) {
	let sellers = firms;

	// use sellerIdxs so we don't shuffle original array, choose random index instead
	let sellerIdxs = [...Array(firms.length).keys()]; // list of nums 0 to n-1
	shuffle(sellerIdxs);

	for(let i = 0; i < sellerIdxs.length; i++) {
		// get seller info
		let seller = sellers[sellerIdxs[i] ];
		let resource = Object.keys(seller.sell)[0];
		let price = seller.sell[resource];
		if(!seller.has(resource, 1) ) {
			continue;
		}

		// get list of buyers
		let buyers = [];
		for(let j = 0; j < firms.length; j++) {
			// if the firm wants to buy the resource, will pay asking price, and has the money
			for(let key in firms[j].buy) {
				if(key == resource) {
					if(firms[j].buy[key] >= price) {
						if(firms[j].has('money', price) ) {
							buyers.push(firms[j]);
						}
					}
				}				
			}

		}

		// complete transactions
		let buyerIdxs = [...Array(buyers.length).keys()]; // list of nums 0 to n-1
		shuffle(buyerIdxs);
		let adjustment = false; // if no buyers, lower price
		for(let l = 0; l < buyerIdxs.length; l++) {
//			if(buyers[buyerIdxs[l] ].has('money', price) ) { // redundant from above?
				// loop through all buyers in random order
				// trade as much as possible with each buyer until seller is out of resources
				adjustment = doTrade(seller, buyers[buyerIdxs[l] ], price, resource);
//			}
//			else {
//				break;
//			}
		}
		// console.log(adjustment);
		seller.adjust(adjustment);
	}

}

function doTrade(seller, buyer, price, resource) {
	let sellerMax = Math.max(seller.inventory[resource] - 2*seller.upkeep['cost'], 0);
	let buyerMax = Math.floor(buyer.inventory['money']/price);
	let amount = Math.min(buyerMax, sellerMax);

	seller.give(buyer, resource, 1*amount);
	buyer.give(seller, 'money', price*amount);

	// console.log('Trading between ' + seller.type() + ' and ' + buyer.type() + '. ' +
	// 	' Amount: ' + amount + ' Resource: ' + resource + ' Price: ' + price);

	return amount == sellerMax;
}