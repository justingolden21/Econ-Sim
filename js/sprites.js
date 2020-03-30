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

function getSprite(name, size='sm') {
	return '<img class="icon-' + size + '" src="img/icons/' + icons[name] + '.png">';
}