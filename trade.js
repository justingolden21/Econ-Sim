function doTrades(firms) {
	let sellers = firms;

	// use sellerIdxs so we don't shuffle original array, choose random index instead
	let sellerIdxs = [...Array(firms.length).keys()]; // list of nums 0 to n-1
	shuffle(sellerIdxs);

	for(let i = 0; i < sellerIdxs.length; i++) {
		// get seller info
		let seller = sellers[sellerIdxs[i] ];
		let resource = seller.sell['resource'];
		let price = seller.sell['price'];
		if(!seller.has(resource, 1) ) {
			continue;
		}

		// get list of buyers
		let buyers = [];
		for(let j = 0; j < firms.length; j++) {
			// if the firm wants to buy the resource, will pay asking price, and has the money
			if(firms[j].buy['resource'] == resource) {
				if(firms[j].buy['price'] >= price) {
					if(firms[j].has('money', price) ) {
						buyers.push(firms[j]);
					}
				}
			}
		}

		// complete transactions
		let buyerIdxs = [...Array(buyers.length).keys()]; // list of nums 0 to n-1
		shuffle(buyerIdxs);
		let adjustment = false; // if no buyers, lower price
		for(let k = 0; k < buyerIdxs.length; k++) {
//			if(buyers[buyerIdxs[k] ].has('money', price) ) { // redundant from above?
				// loop through all buyers in random order
				// trade as much as possible with each buyer until seller is out of resources
				adjustment = doTrade(seller, buyers[buyerIdxs[k] ]);
//			}
//			else {
//				break;
//			}
		}
		// console.log(adjustment);
		seller.adjust(adjustment);
	}

}

function doTrade(seller, buyer) {
	let price = seller.sell['price'];
	let resource = seller.sell['resource'];

	// let sellerMax = Math.min(seller.inventory[resource], seller.sell['max']);
	// let buyerMax = Math.min(Math.floor(buyer.inventory['money']/price), buyer.buy['max']);
	let sellerMax = Math.max(seller.inventory[resource] - 2*seller.upkeep['cost'], 0);
	let buyerMax = Math.floor(buyer.inventory['money']/price);
	let amount = Math.min(buyerMax, sellerMax);

	seller.give(buyer, resource, 1*amount);
	buyer.give(seller, 'money', price*amount);

	return amount == sellerMax;
	console.log('Trading between ' + seller.type + ' and ' + buyer.type + '. ' +
		' Amount: ' + amount + ' Resource: ' + resource + ' Price: ' + price);
}