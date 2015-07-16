ngGetTweets.directive('wordCloud', function($parse, $window){
   return{
      restrict:'EA',
      template:"<center><svg width='960px' height='960px'></svg></center>",
       link: function(scope, elem, attrs){
           var exp = $parse(attrs.cloudData);

           var wordsToPlot=exp(scope);
           var d3 = $window.d3;
           var fill = d3.scale.category20();
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);
            //what range of font sizes do we want, we will scale the word counts
           var fontSize = d3.scale.log().range([10, 90]);
        
            //create my cloud object
            var mycloud = d3.layout.cloud().size([960,960])
                  .words([])
                  .padding(2)
                  .rotate(function() { return ~~(Math.random() * 2) * 90; })
                  // .rotate(function() { return 0; })
                  .font("Impact")
                  .fontSize(20)
                  //.fontSize(function(d) { return fontSize(d.size); })
                  .on("end", draw)
        
            //render the cloud with animations
             function draw(words) {
                //fade existing tag cloud out
                //d3.select("body").selectAll("svg").selectAll("g")
                svg.selectAll("g")
                    .transition()
                        .duration(1000)
                        .style("opacity", 1e-6)
                        .remove();
        
                //render new tag cloud
                //d3.select("body").select("svg")
                svg
                    .attr("width", mycloud.size()[0])
                    .attr("height", mycloud.size()[1])
                    .append("g")
                         .attr("transform","translate(" + mycloud.size()[0] / 2 + "," + mycloud.size()[1] / 2 + ")")
                        .selectAll("text")
                        .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return ((d.size)* 1) + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .style("opacity", 1e-6)
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                    .transition()
                    .duration(1000)
                    .style("opacity", 1)
                    .text(function(d) { return d.text; });
              }
            //create SVG container
/*            d3.select("body").append("svg")
                .attr("width", 500)
                .attr("height", 500);
    */
            //to update cloud
           scope.$watch(exp, function(newVal, oldVal){
                //debugger;
                console.log('watchCollection')
                var temp=[]
                if (newVal !== undefined){
                    /*newVal.forEach(function(d){
                        temp.push({text: d, size:20})
                    })*/
                    console.log(temp);
                    mycloud.stop().words(newVal.map(function(d){return {text: d, size:20}})).start();     
                }
                console.log(newVal)

           },true);
           //render first cloud
           mycloud.start()
        }
   };
});