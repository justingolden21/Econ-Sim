function getAmountToBuySimple(firm) {
	// ---------------- Get variables ----------------
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCost = getPurchaseCost(input1);
	let input2purchaseCost = getPurchaseCost(input2);

	let availableMoney = firm.inventory['money'];

	// ---------------- Make computations ----------------

	let input1totalCost = input1produceCost * input1purchaseCost;
	let input2totalCost = input2produceCost * input2purchaseCost;
	let allInputsTotalCost = input1totalCost + input2totalCost;

	let amountCanProduce = Math.floor(availableMoney / allInputsTotalCost);

	let input1toBuy = amountCanProduce * input1produceCost;
	let input2toBuy = amountCanProduce * input2produceCost;

	return {input1: input1toBuy, input2: input2toBuy};
}

// take into account starting values
function getAmountToBuy(firm) {
	// ---------------- Get variables ----------------
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCost = getPurchaseCost(input1);
	let input2purchaseCost = getPurchaseCost(input2);

	let availableMoney = firm.inventory['money'];

	let initialInput1 = firm.inventory[input1];
	let initialInput2 = firm.inventory[input2];

	// ---------------- Make computations ----------------

	let input1amountCanProduce = initialInput1 / input1produceCost;
	let input2amountCanProduce = initialInput2 / input2produceCost;

	let initialAmountToMake = Math.abs(input1amountCanProduce - input2amountCanProduce);

	let initialAmountInput1toBuy = 0;
	let initialAmountInput2toBuy = 0;
	if(input1amountCanProduce > input2amountCanProduce) {
		initialAmountInput2toBuy += initialAmountToMake * input2produceCost;
		availableMoney -= initialAmountInput2toBuy * input2purchaseCost;
	} else {
		initialAmountInput1toBuy += initialAmountToMake * input1produceCost;
		availableMoney -= initialAmountInput1toBuy * input1purchaseCost;
	}

	// ---------------- Do math from above ----------------
	// with reduced money

	let input1totalCost = input1produceCost * input1purchaseCost;
	let input2totalCost = input2produceCost * input2purchaseCost;
	let allInputsTotalCost = input1totalCost + input2totalCost;

	let amountCanProduce = Math.floor(availableMoney / allInputsTotalCost);

	let input1toBuy = amountCanProduce * input1produceCost;
	let input2toBuy = amountCanProduce * input2produceCost;

	// ---------------- Add on initial amount to buy ----------------

	input1toBuy += initialAmountInput1toBuy;
	input2toBuy += initialAmountInput2toBuy;

	return {input1: input1toBuy, input2: input2toBuy};
}

// take into account amount of inputs available (and starting values)
function getAmountToBuyAdvanced(firm) {
	// ---------------- Get variables ----------------
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCost = getPurchaseCost(input1);
	let input2purchaseCost = getPurchaseCost(input2);

	let availableMoney = firm.inventory['money'];

	let initialInput1 = firm.inventory[input1];
	let initialInput2 = firm.inventory[input2];

	let input1available = getAmountAvailable(input1);
	let input2available = getAmountAvailable(input2);

	// ---------------- Make computations ----------------

	let input1amountCanProduce = initialInput1 / input1produceCost;
	let input2amountCanProduce = initialInput2 / input2produceCost;

	let initialAmountToMake = Math.abs(input1amountCanProduce - input2amountCanProduce);

	let initialAmountInput1toBuy = 0;
	let initialAmountInput2toBuy = 0;
	if(input1amountCanProduce > input2amountCanProduce) {
		initialAmountInput2toBuy += initialAmountToMake * input2produceCost;
		availableMoney -= initialAmountInput2toBuy * input2purchaseCost;

		if(initialAmountInput2toBuy >= input2available) {
			return {input1: 0, input2: input2available};
		}
	} else {
		initialAmountInput1toBuy += initialAmountToMake * input1produceCost;
		availableMoney -= initialAmountInput1toBuy * input1purchaseCost;

		if(initialAmountInput1toBuy >= input1available) {
			return {input1: input1available, input2: 0};
		}
	}

	// ---------------- Do math from above ----------------
	// with reduced money
	// and limited inputs available

	let input1totalCost = input1produceCost * input1purchaseCost;
	let input2totalCost = input2produceCost * input2purchaseCost;
	let allInputsTotalCost = input1totalCost + input2totalCost;

	let amountCanProduce = Math.floor(availableMoney / allInputsTotalCost);

	let input1toBuy = amountCanProduce * input1produceCost;
	let input2toBuy = amountCanProduce * input2produceCost;

	// if we're limited
	// note: do this before adding initial amount of inputs to buy
	input1available -= initialAmountInput1toBuy;
	input2available -= initialAmountInput2toBuy;
	if(input1available < input1toBuy || input2available < input2toBuy) {
		let input1input2idealRatio = input1toBuy/input2toBuy;
		let input1input1availableRatio = input1available/input2available;

		if(input1input2idealRatio > input1input1availableRatio) {
			// ideal ratio has more input1, limited by input1
			input1toBuy = input1available - input1available%input1produceCost;
			input2toBuy = Math.min(input1toBuy/input1input2idealRatio, input2available);
		} else {
			// ideal ratio has more input2, limited by input2
			input2toBuy = input2available - input2available%input2produceCost;
			input1toBuy = Math.min(input2toBuy*input1input2idealRatio, input1available);
		}
	}

	// ---------------- Add on initial amount to buy ----------------

	input1toBuy += initialAmountInput1toBuy;
	input2toBuy += initialAmountInput2toBuy;

	return {input1: input1toBuy, input2: input2toBuy};
}

function isWorthProducing(firm) {
	let input1 = Object.keys(firm.produceCost)[0];
	let input2 = Object.keys(firm.produceCost)[1];

	let input1produceCost = firm.produceCost[input1];
	let input2produceCost = firm.produceCost[input2];

	let input1purchaseCost = getPurchaseCost(input1);
	let input2purchaseCost = getPurchaseCost(input2);

	let output = Object.keys(firm.sell)[0];
	let outputPrice = firm.sell[output];
	let outputProduced = firm.producedGoods[output];

	return outputProduced * outputPrice >
		(input1produceCost * input1purchaseCost) +
		(input2produceCost * input2purchaseCost);
}