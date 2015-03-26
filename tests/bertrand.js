
var svg, 
	head,
	arms;



svg = d3.select('body svg');


head = svg.append('g');

head.append('circle').attr({
	cy: 250,
	cx: 250,
	r: 200
}).style('fill', 'red');


/*	
	Nose
*/
svg.append('circle').attr({
	cy: 250,
	cx: 250,
	r: 30
}).style({
	fill: "pink"
});

/*
	eyes
*/
svg.append('circle').attr({
	cy: 150,
	cx: 150,
	r: 30
}).style({
	fill: "light-blue"
});

svg.append('circle').attr({
	cy: 150,
	cx: 350,
	r: 30
}).style({
	fill: "light-blue"
});

svg.append('circle').attr({
	cy: 250,
	cx: 250,
	r: 30
}).style({
	fill: "pink"
});


/*
	Lips
*/


svg.append('rect').attr({
	x: 150,
	y: 300,
	width: 200,
	height: 10,
	r: 30, 
}).style({
	fill: "pink"
});

svg.append('rect').classed('mouth', true).attr({
	x: 150,
	y: 300,
	width: 200,
	height: 50,
	r: 30, 
}).style({
	fill: "pink"
});



svg.append('path').attr('d', "M10 10 C 20 20, 40 20, 50 10").style({
	stroke: "black",
	strokeWidth: "3px"
});


arms = svg.append('g').classed('arms', true);

arms.append('polygon').attr('points', '80,400 120,400 160,440 120,480 60,460');
arms.append('polygon').attr({
	points: '80,400 120,400 160,440 120,480 60,460',
	transform: 'translate(200) scale(-1)'
});




svg.append('text').classed('title', true).style('font-size', "30px").attr({
	fill: "red",
	x: 170,
	y: 480
}).text('Bertrand president !');




// d3.select('g').style('opacity', 0).transition().delay(1000).style('opacity', 1);


function moveArms(axe) {

	d3.select('.mouth').transition().duration(500).attr('height', (axe < 0) ? 50 : 30).ease('elastic');

	arms.transition().duration(500).attr('transform', 'translate(0 -' + ((axe > 0) ? axe : 0) + ')').ease('elastic').each('end', function () {
		moveArms(axe * -1);
	});


}

function talkBitch(axe) {

	d3.select('.title').transition().duration(500).text((axe < 0) ? "Bertrand !" : "Président !").each('end', function () {

		talkBitch(axe * -1);

	});

}


talkBitch(1);
moveArms(50);


d3.select('g')