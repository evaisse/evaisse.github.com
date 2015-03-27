'use strict';


var dsv = d3.dsv(";", "text/plain");

dsv('csv/liste_des_prenoms_2004_a_2012.csv', function (data) {


    console.log(data[0]);

    var histo = d3.layout.histogram(),
        years = {};

    data.forEach(function (d) {
        years[d.annee] = years[d.annee] === undefined ? 0 : years[d.annee];
        years[d.annee]++;
    });

    console.log('Years', years);

    var values = d3.range(1000).map(d3.random.bates(10));
    console.log(values);

    // A formatter for counts.
    var formatCount = d3.format(",.0f");

    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain(d3.extent(d3.keys(years)))
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(d3.values(years))])
        .range([height, 0]);


    // Generate a histogram using twenty uniformly-spaced bins.
    var data = d3.layout.histogram()
        .bins(d3.values(years).length)(data.map(function (d) { 
            return d.annee; 
        }));


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
        .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { 
                console.log(d);
                return "translate(" + x(d.x) + "," + y(d.y) + ")"; 
            });

    bar.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 20) // x(data[0].dx) - 1)
        .attr("height", function(d, i) { 
            return height - y(d3.values(years)[i]); 
        });
    
    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", x(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) { 
            console.log(d);
            return d.annee; 
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

});