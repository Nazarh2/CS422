
var mokhtasat = function(x, y) {
	
	this.x = x;

	this.y = y;

	this.jam = function(mokht2) {

		var temp = new mokhtasat(this.x + mokht2.x, this.y + mokht2.y);

		return temp;
	}

	this.tafrigh = function(mokht) {

		var temp1 = new mokhtasat(this.x - mokht.x, this.y - mokht.y);

		return temp1;
	}

	this.zarb = function(num) {

		var temp2 = new mokhtasat(this.x * num, this.y * num);

		return temp2;
	}

	this.normalkardan = function() {

		var temp3 = Math.sqrt(this.x * this.x + this.y * this.y);

		return temp3
	}
	
	this.ismosavi = function(mokht) {

		var temp4 = (this.x === mokht.x && this.y === mokht.y);

		return temp4;
	}

}

// var canvas = document.createElement('exp_canvas');
// canvas.id = "CursorLayer";
// canvas.width = 1224;
// canvas.height = 768;
// var body = document.getElementsByTagName("body")[0];
// body.appendChild(canvas);
// cursorLayer = document.getElementById("CursorLayer");


var dayere = function(mokht, w, hadaf) {
	this.mokht = mokht;
	this.w = w/2;
	this.hadaf = hadaf;
}


var canv = document.getElementById('exp_canvas');
var canv2 = document.getElementById('cursor');

canv.width = 1200;
canv.height = 500;
canv2.width = 1200;
canv2.height = 500;

var width = 1200;
var height = 500;




var check = function(mokht, w) {
	
	if ((w <= mokht.x) && (mokht.x <= (width - w)) && (w <= mokht.y) && (mokht.y <= height - w)) {
	
		return true;

	} else {
		
		return false;	}}

var mokhtasat_random = function() {
	var myvar = new mokhtasat(Math.random() * width, Math.random() * height);
	return myvar;
}


var check_mokhtasat = function(mokhtasate, myinput1, myinput2) {
	var fasele = myinput1 * myinput2 * 3 / Math.sqrt(2);
	return ((mokhtasate.x > fasele) && (mokhtasate.x < (width - fasele)) && (mokhtasate.y > fasele) && (mokhtasate.y < (height - fasele)))
}





var mainmap = function(vorodiasli, mokhtasate, D, w, eww) {
	var squareLength = w * eww;
	var angle = Math.atan2(mokhtasate.y - vorodiasli.y, mokhtasate.x - vorodiasli.x)
	var vec1 = new mokhtasat(squareLength * Math.cos(angle), 
										 squareLength * Math.sin(angle));
	var vec2 = new mokhtasat(squareLength * Math.cos(angle + Math.PI/2),
										 squareLength * Math.sin(angle + Math.PI/2));
	this.dayeres = [];
	this.grid = [];
	this.cursorRadius = 5;

	this.layebandi = function(layeh) {

		var mokhtsibleGrid = [];

		var sidesakhtan = function(mokht, vec, num) {
			var middlemokhtasat = mokhtasate.jam(mokht);
			for (var i = - num + 1; i <= num - 1; i++) {
				var p = middlemokhtasat.jam(vec.zarb(i));
				mokhtsibleGrid.push(p);
			}
		}

		sidesakhtan(vec1.zarb(layeh), vec2, layeh);
		sidesakhtan(vec1.zarb(-layeh), vec2, layeh);
		sidesakhtan(vec2.zarb(layeh), vec1, layeh);
		sidesakhtan(vec2.zarb(-layeh), vec1, layeh);

		mokhtsibleGrid.push(mokhtasate.jam(vec1.zarb(layeh)).jam(vec2.zarb(layeh)));
		mokhtsibleGrid.push(mokhtasate.jam(vec1.zarb(layeh)).jam(vec2.zarb(-layeh)));
		mokhtsibleGrid.push(mokhtasate.jam(vec1.zarb(-layeh)).jam(vec2.zarb(layeh)));
		mokhtsibleGrid.push(mokhtasate.jam(vec1.zarb(-layeh)).jam(vec2.zarb(-layeh)));

		return mokhtsibleGrid;
	}

	this.barresi = function(mokhtsibleGrid) 	{
		for (var i = 0; i < mokhtsibleGrid.length; i++) {
			if (check(mokhtsibleGrid[i], w)) {
				notFullyExceed = true;
				this.grid.push(mokhtsibleGrid[i]);
										    }
													  }
												}

	this.mokhtasat_random = function(mokht) {
		var ran1 = (eww - 1) / eww * (2 * Math.random() - 1) / 2;
		var ran2 = (eww - 1) / eww * (2 * Math.random() - 1) / 2;
		var ans = mokht.jam(vec1.zarb(ran1)).jam(vec2.zarb(ran2));

		return ans;	}

	this.jam_dayere = function() {
		for (var i = 0; i < this.grid.length; i++) {
			if (this.grid[i].ismosavi(mokhtasate)) {
				var canvasdayere = new dayere(this.grid[i], w, true);
				this.dayeres.push(canvasdayere);
			} else if (Math.abs(this.grid[i].tafrigh(mokhtasate).normalkardan() - squareLength) < 0.00001) {
				var canvasdayere = new dayere(this.grid[i], w, false);
				this.dayeres.push(canvasdayere);
			} else if (D !== 0 && Math.random() <= D) {
				var newmokhtasat = this.mokhtasat_random(this.grid[i]);
				if (check(newmokhtasat, w)) {
					var canvasdayere = new dayere(newmokhtasat, w, false);
					this.dayeres.push(canvasdayere);
				}
			}
		}
	}

	


	this.grid.push(mokhtasate);
	var layeh = 1;
	var notFullyExceed = true;
	while (notFullyExceed) {
		notFullyExceed = false;
		var mokhtsibleGrid = this.layebandi(layeh);
		this.barresi(mokhtsibleGrid);
		layeh += 1;
	}


	this.jam_dayere();




}

