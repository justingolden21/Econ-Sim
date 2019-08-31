function display(firms) {
	let tmpHTML = '';

	for(firm in firms) {
		tmpHTML += 'Firm #' + firms[firm].firmNum + ' - ' + firms[firm].type + ':<br>';
		tmpHTML += 'Bankrupt: ' + firms[firm].bankrupt + '<br>';
		for(item in firms[firm].inventory) {
			tmpHTML += item + ': ' + firms[firm].inventory[item] + 
			'<div class="progressbar" style="width:' + firms[firm].inventory[item]/10 + 'px;"></div>';
		}
		tmpHTML += 'Efficiency: ' + firms[firm].efficiency + '<br>';
		tmpHTML += 'Sell Price: ' + firms[firm].sell[Object.keys(firms[firm].sell)[0] ];
		tmpHTML += '<hr>';
	}

	document.getElementById('display').innerHTML = tmpHTML;
}