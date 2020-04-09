const SEASON_LENGTH = 9000; // ticks season length also changes depending on location, in some places summer is longer, some shorter etc.
const YEAR_LENGTH = SEASON_LENGTH*4;
const MAX_SHORT_EVENT_LENGTH = 600;

function findEvent() {
  
  
}

function eventAffect(firm) {
  
}

// inventory numbers are plus or minus in percentage yielded
const SEASONS = {
	'winter': {
	   'money' : 1.1,
		'bread' : 1,
		'ore'   : 1.1,
		'lumber': .9,
		'metal' : 1.2,
		'wheat' : -.5,
		'flour' : 1,
		'tools' : 1
	},
	'spring': {
		'money' : 1,
		'bread' : 1,
		'ore'   : 1,
		'lumber': 1.2,
		'metal' : 1,
		'wheat' : 1,
		'flour' : 1,
		'tools' : 1
	},
	'summer': {
		'money' : .9,
		'bread' : 1,
		'ore'   : .8,
		'lumber': 1.1,
		'metal' : 1,
		'wheat' : 2,
		'flour' : 1,
		'tools' : 1
	},
	'fall': {
		'money' : 1,
		'bread' : 1,
		'ore'   : 1.1,
		'lumber': 1,
		'metal' : 1.1,
		'wheat' : 1,
		'flour' : 1,
		'tools' : 1.1
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