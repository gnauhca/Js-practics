window.onload = function() {
	var pbody = document.body,
		phtml = document.getElementsByTagName('html')[0],
		to3DBtn = document.createElement('span'),
		is3DMode = false,
		mouseDown = false,
		initMouseSize = {x:0, y:0},
		initTranInfo = {rx: 0, ry:0},
		currentTranInfo = {rx: 0, ry:0},
		floor = 0,
		tranStep = 5;
		tranZ = 0;

	to3DBtn.style.position = 'fixed';
	to3DBtn.style.width = '60px';
	to3DBtn.style.height = '60px';
	to3DBtn.style.lineHeight = '60px';
	to3DBtn.style.textAlign = 'center';
	to3DBtn.style.top = '10px';
	to3DBtn.style.left = '10px';
	to3DBtn.style.color = '#fff'; 
	to3DBtn.style.zIndex = '10000000000'; 
	to3DBtn.style.borderRadius = '100%'; 
	to3DBtn.style.boxShadow = '0 0 6px #666'; 
	to3DBtn.style.background = 'rgba(100, 150, 200, 0.7)';
	to3DBtn.style.cursor = 'pointer';
	to3DBtn.innerHTML = 'To 3D';

	pbody.style.transformStyle = 'preserve-3d';
	pbody.style.transition = 'transform 1s';

	phtml.style.transition = 'background 2s';
	phtml.appendChild(to3DBtn);

	to3DBtn.onclick = function() {
		if (is3DMode) {
			to3DBtn.innerHTML = "To 3D";
			is3DMode = false;
			
			pbody.style.transform = 'rotateX(0deg) rotateY(0deg)';
			pbody.style.transition = 'transform 1s';
			setTimeout(function() {
				phtml.style.background = ''; 
				phtml.style.perspective = ''; 
				phtml.style.transformStyle = '';
				(function(elem, _floor) {
					if (typeof elem.style == 'undefined') {return;}
					var sonElems = elem.childNodes,
						floor = _floor;

					elem.style.transform = '';
					elem.style.transformStyle = '';
					for (var i = sonElems.length - 1; i >= 0; i--) {
						arguments.callee(sonElems[i], floor + 1);
					}
				})(pbody, 0);
			},1000);
		} else {
			to3DBtn.innerHTML = "Back";
			(function(elem, _floor) {
				if (elem.nodeType != 1) {return;}
				var sonElems = elem.childNodes,
					floor = _floor;

				elem.style.transform = 'translateZ(' + floor * tranStep + 'px)';
				elem.style.transformStyle = 'preserve-3d';
				for (var i = sonElems.length - 1; i >= 0; i--) {
					arguments.callee(sonElems[i], floor + 1);
				}
			})(pbody, 0);
			is3DMode = true;
			phtml.style.background = ''; 
			phtml.style.perspective = '1000px'; 
			phtml.style.transformStyle = 'preserve-3d';
			pbody.style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + -40 + 'deg)';
			initTranInfo.rx = -40;
			initTranInfo.ry = 0;
		}
	}


	document.onmousedown = function(event) {
		var event = event||window.event;
		if (is3DMode) {
			mouseDown = true;
			initMouseSize.x = event.clientX;
			initMouseSize.y = event.clientY;
			pbody.style.transition = '';
		}
	}

	document.onmousemove = function(event) {
		var event = event||window.event;

		currentTranInfo.rx = initTranInfo.rx + (event.clientX - initMouseSize.x)/5;
		currentTranInfo.ry = initTranInfo.ry + (event.clientY - initMouseSize.y)/5;
		if (is3DMode && mouseDown) {
			pbody.style.transform = 'rotateX(' + -currentTranInfo.ry + 'deg) rotateY(' + currentTranInfo.rx + 'deg)';
		}
	}

	document.onmouseup = function(event) {
		if (is3DMode) {
			mouseDown = false;
			initTranInfo.rx = currentTranInfo.rx;
			initTranInfo.ry = currentTranInfo.ry;
			pbody.style.transition = 'transform 1s';
		}
	}


};

