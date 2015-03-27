'use strict';

d3.json('json/villes.json', function (err, villes) {

    var villesPop = villes.map(function (v) {
        return v.population; 
    });

    d3.select('svg')
        .style({
            width: "100%"
        })
        .selectAll('g.ville')
        .data(villes)
        .enter()
        .append('g')
        .classed('ville', true);


    /*
        On prend toute les clés sauf le nom
        ---
        ['population', 'superficie', 'rang']
    */
    var criterias = d3.keys(villes[0]).filter(function (k) {
         return k !== "nom";
    });
    

    var scales = {},
        sizeScales = {};

    criterias.forEach(function (criteriaName) {
        var domain = d3.extent(villes.map(function (v) {
            return v[criteriaName];
        }));
        scales[criteriaName] = d3.scale.linear().domain(domain).range([10, 50]);
        sizeScales[criteriaName] = d3.scale.linear().domain(domain).range([0, 100]);
    });

    var scale = scales.population;
    var sizeScale = sizeScales.population;
    var svgWidth = parseInt(d3.select('svg').style('width')),
        itemWidth = parseInt(svgWidth / villesPop.length);

    console.log(svgWidth, villesPop.length, itemWidth);

    d3.selectAll('svg .ville')
        .append('line')
        .attr('x1', function (d, i) {
            return Math.floor((itemWidth / 2) + (itemWidth * i));
        })
        .attr('y1', function (d, i) {
            return 200;
        })
        .attr('y2', function (d, i) {
            return 200;
        })
        .attr('x2', function (d, i) {
            return Math.floor((itemWidth / 2) + (itemWidth * i));
        })
        .attr('stroke', 'blue')
        .attr('stroke-width', '2px')
        .transition()
        .delay(function (d, i) {
            return 200 + (i * 150);
        })
        .duration(1000)
        .attr('y2', function (d, i) {
            return 100 - sizeScale(d.population);
        })
        .ease('elastic');


    d3.selectAll('svg .ville')
        .append('circle')
        .attr('cx', function (d, i) {
            return Math.floor((itemWidth / 2) + (itemWidth * i));
        })
        .attr('cy', function (d, i) {
            return 200;
        })
        .attr('r', function (d, i) {
            return 0;
        })
        .style({
            fill: '#FFDDDD',
        })
        .transition()
        .delay(function (d, i) {
            return 100 + (i * 150);
        })
        .duration(2000)
        .attr('r', function (d, i) {
            return scale(d.population);
        })
        .style({
            fill: 'blue'
        })
        .ease('elastic')


    d3.selectAll('svg .ville')
        .append('text')
        .style('text-anchor', 'middle')
        .attr('x', function (d, i) {
            return Math.floor((itemWidth/2) + (itemWidth * i));
        })
        .attr('y', 300)
        .attr('width', itemWidth)
        .html(function (ville) {
             return ville.nom;
        });


    var changeCriterias = function (criteriaName) {
      
        d3.selectAll('svg circle')
            .transition()
            .attr('r', function (d, i) {
                return scales[criteriaName](d[criteriaName]);
            });

        d3.selectAll('svg line')
            .transition()
            .delay(function (d, i) {
                return 200;
            })
            .attr('y2', function (d, i) {
                return 100 - scales[criteriaName](d[criteriaName]);
            })
        
    };


    function showDetails(ville) {
      
        console.log(ville);

        d3.selectAll('#details td.data')
            .data(d3.values(ville))
            .html(function (d) {
                return d; 
            });

    };


    d3.text('partials/detail.html', function (data) {
       
        d3.select('#details').html(data);
        
    });
    
    d3.selectAll('circle')
        .on('click', function (d) {
            showDetails(d);
        })
        .on('mouseover', function (d) {
           
            d3.select(this)
                .transition()
                .duration(200)
                .style('fill', 'pink');
               
        })
        .on('mouseleave', function (d) {

            d3.select(this)
                .transition()
                .duration(200)
                .style('fill', 'blue');
        })


    criterias.forEach(function (criteriaName) {

        d3.select('#buttons')
            .append('button')
            .text(criteriaName)
            .on('click', function () {
                changeCriterias(criteriaName);
            });

    });

});

