function display(firms) {
	let tmpHTML = '';

	let avgPrices = {};
	let firmsTryingToExpand = 0;

	for(firm in firms) {
		tmpHTML += '<div class="col-sm-6 col-md-4">'
		tmpHTML += 'Firm #' + firms[firm].firmNum + ' - ' + firms[firm].type() + ':<br>';
		tmpHTML += 'Bankrupt: ' + firms[firm].bankrupt + '<hr>Inventory:<br>';
		for(item in firms[firm].inventory) {
			tmpHTML += item + ': ' + firms[firm].inventory[item] + 
			'<div class="progressbar" style="width:' + Math.min(firms[firm].inventory[item]/10,200) + 'px;"></div>';
		}
		// tmpHTML += '<hr>Reserve:<br>';
		// for(item in firms[firm].reserve) {
		// 	tmpHTML += item + ': ' + firms[firm].reserve[item] + 
		// 	'<div class="progressbar" style="width:' + Math.min(firms[firm].reserve[item]/10,200) + 'px;"></div>';
		// }

		let tryingToExpand = firms[firm].hasExpand();
		if(tryingToExpand) {
			firmsTryingToExpand++;
		}
		tmpHTML += '<hr>Efficiency: ' + round(firms[firm].efficiency);
		tmpHTML += '<br>Trying to Expand: ' + tryingToExpand;
		tmpHTML += '<br>Times Expanded: ' + firms[firm].timesExpanded;
		tmpHTML += '<hr>Sell Price: ' + firms[firm].sell[Object.keys(firms[firm].sell)[0] ];
		tmpHTML += '<br>For Sale: ' + firms[firm].forSale;
		tmpHTML += '<br>Money To Save: ' + firms[firm].moneyToSave;
		tmpHTML += '</div>';

		// ----------------

		let sellResource = Object.keys(firms[firm].sell)[0];
		if(!avgPrices[sellResource]) {
			avgPrices[sellResource] = {};
			avgPrices[sellResource].count = 0;
			avgPrices[sellResource].sum = 0;
		}
		avgPrices[sellResource].sum += firms[firm].sell[sellResource];
		avgPrices[sellResource].count++;
	}

	document.getElementById('display').innerHTML = tmpHTML;

	tmpHTML = 'Prices: ';
	for(resource in avgPrices) {
		tmpHTML += resource + ' : ' + round(avgPrices[resource].sum / avgPrices[resource].count) + ' | ';
	}
	document.getElementById('prices').innerHTML = tmpHTML;

	document.getElementById('ticks').innerHTML = ticks;
	document.getElementById('firms').innerHTML = AIs.length;
	document.getElementById('activity').innerHTML = activity +
		' <i class="fas fa-arrow-' + (activity > prevActivity ? 'up' : 'down') + '"></i>';
	document.getElementById('expand').innerHTML = firmsTryingToExpand + ' / ' + AIs.length;


	let totalInventory = {};
	let firmTypes = {};
	tmpHTML = '';
	for(firm in firms) {
		let inv = firms[firm].inventory;
		for(item in inv) {
			if(!totalInventory[item])
				totalInventory[item] = 0;
			totalInventory[item] += inv[item];
		}
		if(!firmTypes[firms[firm].type()])
			firmTypes[firms[firm].type()] = 0;
		firmTypes[firms[firm].type()]++;
	}
	let totalResources = 0;
	for(item in totalInventory) {
		tmpHTML += item + ': ' + totalInventory[item] + ' | ';
		totalResources += totalInventory[item];
	}
	tmpHTML += 'Total: ' + totalResources;
	document.getElementById('total-resources').innerHTML = tmpHTML;
	tmpHTML = '';
	for(type in firmTypes) {
		tmpHTML += type + ': ' + firmTypes[type] + ' | ';
	}
	document.getElementById('firm-types').innerHTML = tmpHTML;

	displayPlayer();
}

function displayPlayer() {
	if(!player) return;

	let tmpHTML = '';

	for(resource in player[0].inventory) {
		tmpHTML += resource + ': ' + player[0].inventory[resource] + ' | ';
	}

	document.getElementById('player-display').innerHTML = tmpHTML;
}

function round(num, places=3) {
	return Number( (num).toFixed(places) );
}