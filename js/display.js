function display(firms) {
	let tmpHTML = '';

	let avgPrices = {};
	let firmsTryingToExpand = 0;

	for(firm in firms) {
		if(!firms[firm]) continue;

		tmpHTML += '<div class="col-sm-6 col-md-4">'
		tmpHTML += 'Firm #' + firms[firm].firmNum + ' &mdash; ' + getSprite(firms[firm].type(), 'md') + capitalize(firms[firm].type() ) + ':<br>';
		tmpHTML += 'Bankrupt: ' + formatBool(firms[firm].bankrupt) + '<hr><b>Inventory</b><br>';
		for(item in firms[firm].inventory) {
			tmpHTML += getSprite(item) + capitalize(item) + ': ' + firms[firm].inventory[item] + 
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
		tmpHTML += '<br>Trying to Expand: ' + formatBool(tryingToExpand);
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
		if(resource == 'money') continue;
		avgPrices[resource].price = round(avgPrices[resource].sum / avgPrices[resource].count);
		tmpHTML += getSprite(resource) + capitalize(resource) + ' : ' + avgPrices[resource].price + ' | ';
	}
	document.getElementById('prices').innerHTML = tmpHTML;
	drawChart(avgPrices);

	document.getElementById('ticks').innerHTML = ticks;
	document.getElementById('firms').innerHTML = AIs.length;
	document.getElementById('activity').innerHTML = activity +
		' <i class="fas fa-arrow-' + (activity > prevActivity ? 'up' : 'down') + '"></i>';
	document.getElementById('expand').innerHTML = firmsTryingToExpand + ' / ' + AIs.length;


	let totalInventory = {};
	let firmTypes = {};
	tmpHTML = '';
	for(firm in firms) {
		if(!firms[firm]) continue;
		
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
		tmpHTML += getSprite(item) + capitalize(item) + ': ' + totalInventory[item] + ' | ';
		totalResources += totalInventory[item];
	}
	tmpHTML += 'Total: ' + totalResources;
	document.getElementById('total-resources').innerHTML = tmpHTML;
	tmpHTML = '';
	for(type in firmTypes) {
		tmpHTML += getSprite(type) + capitalize(type) + ': ' + firmTypes[type] + ' | ';
	}
	document.getElementById('firm-types').innerHTML = tmpHTML;

	// displayPlayer();
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

function capitalizeEach(str) {
	let rtn = '';
	str = str.split(' ');
	for(let i=0; i<str.length; i++)
		rtn += capitalize(str[i]) + ' ';
	return rtn.slice(0,-1);
}
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatBool(bool) {
	return bool ? 'Yes' : 'No';
}