$( ()=> {
	let tmpHTML = '';
	for(resource of RESOURCE_TYPES) {
		tmpHTML +=
			'<div class="custom-control custom-checkbox custom-control-inline">'
		+		'<div class="custom-control custom-checkbox">'
		+			'<input type="checkbox" class="custom-control-input" id="'+resource+'-check" checked>'
		+			'<label class="custom-control-label" for="'+resource+'-check">'+capitalize(resource)+'</label>'
		+		'</div>'
		+	'</div>';
	}
	$('#chart-checkbox-div').append(tmpHTML);
});