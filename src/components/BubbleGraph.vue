<script>
import * as d3 from "d3";

export default {
  name: "BubbleGraph",
  props: {
    bubbleGraphProps: {
      data: [
        Array,
        {
          value: Number,
          text: String,
        },
      ],
      graphName: String,
      numberOfColumns: Number,
      useLogarithmicScale: Boolean,
      LogarithmicFactor: Number,
      maxRadius: Number,
      minRadius: Number,
    },
  },
  setup(props) {
    const graphId =
      "my_dataviz" + props.bubbleGraphProps.graphName.replaceAll(" ", "_");
    return { graphId };
  },
  watch: {
    bubbleGraphProps() {
      this.renderGraph();
    },
  },

  methods: {
    renderGraph() {
      const getSizeScale = (
        useLogarithmicScale,
        LogarithmicFactor,
        data,
        maxRadius,
        minRadius
      ) => {
        const maxValue = Math.max(...data.map((x) => x.value));

        return useLogarithmicScale
          ? d3
              .scalePow()
              .exponent(LogarithmicFactor)
              .domain([0, maxValue])
              .range([minRadius, maxRadius])
          : d3
              .scaleLinear()
              .domain([0, maxValue])
              .range([minRadius, maxRadius]);
      };

      const getSvgDimension = (data, sizeScale, maxRadius) => {
        const averageOfValues =
          data.reduce((a, b) => {
            return a + b.value;
          }, 0) / data.length;

        const sumOfQuartileValue =
          data.length > 1
            ? data[Math.round(data.length / 4)].value +
              data[Math.round(data.length / 2)].value +
              data[Math.round((3 * data.length) / 4)].value +
              data[0].value +
              data[data.length - 1].value
            : data[0].value;

        const averageOfQuartileValue = sumOfQuartileValue / 5 || 0;

        const averageToUse = Math.max(averageOfQuartileValue, averageOfValues);

        const width = containerWidth;
        const height = Math.max(
          maxRadius * 2.5,
          (2 * (data.length * sizeScale(averageToUse))) /
            this.bubbleGraphProps.numberOfColumns
        );
        return { width, height, maxRadius };
      };
      const data = this.bubbleGraphProps.data;

      let containerWidth = this.$refs.container.clientWidth;

      const maxRadius =
        this.bubbleGraphProps.maxRadius === 0
          ? containerWidth / (2 * this.bubbleGraphProps.numberOfColumns)
          : this.bubbleGraphProps.maxRadius;

      const minRadius =
        this.bubbleGraphProps.minRadius === 0
          ? 5
          : this.bubbleGraphProps.minRadius;

      const size = getSizeScale(
        this.bubbleGraphProps.useLogarithmicScale,
        this.bubbleGraphProps.LogarithmicFactor,
        data,
        maxRadius,
        minRadius
      );

      const { width, height } = getSvgDimension(data, size, maxRadius);

      let acc = 0;

      const graphName =
        "#my_dataviz" + this.bubbleGraphProps.graphName.replaceAll(" ", "_");

      var repart = d3
        .scalePow()
        .exponent(1)
        .domain([0, data.length])
        .range([0, height]);

      // append the svg object to the body of the page
      var svg = d3
        .select(graphName)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Initialize the circle: all located at the center of the svg area
      var node = svg.append("g").selectAll("circle").data(data).enter();

      var circle = node
        .append("circle")
        .attr("class", "node")
        .attr("r", function (d) {
          return size(d.value);
        })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function () {
          return "#D1D1D1";
        })
        .style("fill-opacity", 1)
        .call(
          d3
            .drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      const trimText = (text, threshold) => {
        if (text.length <= threshold) return text;
        return text.substr(0, threshold).concat("...");
      };

      const getFontSize = (dataValue) => {
        const fontSize = size(dataValue) / 5;
        return fontSize > 4 ? fontSize : 0;
      };

      var text = node
        .append("text")
        .text((d) => trimText(d.text, size(d.value) / 9))
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("pointer-events", "none")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-family", "Helvetica Neue")
        .style("font-size", (d) => `${getFontSize(d.value)}pt`)
        .style("fill", "black");

      var tooltip = d3
        .select(graphName)
        .append("div")
        .text("here")
        .attr("pointer-events", "none")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("border-radius", "5px")
        .style("padding", "4px")
        .style("background-color", "black")
        .style("color", "white")
        .style("opacity", "0.6")
        .style("z-index", "10")
        .style("font-size", "16pt");

      circle
        .on("mouseover", function () {
          return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function (event, d) {
          return tooltip
            .style("top", event.pageY + "px")
            .style("left", event.pageX + "px")
            .text(`Nom : ${d.text}`);
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });

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
        .force("charge", d3.forceManyBody().strength(10)) // Nodes are attracted one each other of scale * 1000000 is > 0
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(1)
            .radius(function (d) {
              return size(d.value);
            })
            .iterations(1)
        ); // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' scale * 1000000 is low enough), simulations will stop.
      simulation.nodes(data).on("tick", function () {
        circle
          .attr("cx", function (d) {
            return (d.x = Math.max(
              maxRadius,
              Math.min(width - maxRadius, d.x)
            ));
          })
          .attr("cy", function (d) {
            return (d.y = Math.max(
              maxRadius,
              Math.min(height - maxRadius, d.y)
            ));
          });
        text
          .attr("x", function (d) {
            return (d.x = Math.max(
              maxRadius,
              Math.min(width - maxRadius, d.x)
            ));
          })
          .attr("y", function (d) {
            return (d.y = Math.max(
              maxRadius,
              Math.min(height - maxRadius, d.y)
            ));
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
  },
  mounted() {
    this.renderGraph();
  },
};
</script>

<template>
  <div class="container" ref="container">
    <div :id="`${graphId}`"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.heavy {
  font: bold 30px sans-serif;
}
</style>
