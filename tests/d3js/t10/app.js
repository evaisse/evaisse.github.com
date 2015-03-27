'use strict';



d3.json('geojson/regions.geojson', function(regions) {
    
    d3.json('json/villes.json', function(communes) {
        
        var population = [["Alsace", "1 622 810", "1 732 588", "1 861 020"], ["Aquitaine", "2 795 610", "2 906 748", "3 303 392"], ["Auvergne", "1 321 761", "1 309 374", "1 355 630"], 
        ["Basse-Normandie", "1 390 890", "1 421 947", "1 479 242"], ["Bourgogne", "1 609 399", "1 610 833", "1 643 931"], ["Bretagne", "2 794 317", "2 904 075", "3 259 659"], 
        ["Centre", "2 369 808", "2 440 295", "2 572 931"], ["Champagne-Ardenne", "1 346 963", "1 343 266", "1 333 497"], ["Corse", "249 645", "260 152", "322 120"], 
        ["Franche-Comté", "1 096 427", "1 117 253", "1 177 906"], 
        ["Haute-Normandie", "1 735 969", "1 780 502", "1 848 102"], ["Île-de-France", "10 644 665", "10 946 012", "11 978 363"], ["Languedoc-Roussillon", "2 115 168", "2 292 405", "2 727 286"], 
        ["Limousin", "723 460", "711 471", "741 047"], ["Lorraine", "2 304 291", "2 311 655", "2 350 657"], 
            ["Midi-Pyrénées", "2 431 081", "2 550 275", "2 946 507"], ["Nord-Pas-de-Calais", "3 961 703", "3 997 467", "4 052 156"], ["Pays de la Loire", "3 055 197", "3 219 960", "3 658 351"], 
            ["Picardie", "1 808 968", "1 857 981", "1 924 737"], ["Poitou-Charentes", "1 595 217", "1 639 735", "1 792 159"], ["Provence-Alpes-Côte d’Azur", "4 257 244", "4 502 385", "4 937 445"], 
            ["Rhône-Alpes", "5 346 407", "5 640 234", "6 393 470"]];
        
        var regPop = {};

        population.forEach(function (r) {
            regPop[simplify(r[0])] = parseInt(r[1].replace(/\s/g, ''), 10);
        });

        function simplify(str) {
            return str.toLowerCase().replace(/[^a-z]/g, '');
        }

        var colorScale = d3.scale.linear().domain(d3.extent(d3.values(regPop))).range(['white', 'black']);

        console.log(regPop, d3.extent(d3.values(regPop)));

        window.projection = d3.geo.mercator()
        .scale(3000)
        .center([2.7878, 47.6700]);
        
        window.geoPath = d3.geo.path().projection(projection);
        
        
        
        
        d3.select('svg')
        .append('g')
        .classed('map', true)
        .selectAll('path')
        .data(regions.features)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .style('fill', function (d) {
            // console.log(d);
            var pop = regPop[simplify(d.properties.nom)];
            return pop ? colorScale(pop) : 0;
        })
        .attr('class', function(d) {
            console.log(d);
            return d;
        })
        .classed('region');
        
        
        
        
        console.log(communes);
        
        d3.select('svg')
        .selectAll('.ville')
        .data(communes)
        .enter()
        .append('circle')
        .classed('ville', true)
        .attr('cx', function(d) {
            //console.log(d);
            return projection([d.x, d.y])[0];
        })
        .attr('cy', function(d) {
            return projection([d.x, d.y])[1];
        })
        .attr('r', 20);
    


        var zoomHandler = function () {
            

            var tranformation = "translate("
                        + d3.event.translate.join(' ') + ") scale(" + d3.event.scale + ")";

            console.log('zoom handler', d3.event.translate, d3.event.scale, tranformation);
            d3.select('svg')
                .selectAll('.map')
                .attr('transform', tranformation);
        };

        var zoomListener = d3.behavior.zoom().on('zoom', zoomHandler);

        zoomListener(d3.select('svg'));

    });

});
