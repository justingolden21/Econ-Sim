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
		tmpHTML += '<hr>Efficiency: ' + round(firms[firm].efficiency, 3) + '<br>';
		tmpHTML += 'Sell Price: ' + firms[firm].sell[Object.keys(firms[firm].sell)[0] ];
		tmpHTML += '</div>';
	}

	document.getElementById('display').innerHTML = tmpHTML;
	document.getElementById('ticks').innerHTML = ticks;
	document.getElementById('firms').innerHTML = AIs.length;
	document.getElementById('activity').innerHTML = activity +
		' <i class="fas fa-arrow-' + (activity > prevActivity ? 'up' : 'down') + '"></i>';
}

function round(num, places) {
	return Number( (num).toFixed(places) );
}