var ghatifunc = function(array) {
	var currentIndex = array.length, temporaryValue, valueIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}




var testkardan = function(A, w, eww, D) {
	this.A = A;
	this.w = w;
	this.eww = eww;
	this.D = D;
	this.tarkib = [];
	this.Aseries = this.A.concat(this.A).concat(this.A);
	this.test_state = [];

	for (var i = 0; i < this.w.length; i++) {
		for (var j = 0; j < this.eww.length; j++) {
			for (var k = 0; k < this.D.length; k++) {
				this.tarkib.push([this.w[i], this.eww[j], this.D[k]])
			}
		}
	}

	for (var i = 0; i < this.tarkib.length; i++) {
		this.Aseries = ghatifunc(this.Aseries);
		var subTests = [];
		for (var j = 0; j < this.Aseries.length; j++) {
			subTests.push([this.tarkib[i][0], this.tarkib[i][1], 
				this.tarkib[i][2], this.Aseries[j]]);
		}
		this.test_state.push(subTests);
	}
}

var row;
var naghsheh;
var curTime;

$(document).ready(function() {
	

	var conversionRate = 0.8;
	var A = [256 * conversionRate, 384 * conversionRate, 512 * conversionRate];
	var w = [16 * conversionRate, 24 * conversionRate, 32 * conversionRate];
	var eww = [1.33, 2, 3];
	var D = [0, 0.5, 1];
	var myarr = [];
	var canvas = document.getElementById('exp_canvas');
	var ctx = canvas.getContext('2d');
	var cursorCanvas = document.getElementById('cursor');
	var cursorCtx = cursorCanvas.getContext('2d');
	cursorCtx.globalAlpha = 0.2;
	cursorCtx.fillStyle = 'red';
	


var pointer_khas = function() {
	
	this.radian = 5;


	this.update = function(mokht) {

		if ((naghsheh) && (naghsheh.dayeres.length !== 0)) {
			var indexCloset = 0; 
			var indexSecClosest = 0;
			var closestDistance = Math.sqrt(width * width + height * height);
			var secondClosestDis = closestDistance

			for (var index = 0; index < naghsheh.dayeres.length; index++) { 
				var dis = mokht.tafrigh(naghsheh.dayeres[index].mokht).normalkardan();
				if ( dis <= secondClosestDis && closestDistance < dis) {
					secondClosestDis = dis;
					indexSecClosest = index;
				} else if (dis <= closestDistance) {
					secondClosestDis = closestDistance;
					indexSecClosest = indexCloset;
					indexCloset = index;
					closestDistance = dis;
					this.captureddayere = naghsheh.dayeres[index];
				}

				var ConD = closestDistance + this.captureddayere.w;
				var IntD = secondClosestDis - this.captureddayere.w;

				this.radian = Math.min(ConD, IntD);

			}
		}
	}
}

var sakhtemokhtas = function(vorodiasli, ranA, myinput1, myinput2) {
	var randomAngle = Math.PI * (2 * Math.random() - 1);
	var mokhtasate = vorodiasli.jam(new mokhtasat(ranA * Math.cos(randomAngle), ranA * Math.sin(randomAngle)));
	var qualified = check_mokhtasat(mokhtasate, myinput1, myinput2);
	while (!qualified) {
		randomAngle = Math.PI * (2 * Math.random() - 1);
		mokhtasate = vorodiasli.jam(new mokhtasat(ranA * Math.cos(randomAngle), ranA * Math.sin(randomAngle)));
		qualified = check_mokhtasat(mokhtasate, myinput1, myinput2);
		
	}
	return mokhtasate;
}



	var cursor = 'Normal';
	var bubbleCursor = new pointer_khas();

	$("input[name='cursorMode']").click(function(e) {
		cursor = $("input[name='cursorMode']:checked").val();
		if (cursor === 'Bubble') {
			$("#exp_canvas").css('cursor', 'none');
			$("#cursor").css('cursor', 'none');
		}
		if ((cursor === 'Normal') && ($("#exp_canvas").css('cursor') === 'none')) {
			$("#exp_canvas").css('cursor', '');
			$("#cursor").css('cursor', '');
		}
	});



	

	var dayere_rasm = function(naghsheh) {
		for (var i = 0; i < naghsheh.dayeres.length; i++) {
			var dayere = naghsheh.dayeres[i];
			ctx.beginPath();
			ctx.arc(dayere.mokht.x, dayere.mokht.y, dayere.w, 0, 2 * Math.PI, false);
			if (dayere.hadaf) {
				ctx.fillStyle = '#048046';
				ctx.fill();
			} else {
				ctx.strokeStyle = '#CCC';
				ctx.lineWidth = 3;
				ctx.stroke();
			}
		}
	}

	var state = function(clickmokhtasat, mokhtasate, myinput1) {
		if (cursor === 'Normal') {
			
			return (clickmokhtasat.tafrigh(mokhtasate).normalkardan() < myinput1 / 2);
		} else if (cursor === 'Bubble') {
		
			bubbleCursor.update(clickmokhtasat);
			return bubbleCursor.captureddayere.mokht.ismosavi(mokhtasate);
		} else {
			return false;
		}
	}

	var drawpointer_khas = function(e) {
		var x = e.pageX - canvas.offsetLeft - 2;
		var y = e.pageY - canvas.offsetTop - 2;
		var bubbleCursormokhtasat = new mokhtasat(x, y);
		if (check(bubbleCursormokhtasat, 0)) {
			cursorCtx.clearRect(0, 0, width, height);
			bubbleCursor.update(bubbleCursormokhtasat);
			cursorCtx.beginPath();
			cursorCtx.arc(x, y, bubbleCursor.radian, 2 * Math.PI, false);
			cursorCtx.fill();
			if ((bubbleCursormokhtasat.tafrigh(bubbleCursor.captureddayere.mokht).normalkardan() + bubbleCursor.captureddayere.w) > bubbleCursor.radian) {
				cursorCtx.beginPath();
				cursorCtx.arc(bubbleCursor.captureddayere.mokht.x, bubbleCursor.captureddayere.mokht.y, bubbleCursor.captureddayere.w + 3, 2 * Math.PI, false);
				cursorCtx.fill();
			}
		}
	}

	

	$("#strbtn").click(function(e) {
		myarr = [];
		$("#report").html("  <div class='green'> Click The Green"
			+ " dayere</div>");
		$("#strbtn").attr({'disabled': 'disabled'});


		var testBlock = new testkardan(A, w, eww, D);
		var mokhtasate = new mokhtasat(width / 2, height / 2);
		var vorodiasli = new mokhtasat(width / 2, 0)
		naghsheh = new mainmap(vorodiasli, mokhtasate, 0, w[2], eww[1]);
		var curRadius = w[2] / 2;
		dayere_rasm(naghsheh);

		var majmoeasli = testBlock.test_state.length;
		
		var zirmajmoe = testBlock.test_state[0].length;

		clickfunc = function(e) {
			
			var x = e.pageX - canvas.offsetLeft - 2;
			var y = e.pageY - canvas.offsetTop - 2;

			var clickmokhtasat = new mokhtasat(x, y);
			if (state(clickmokhtasat, mokhtasate, 2 * curRadius)) {

				var A = testBlock.test_state[majmoeasli - 1][zirmajmoe - 1][3];
				var W = testBlock.test_state[majmoeasli - 1][zirmajmoe - 1][0];
				var EW_W = testBlock.test_state[majmoeasli - 1][zirmajmoe - 1][1];
				var D = testBlock.test_state[majmoeasli - 1][zirmajmoe - 1][2];

				vorodiasli = clickmokhtasat;
				mokhtasate = sakhtemokhtas(vorodiasli, A, W, EW_W);
				naghsheh = new mainmap(vorodiasli, mokhtasate, D, W, EW_W);
				ctx.clearRect(0, 0, width, height);
				dayere_rasm(naghsheh);
				curRadius = W / 2;

				if ( myarr.length === 0 ) {
					row = 0;
					curTime = new Date().getTime() / 1000;
		
				} else {
					
					myarr[row - 1]['clickTime'] = new Date().getTime() / 1000 - curTime;
					curTime = new Date().getTime() / 1000;
			
				}

				myarr[row] = {'Amplitude': A, 'width': W, 'EW/W': EW_W, 'D': D};
				
				row += 1;
			
				$("#report").html("test block:" + (testBlock.test_state.length - majmoeasli + 1)
					+ "/" + testBlock.test_state.length + "<br >test number: " + (testBlock.test_state[0].length - zirmajmoe + 1)
					+ "/" + testBlock.test_state[0].length );
				var temp = ((testBlock.test_state.length - majmoeasli)*testBlock.test_state[0].length + testBlock.test_state[0].length - zirmajmoe)*100/(testBlock.test_state.length*testBlock.test_state[0].length)

				$("#myprogress").html(" <div class='progress' style='background-color: #2e789c !important;'><div class='progress-bar' style='width:"+temp+"%'>"+temp+"%</div></div>");
				zirmajmoe -= 1;
				
				if (zirmajmoe === 0) {
					zirmajmoe = testBlock.test_state[0].length;
					majmoeasli -= 1;
					if (majmoeasli === 0) {
						$(document).off(handlers);
						ctx.clearRect(0, 0, width, height);
						$("#report").html("Thanks for your contribution");
						$("#downloadbtn").removeAttr('disabled');
						$(".hidden").show();
					}
				}
			}
		}

		if (cursor === 'Bubble') {
			handlers = {click: clickfunc, mousemove: drawpointer_khas};
		}



		if (cursor === 'Normal') {
			handlers = {click: clickfunc};
		}
		


		$(document).on(handlers);
	});

var CSVfunc = function(data, reportTitle) {
	var CSV = '';
	CSV += reportTitle + '\r\n\n'

	var row = '';
	for (var index in data[0]) {
		row += index + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	for (var i = 0; i < data.length - 1; i++) {
		var row = '';
		for (var index in data[i]) {
			row += data[i][index] + ',';
		}
		row = row.slice(0, -1);
		CSV += row + '\r\n';
	}
	return CSV;
}



	$("#downloadbtn").click(function(e) {
		if ($("#exp_report").val() === "") {
			$("#report").html("Please put in your name and save your data file");
		} else {
			$("#report").html("Please select the Cursor Mode");
			$("input[type=radio]").attr('disabled', false);

			var mode = $("input[name='cursorMode']:checked").val();
	
			var CSV = CSVfunc(myarr, mode);
			var exp_report = $("#exp_report").val() + '_' + mode;
			exp_report = exp_report.split(' ').join('_');

			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
			var link = document.createElement('a');
			link.href = uri;
			link.style = 'visibility: hidden';
			link.download = exp_report + '.csv';

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	});




})