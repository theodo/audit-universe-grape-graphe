import * as d3 from "d3";

export const getGraphParameters = (graphProps, containerWidth) => {
  const data = graphProps.data;

  const numberOfColumns = graphProps.numberOfColumns;

  const maxRadius =
    graphProps.maxRadius === 0
      ? containerWidth / (2 * numberOfColumns)
      : graphProps.maxRadius;

  const minRadius = graphProps.minRadius === 0 ? 5 : graphProps.minRadius;

  const size = getSizeScale(
    graphProps.useLogarithmicScale,
    graphProps.LogarithmicFactor,
    data,
    maxRadius,
    minRadius
  );

  const { width, height } = getSvgDimension(
    data,
    size,
    maxRadius,
    numberOfColumns,
    graphProps.height,
    containerWidth
  );
  return {
    data,
    maxRadius,
    minRadius,
    width,
    height,
    size,
    numberOfColumns,
  };
};
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
    : d3.scaleLinear().domain([0, maxValue]).range([minRadius, maxRadius]);
};

const getSvgDimension = (
  data,
  sizeScale,
  maxRadius,
  numberOfColumns,
  requiredHeight,
  containerWidth
) => {
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
  const height =
    requiredHeight !== 0
      ? requiredHeight
      : Math.max(
          maxRadius * 2.5,
          (2 * (data.length * sizeScale(averageToUse))) / numberOfColumns
        );
  return { width, height, maxRadius };
};

export const addBubbleText = (node, size, width, height) => {
  return node
    .append("text")
    .text((d) => d.text)
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("pointer-events", "none")
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-family", "Helvetica Neue")
    .style("font-size", (d) => `${getFontSize(d.value, size)}pt`)
    .style("fill", "black")
    .each(function (d) {
      svgTextEllipsis(this, size(d.value) * 2);
    });
};

const svgTextEllipsis = (textNode, width) => {
  const d3Node = d3.select(textNode);
  const targetWidth = width - width * 0.2;
  const initialText = d3Node.text();

  let textWidth = d3Node.node().getComputedTextLength() ?? 0;
  let textLength = initialText.length;
  let text = initialText;

  if (textWidth < targetWidth) return;

  while (textLength > 0 && targetWidth < textWidth) {
    text = text.slice(0, textLength - 1);
    d3Node.text(`${text}…`);
    textWidth = d3Node.node()?.getComputedTextLength() ?? 0;
    textLength = text.length;
  }
};

const getFontSize = (dataValue, size) => {
  const fontSize = size(dataValue) / 5;
  return fontSize > 4 ? fontSize : 0;
};

export const addTooltip = (globalContainer, graphName, bubble) => {
  let tooltip = d3
    .select(graphName)
    .append("div")
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

  const tooltipNameText = tooltip.append("p").style("margin-top", "0px");
  const tooltipCoverageText = tooltip.append("p");
  const tooltipWeightingText = tooltip
    .append("p")
    .style("margin-bottom", "0px");

  bubble
    .on("mouseover", () => {
      return tooltip.style("visibility", "visible");
    })
    .on("mousemove", (event, d) => {
      const yDelta = globalContainer.getBoundingClientRect().y;
      const xDelta = globalContainer.getBoundingClientRect().x;
      tooltipNameText.text(`Name : ${d.text}`);
      tooltipCoverageText.text(`coverage: ${d.score}`);
      tooltipWeightingText.text(`weighting: ${d.value}`);
      return tooltip
        .style("top", event.pageY - yDelta - window.scrollY + 10 + "px")
        .style("left", event.pageX - xDelta + 10 + "px");
    })
    .on("mouseout", () => {
      return tooltip.style("visibility", "hidden");
    });
};
