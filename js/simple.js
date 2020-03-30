let inventory = {
	'money' : 0,
	'bread' : 0,
	'ore'   : 0,
	'lumber': 0,
	'metal' : 0,
	'wheat' : 0,
	'flour' : 0,
	'tools' : 0
};

// SGI_46
// SGI_177

const icons = {
	'money' : 'SGI_59',
	'bread' : 'SGI_164',
	'ore'   : 'SGI_65',
	'lumber': 'SGI_122',
	'metal' : 'SGI_84',
	'wheat' : 'SGI_62',
	'flour' : 'SGI_158',
	'tools' : 'SGI_24',

	'mine'	  : 'SGI_89',
	'smith'	  : 'SGI_70',
	'forester': 'SGI_110',
	'farm'	  : 'SGI_159',
	'mill'	  : 'SGI_49',
	'baker'	  : 'SGI_75',
	'refinery': 'SGI_121',
	'mint'	  : 'SGI_144'
};

const firms = 'mine smith forester farm mill baker refinery mint'.split(' ');

window.onload = ()=> {

	let tmpHTML = '';
	for(item in inventory)
		tmpHTML += item + ': ' + inventory[item] + ' <img src="img/icons/' + icons[item] + '.png" class="icon-sm"> | ';
	$('#total-resources').html(tmpHTML);

	tmpHTML = '';
	for(idx in firms)
		tmpHTML += firms[idx] + ': ' + 0 + ' <img src="img/icons/' + icons[firms[idx] ] + '.png" class="icon-sm"> | ';
	$('#firm-types').html(tmpHTML);

	tmpHTML = '';
	for(item in inventory)
		tmpHTML += item + ': ' + 0 + ' <img src="img/icons/' + icons[item] + '.png" class="icon-sm"> | ';
	$('#prices').html(tmpHTML);

	fillPlayerInputTable();

	tmpHTML = '<div class="row">';
	for(idx in firms)
		tmpHTML += '<div class="col-sm-4">' + firms[idx] + ': ' + 0 + ' <img src="img/icons/' + icons[firms[idx] ] + '.png" class="icon-md"><br><br></div>';
	$('#player-firms').html(tmpHTML+'</div>');

	tmpHTML = '<div class="row">';
	for(item in inventory)
		tmpHTML += '<div class="col-sm-4">' + item + ': ' + 0 + ' <img src="img/icons/' + icons[item] + '.png" class="icon-md"><br><br></div>';
	$('#player-inventory').html(tmpHTML+'</div>');

}

function fillPlayerInputTable() {
	let tmpHTML = '<tr><td>Resource</td><td></td><td>Buy/Sell</td><td>Amount</td><td>Price</td></tr>';
	for(item in inventory) {
		tmpHTML += '<tr>' +
			'<td>' + item + '</td>' +
			'<td><img src="img/icons/' + icons[item] + '.png" class="icon-md"></td>' +
			'<td>' +
				'<div class="custom-control custom-switch">' +
					'<input type="checkbox" class="custom-control-input" id="' + item + '-switch">' +
					'<label class="custom-control-label" for="' + item + '-switch">Buy</label>' +
				'</div>' +
			'</td>' +
			'<td>' +
				'<input type="number" class="form-control" min="1" max="100" value="10">' +
			'</td>' +
			'<td>' +
				'<input type="number" class="form-control" min="1" max="100" value="10">' +
			'</td>' +
		'</tr>';
	}

	$('#trade-table').html(tmpHTML);
}


