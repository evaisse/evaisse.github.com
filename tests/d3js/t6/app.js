'use strict';


var axisDef = {
    'x': 'day',
    'y': 'median',
};




d3.csv('csv/ventes.csv', function (data) {

    data = data.map(function (d) {
        var i = {};
        Object.keys(d).forEach(function (k) {
            i[k] = parseInt(d[k], 10);
        });
        return i;
    });

    console.log(data);
    
    var scales = {},
        axis = {},
        domains = {},
        axisData = {};

    /*
        Build chart struct
    */

    axisData.x = data.map(function (d) {
        return d[axisDef.x];
    });
    axisData.y = data.map(function (d) {
        return d[axisDef.y];
    });

    domains.x = [0, 8];
    domains.y = [2000, 0];

    ['y', 'x'].forEach(function (n) {

        var d = axisDef[n];

        scales[n] = d3.scale.linear().domain(domains[n]).range([0, 500]);
        axis[n] = d3.svg.axis().scale(scales[n]).orient(n == "x" ? 'bottom' : "right").tickSize(-500, -500).tickPadding(20);

        if (n == "x") {
           axis.x.tickValues([1, 2, 3, 4, 5, 6, 7]);
        } else {

        }
        
        d3.select('svg')
            .append('g')
            .classed(n + '-axis', true)
            .attr('transform', 'translate(' + ((n == "x") ? "100 600" : "600 100") + ')')
            .call(axis[n]);


    });


    /*
        Make composant
    */
    var buildBoxPlot = function () {


        d3.select(this)
            .append('rect')
            .classed('quarter', true)
            .attr({
                x: -10,
                width: 20
            })
            .attr('y', function (d) {
                return scales.y(d.q3) - scales.y(d.median);
            })
            .attr('height', function (d) {
                return scales.y(d.q1) - scales.y(d.q3);
            });

        d3.select(this)
          .append('line')
          .classed('median', true)
          .attr({
              x1: -10,
              y1: 0,
              x2: 10,
              y2: 0,
          });


    };

    /*

    d3.select('svg')
        .append('g').classed('points', true)
        .selectAll('g.box-plot')
        .data(data)
        .enter()
        .append('g').classed('box-plot', true)
        .each(buildBoxPlot)
        .attr('transform', function (d) {
            var x, y;

            x = scales.x(d[axisDef.x]) + 100;
            y = scales.y(d[axisDef.y]) + 100;

            return 'translate(' + x + ' ' + y + ')';
        });

    var medianLineGenerator = d3.svg.line()
        .x(function (d) {
            return scales.x(d.day) + 100;
        })  
        .y(function (d) {
            return scales.y(d.median) + 100;
        })
        .interpolate("step");

    d3.select('svg')
        .append('path')
        .classed('median-line', true)
        .attr('d', medianLineGenerator(data));

    */
    

    /*
    var arc = d3.svg.arc()
                .outerRadius(100)
                .innerRadius(20)
                .startAngle(0)
                .endAngle(0.75 * Math.PI);



    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(100,100)')
        .append("path")
        .attr('d', arc);
    */





    /*

    var symbol = d3.svg.symbol().type('diamond');


    d3.select('svg')
        .selectAll('.diamond')
        .data(data)
        .enter()
            .append('path')
            .attr('d', symbol)
            .classed('diamond', true)
            .attr('transform', function (d) {
                    var x, y;
                x = scales.x(d.day) + 100;
                y = scales.y(d.median) + 100;
                return "translate(" + x + ' ' + y + ")";
            });
    */

    var histoChart = d3.layout.histogram();

    histoChart.bins(3).value(function (d) {
        return d.min;
    });

    var histoData = histoChart(data);


    window.histoData = histoData;

});