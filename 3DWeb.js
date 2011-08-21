/**
 * @author Carl Lange
 */

var body;
var arr = new Array();
function ThreeDWeb(){
	addEventListener( "mousedown", onMouseDown );
	addEventListener( "mousemove", onMouseMove );
	addEventListener( "mouseup", onMouseUp );
	addEventListener( "keypress", onKeyPress)
	
	body = new Sprite3D(document.body)
			.update();
	
	traverse(document.body);
	
	for (sp in arr){
		arr[sp].update();
	}
}

var z = 100;
function traverse(element){
	if (element.tagName == 'DIV'){
		arr.push(new Sprite3D(element)
			.setSize(element.clientWidth, element.clientHeight)
			.setX(element.offsetLeft)
			.setY(element.offsetTop)
			.setZ(z))
			
		z+=100;
	}
	
	if(!element.firstChild) z = 100;
	
	for (var i = element.children.length-1; i >= 0; i--){ traverse(element.children[i])} //backwards because of position:static and position:relative
}

/**
 * Interaction things!
 */

var enabled = false,
	mDown = false,
	mx,
	my;

function onKeyPress(event){
	if (event.which == 51){ //3
		if (enabled == false) {enabled = true}
		else {enabled = false}
	}
}

function onMouseDown( event ) {
	if (enabled){
		mDown = true;
		mx = event.pageX;
		my = event.pageY;
		event.preventDefault();
	}
}

function onMouseMove( event ) {
	if (enabled) {if ( mDown )
	{
		var nx = event.pageX, ny = event.pageY;
		rotateContainer( nx - mx, ny - my );
		mx = nx;
		my = ny;
		event.preventDefault();
	}
}
}

function onMouseUp( event ) {
	if (enabled){
	mDown = false;
	event.preventDefault();
	}
}

function rotateContainer( v, w ) {
	body.rotate( -w*0.2, v *.2, 0 ).update();
}