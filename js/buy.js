// todo: if worth producing
function doBuy(firm, purchaseCosts) {
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCosts = purchaseCosts[input1];
	let input2purchaseCosts = purchaseCosts[input2];

	// nothing to purchase
	if(!input1purchaseCosts || !input2purchaseCosts) return;


	while(input1purchaseCosts.length > 0 && input2purchaseCosts.length > 0) {

		input1cost = input1purchaseCosts[0][PRICE];
		input2cost = input2purchaseCosts[0][PRICE];

		let input1available = input1purchaseCosts[0][AVAILABLE];
		let input2available = input2purchaseCosts[0][AVAILABLE];

		let costPerProduce = input1produceCost * input1cost + input2produceCost * input2cost;

		// if don't have money to produce once
		if(firm.inventory['money'] < costPerProduce) {
			return;
		}
		// if not worth if to produce
		let sellPrice = firm.sell[Object.keys(firm.sell)[0] ];
		let amountProduced = Object.values(firm.producedGoods)[0];
		if(costPerProduce > 2*sellPrice*amountProduced) { // if losing more than 2x as much
			return;
		}

		let amountCanProduce = Math.floor(firm.inventory['money'] / costPerProduce);

		// let seller1Num = input1purchaseCosts[input1Idx][2]; // firm num
		let seller1Num = input1purchaseCosts[0][FIRM_NUM];
		let seller1 = AIs[seller1Num]; // firm selling resource 1
		// let seller2Num = input2purchaseCosts[input1Idx][2]; // firm num
		let seller2Num = input2purchaseCosts[0][FIRM_NUM];
		let seller2 = AIs[seller2Num]; // firm selling resource 2

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

		// don't need an index, instead just remove the empty elements
		// until we either don't want to buy or we ran out of elements
		// updates the object for next firm
		purchaseCosts[input1][0][AVAILABLE] -= input1toBuy;
		purchaseCosts[input2][0][AVAILABLE] -= input2toBuy;

		let toBreak = true;
		if(purchaseCosts[input1][0][AVAILABLE]==0) {
			purchaseCosts[input1].splice(0,1); // remove first elm
			toBreak = false;
		}
		if(purchaseCosts[input2][0][AVAILABLE]==0) {
			purchaseCosts[input2].splice(0,1); // remove first elm
			toBreak = false;
		}

		if(toBreak) {
			break;
		}
	} // end while

}