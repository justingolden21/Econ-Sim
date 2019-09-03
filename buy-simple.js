function doBuy(firm, purchaseCosts) {
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCosts = purchaseCosts[input1];
	let input2purchaseCosts = purchaseCosts[input2];

	// nothing to purchase
	if(!input1purchaseCosts || !input2purchaseCosts) return;
	if(input1purchaseCosts.length==0 || input2purchaseCosts.length==0) return;

	// for(let input1Idx=0, input2Idx = 0; 
	// 	input1Idx < input1purchaseCosts.length && input2Idx < input2purchaseCosts.length; 
	// 	input1Idx++, input2Idx++) {

		// input1cost = input1purchaseCosts[input1Idx]; // cost at current price
		// input2cost = input2purchaseCosts[input2Idx]; // cost at current price

		// let input1available = input1purchaseCosts[input1Idx][1]; // amount available at current price
		// let input2available = input2purchaseCosts[input2Idx][1]; // amount available at current price

	input1cost = input1purchaseCosts[0][0]; // cost at current price
	input2cost = input2purchaseCosts[0][0]; // cost at current price

	let input1available = input1purchaseCosts[0][1]; // amount available at current price
	let input2available = input2purchaseCosts[0][1]; // amount available at current price

	let costPerProduce = input1produceCost * input1cost + input2produceCost * input2cost;

	if(firm.inventory['money'] < costPerProduce) {
		return;
	}

	let amountCanProduce = Math.floor(firm.inventory['money'] / costPerProduce);

	// let seller1Num = input1purchaseCosts[input1Idx][2]; // firm num
	let seller1Num = input1purchaseCosts[0][2]; // firm num
	let seller1 = AIs[seller1Num];
	// let seller2Num = input2purchaseCosts[input1Idx][2]; // firm num
	let seller2Num = input2purchaseCosts[0][2]; // firm num
	let seller2 = AIs[seller2Num];

	let input1toBuy = amountCanProduce * input1produceCost;
	let input2toBuy = amountCanProduce * input2produceCost;

	input1toBuy = Math.min(input1toBuy, input1available);
	input2toBuy = Math.min(input2toBuy, input2available);

	if(input1toBuy * input1produceCost > input2toBuy * input2produceCost) {
		// input 2 is limiting
		let input1toBuy = input2toBuy / input2produceCost * input1produceCost;
	} else if(input1toBuy * input1produceCost < input2toBuy * input2produceCost) {
		// input 1 limiting
		let input2toBuy = input1toBuy / input1produceCost * input2produceCost;
	}

	// complete transaction
	// seller, buyer, resource, amount
	doTrade(seller1, firm, input1, input1toBuy);
	doTrade(seller2, firm, input2, input2toBuy);

	// update purchaseCosts obj for next firm
	purchaseCosts[input1][0][1] -= input1toBuy; // idx 1 is amount available
	purchaseCosts[input2][0][1] -= input2toBuy;

	if(purchaseCosts[input1][0][1]==0) {
		purchaseCosts[input1].splice(0,1); // remove first elm
	}
	if(purchaseCosts[input2][0][1]==0) {
		purchaseCosts[input2].splice(0,1); // remove first elm
	}

	// }


}