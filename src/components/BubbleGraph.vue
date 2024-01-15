<script>
import BubbleComponent from "./BubbleComponent.vue";
import * as d3 from "d3";

export default {
  name: "BubbleGraph",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BubbleComponent,
  },
  props: {
    bubblesProps: [
      Array,
      {
        value: Number,
        text: String,
      },
    ],
  },

  mounted() {
    console.log(this.bubblesProps);
    const data = this.bubblesProps;

    let acc = 0;
    // set the dimensions and margins of the graph
    var width = 300;
    var height = 500;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz_")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Size scale for countries
    var size = d3.scaleLinear().domain([0, 100]).range([7, 55]); // circle will be between 7 and 55 px wide
    var repart = d3
      .scalePow()
      .exponent(1)
      .domain([0, data.length])
      .range([0, height]);

    // Initialize the circle: all located at the center of the svg area
    var node = svg.append("g").selectAll("circle").data(data).enter();

    var circle = node
      .append("circle")
      .attr("class", "node")
      .attr("r", function () {
        return size(50);
      })
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function () {
        return "#D1D1D1";
      })
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .call(
        d3
          .drag() // call specific function when circle is dragged
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    var text = node
      .append("text")
      .text((d) => d.text)
      .attr("x", width / 2)
      .attr("y", height / 2)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", "10pt")
      .style("fill", "black");

    // Features of the forces applied to the nodes:
    var simulation = d3
      .forceSimulation()
      .force(
        "x",
        d3
          .forceX()
          .strength(0.1)
          .x(width / 2)
      )
      .force(
        "y",
        d3
          .forceY()
          .strength(0.1)
          .y(function () {
            acc = acc + 1;
            return (repart(acc) * height) / repart(data.length);
          })
      )
      .force("charge", d3.forceManyBody().strength(100)) // Nodes are attracted one each other of scale * 1000000 is > 0
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(1)
          .radius(function () {
            return size(50);
          })
          .iterations(1)
      ); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' scale * 1000000 is low enough), simulations will stop.
    simulation.nodes(data).on("tick", function () {
      circle
        .attr("cx", function (d) {
          return (d.x = Math.max(55, Math.min(width - 55, d.x)));
        })
        .attr("cy", function (d) {
          return (d.y = Math.max(55, Math.min(height - 55, d.y)));
        });
      text
        .attr("x", function (d) {
          return (d.x = Math.max(55, Math.min(width - 55, d.x)));
        })
        .attr("y", function (d) {
          return (d.y = Math.max(55, Math.min(height - 55, d.y)));
        });
    });

    // What happens when a circle is dragged?
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3);
      d.fx = null;
      d.fy = null;
    }
  },
};
</script>

<template>
  <div class="container">
    <div id="my_dataviz"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.heavy {
  font: bold 30px sans-serif;
}
</style>
