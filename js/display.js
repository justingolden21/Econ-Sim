function display(firms) {
	let tmpHTML = '';

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
		tmpHTML += '<hr>Efficiency: ' + round(firms[firm].efficiency, 3);
		tmpHTML += '<br>Trying to Expand: ' + firms[firm].hasExpand();
		tmpHTML += '<br>Times Expanded: ' + firms[firm].timesExpanded;
		tmpHTML += '<hr>Sell Price: ' + firms[firm].sell[Object.keys(firms[firm].sell)[0] ];
		tmpHTML += '<br>For Sale: ' + firms[firm].forSale;
		tmpHTML += '<br>Money To Save: ' + firms[firm].moneyToSave;
		tmpHTML += '</div>';
	}

	document.getElementById('display').innerHTML = tmpHTML;
	document.getElementById('ticks').innerHTML = ticks;
	document.getElementById('firms').innerHTML = AIs.length;
	document.getElementById('activity').innerHTML = activity +
		' <i class="fas fa-arrow-' + (activity > prevActivity ? 'up' : 'down') + '"></i>';


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
}

function round(num, places) {
	return Number( (num).toFixed(places) );
}