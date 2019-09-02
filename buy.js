// ignore initial inventory because we will run optimally
// take into account amount of inputs available (and starting values)
// take into account multiple different prices and amounts available
function updateBuyValues(firm, purchaseCosts) {

	let availableMoney = firm.inventory['money'];
	let spentMoney = 0;
	let doingUpkeep = false;
	let upkeepResource, upkeepResourceToBuy;

	// buy for upkeep cost first
	if(firm.ticks % firm.upkeep['interval'] == 0) {
		doingUpkeep = true;
		upkeepResource = firm.upkeep['resource'];
		let upkeepCost = firm.upkeep['cost'];
		
		let upkeepResourcePurchaseCosts = purchaseCosts[upkeepResource];
		if(!purchaseCosts[upkeepResource]) {
			upkeepResourceToBuy = 0;
		}
		else {

			let upkeepResourceIdx = 0;

			upkeepResourceToBuy = 0;

			while(upkeepResourceIdx < upkeepResourcePurchaseCosts.length && upkeepResourceToBuy < upkeepCost) {
				let upkeepResourcePurchaseCost = upkeepResourcePurchaseCosts[upkeepResourceIdx][0];
				let upkeepResourceAvailable = upkeepResourcePurchaseCosts[upkeepResourceIdx][1];

				if(upkeepCost - upkeepResourceToBuy > upkeepResourceAvailable) {
					// buy all (remaining available)
					upkeepResourceToBuy += upkeepResourceAvailable;
				} else {
					// buy necessary (remaining necessary)
					upkeepResourceToBuy += upkeepCost - upkeepResourceToBuy;
				}

				let moneyToSpend = upkeepResourcePurchaseCost * upkeepResourceToBuy;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				upkeepResourceAvailable -=upkeepResourceToBuy;

				if(upkeepResourceAvailable == 0) {
					upkeepResourceIdx++;
				}
			}
		}

	}

	/* NOTE:
	make sure money checks out for below and updated amount available object is good
	check if resources are same as ones below before returning combined objects
	*/

	// getting variables
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCosts = purchaseCosts[input1];
	let input2purchaseCosts = purchaseCosts[input2];

	if(!purchaseCosts[input1] || !purchaseCosts[input2]) {
		firm.buy = {[input1]: 0, [input2]: 0};
		return;
	}

	let output = Object.keys(firm.sell)[0];
	let outputPrice = firm.sell[output];
	let outputProduced = firm.producedGoods[output];

	let input1Idx = 0;
	let input2Idx = 0;

	let input1toBuy = 0;
	let input2toBuy = 0;

	// check to make sure we have money and both resources are available
	// NOTE: runs infinitely
	while(availableMoney >= spentMoney && input1Idx < input1purchaseCosts.length && input2Idx < input2purchaseCosts.length) {
		let input1purchaseCost = input1purchaseCosts[input1Idx][0];
		let input2purchaseCost = input2purchaseCosts[input2Idx][0];
		// checks if at current (lowest) price point, it's worth producing
		if(input1purchaseCost * input1produceCost + input1purchaseCost * input2produceCost > outputPrice * outputProduced) {
			break; // combine with upkeep and finish function
		}

		let input1available = input1purchaseCosts[input1Idx][1];
		let input2available = input2purchaseCosts[input2Idx][1];
		// check which resource limits amount we can produce (at current price points)
		if(input1available/input1produceCost < input2available/input2produceCost) {
			// input1 is limiting
			
			let input2optimalPurchase = (input2produceCost * input1available) / input1produceCost;
			// if we can buy out input1
			if(input1produceCost * input1purchaseCost * input1available +
				input2produceCost * input2purchaseCost * input2optimalPurchase < availableMoney) {
				let moneyToSpend = input1purchaseCost * input1available + input2purchaseCost * input2optimalPurchase;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input1toBuy += input1available;
				input2toBuy += input2optimalPurchase;

				input1available = 0;
				input2available -= input2optimalPurchase;
			} else {
				// solve system of equations to find optimal purchase amounts based off available money
				input2optimalPurchase = (availableMoney * input2produceCost) / 
					(Math.pow(input1produceCost,2)*input1purchaseCost + Math.pow(input2produceCost,2)*input2purchaseCost);
				input2optimalPurchase = Math.floor(input2optimalPurchase);

				let input1optimalPurchase = input2optimalPurchase * input1produceCost / input2produceCost;
				let moneyToSpend = input1purchaseCost * input1optimalPurchase + input2purchaseCost * input2optimalPurchase;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input1toBuy += input1optimalPurchase;
				input2toBuy += input2optimalPurchase;

				input1available -= input1optimalPurchase;
				input2available -= input2optimalPurchase;

				availableMoney = 0; // testing
			}
			input1Idx++; // testing
		} else if(input1available/input1produceCost > input2available/input2produceCost) {
			// input2 is limiting
			
			let input1optimalPurchase = (input1produceCost * input2available) / input2produceCost;
			// if we can buy out input2
			if(input2produceCost * input2purchaseCost * input2available +
				input1produceCost * input1purchaseCost * input1optimalPurchase < availableMoney) {
				let moneyToSpend = input2purchaseCost * input2available + input1purchaseCost * input1optimalPurchase;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input2toBuy += input2available;
				input1toBuy += input1optimalPurchase;

				input2available = 0;
				input1available -= input1optimalPurchase;
			} else {
				// solve system of equations to find optimal purchase amounts based off available money
				input1optimalPurchase = (availableMoney * input1produceCost) / 
					(Math.pow(input2produceCost,2)*input2purchaseCost + Math.pow(input1produceCost,2)*input1purchaseCost);
				input1optimalPurchase = Math.floor(input1optimalPurchase);
				
				let input2optimalPurchase = input1optimalPurchase * input2produceCost / input1produceCost;
				let moneyToSpend = input2purchaseCost * input2optimalPurchase + input1purchaseCost * input1optimalPurchase;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input2toBuy += input2optimalPurchase;
				input1toBuy += input1optimalPurchase;

				input2available -= input2optimalPurchase;
				input1available -= input1optimalPurchase;

				availableMoney = 0; // testing
			}
			input2Idx++; // testing
		} else {
			// perfect ratio
			
			// if we can buy out both input1 and input2
			if(input1produceCost * input1purchaseCost * input1available +
				input2produceCost * input2purchaseCost * input2available < availableMoney) {
				let moneyToSpend = input1purchaseCost * input1available + input2purchaseCost * input2available;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input1toBuy += input1available;
				input2toBuy += input2available;

				input1available = 0;
				input2available = 0;
			} else {
				// solve system of equations to find optimal purchase amounts based off available money
				let input2optimalPurchase = (availableMoney * input2produceCost) / 
					(Math.pow(input1produceCost,2)*input1purchaseCost + Math.pow(input2produceCost,2)*input2purchaseCost);
				input2optimalPurchase = Math.floor(input2optimalPurchase);

				let input1optimalPurchase = input2optimalPurchase * input1produceCost / input2produceCost;
				let moneyToSpend = input1purchaseCost * input1optimalPurchase + input2purchaseCost * input2optimalPurchase;
				spentMoney += moneyToSpend;
				availableMoney -= moneyToSpend;
				input1toBuy += input1optimalPurchase;
				input2toBuy += input2optimalPurchase;

				input1available -= input1optimalPurchase;
				input2available -= input2optimalPurchase;

				availableMoney = 0; // testing
			}
			input1Idx++; // testing
			input2Idx++; // testing
		}

		// increment indicies to get to next price point(s)
		if(input1available == 0) {
			input1Idx++;
		}
		if(input2available == 0) {
			input2Idx++;
		}		
	} // end while


	// last stuff combining upkeep resource if relevant
	if(doingUpkeep) {
		if(upkeepResource==input1) {
			firm.buy = {[input1]: input1toBuy+upkeepResourceToBuy, [input2]: input2toBuy};
			return;
		} else if(upkeepResource==input2) {
			firm.buy = {[input1]: input1toBuy, [input2]: input2toBuy+upkeepResourceToBuy};
			return;
		} else {
			firm.buy = {[input1]: input1toBuy, [input2]: input2toBuy, [upkeepResource]: upkeepResourceToBuy};
			return;
		}
	}

	// todo idea: edit amount available for future calls, so we don't have to calculate it each time we request it
	// we only have to calc it at start of trade sequence
	// basically, when we buy, update amount available
}
