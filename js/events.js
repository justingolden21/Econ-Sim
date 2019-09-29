const SEASON_LENGTH = 9000; // ticks
const YEAR_LENGTH = SEASON_LENGTH*4;
const MAX_SHORT_EVENT_LENGTH = 600;

// inventory numbers are plus or minus in percentage yielded
const SEASONS = {
	'winter': {
		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'spring': {
		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'summer': {
		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'fall': {
		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	}
};

// frequency is odds event occurs relative to other events
const YEAR_EVENTS = {
	'rename this': {
		'frequency': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'rename this': {
		'frequency': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'rename this': {
		'frequency': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	}
};

// length is durration of event, percentage of max short event length
const SHORT_EVENTS = {
	'rename this': {
		'frequency': 0,
		'length': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'rename this': {
		'frequency': 0,
		'length': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	},
	'rename this': {
		'frequency': 0,
		'length': 0,

		'money' : 0,
		'bread' : 0,
		'ore'   : 0,
		'lumber': 0,
		'metal' : 0,
		'wheat' : 0,
		'flour' : 0,
		'tools' : 0
	}
};