<template>
  <div class="content">
    <BubbleGraph :bubbleGraphProps="props1" />
    <BubbleGraph :bubbleGraphProps="props2" />
    <BubbleGraph :bubbleGraphProps="props3" />
  </div>
</template>

<script>
import BubbleGraph from "./components/BubbleGraph.vue";

export default {
  name: "App",
  components: {
    BubbleGraph,
  },
};
</script>

<script setup>
const data2 = [
  {
    text: "Iran",
    value: 100,
    score: 4,
  },
  {
    text: "UK",
    value: 2,
    score: 10,
  },
  {
    text: "USA",
    value: 2,
    score: 10,
  },
  {
    text: "France",
    value: 2,
    score: 10,
  },
  {
    text: "Ireland",
    value: 2,
    score: 10,
  },
  {
    text: "Germany",
    value: 2,
    score: 1,
  },
  {
    text: "Enies lobby",
    value: 2,
    score: 1,
  },
  {
    text: "Switzerland",
    value: 2,
    score: 1,
  },
  {
    text: "Sweden",
    value: 2,
    score: 1,
  },
];

const data1 = [
  {
    text: "Italie",
    value: 10,
    score: 4,
  },
  {
    text: "France",
    value: 7,
    score: 100,
  },
  {
    text: "Espagne",
    value: 9,
    score: 55,
  },
  {
    text: "Roumanie",
    value: 8,
    score: 32,
  },
  {
    text: "Danemark",
    value: 10,
    score: 90,
  },
  {
    text: "Hollande",
    value: 7,
    score: 78,
  },
  {
    text: "UK",
    value: 8,
    score: 14,
  },
  {
    text: "Irlande",
    value: 9,
    score: 3162,
  },
  {
    text: "Sénégal",
    value: 102,
    score: 62,
  },
  {
    text: "Mali",
    value: 36,
    score: 14,
  },
  {
    text: "Russie",
    value: 7,
    score: 5262,
  },
  {
    text: "Venezuela",
    value: 9,
    score: 262,
  },
  {
    text: "Kenya",
    value: 9,
    score: 623,
  },
  {
    text: "Guatemala",
    value: 8,
    score: 144,
  },
  {
    text: "Hongrie",
    value: 9,
    score: 612,
  },
  {
    text: "Chine",
    value: 5,
    score: 137,
  },
  {
    text: "Pérou",
    value: 102,
    score: 71,
  },
  {
    text: "Ouganda",
    value: 6,
    score: 1,
  },
  {
    text: "Bolivie",
    value: 48,
    score: 262,
  },
  {
    text: "Chili",
    value: 1,
    score: 2222,
  },
  {
    text: "Jordanie",
    value: 91,
    score: 63,
  },
  {
    text: "Israel",
    value: 87,
    score: 14,
  },
  {
    text: "Liban",
    value: 91,
    score: 6,
  },
  {
    text: "Maroc",
    value: 59,
    score: 37,
  },
];

const data3 = [
  {
    text: "Iran",
    value: 2,
    score: 10,
  },
  {
    text: "UK",
    value: 10000,
    score: 1,
  },
  {
    text: "USA",
    value: 100,
    score: 2,
  },
  {
    text: "France",
    value: 100,
    score: 3,
  },
  {
    text: "Ireland",
    value: 100,
    score: 4,
  },
  {
    text: "Germany",
    value: 100,
    score: null,
  },
  {
    text: "Enies lobby",
    value: 100,
    score: 7,
  },
  {
    text: "Switzerland",
    value: 100,
    score: null,
  },
  {
    text: "Sweden",
    value: 100,
    score: null,
  },
];
const props = (d) => {
  return {
    data: d.sort((a, b) => b.value - a.value),
    graphName: "graph",
    numberOfColumns: 3,
    isLogScale: true,
    logFactor: 2,
  };
};
const props1 = props(data1);
const props2 = props(data2);
const props3 = props(data3);
</script>

<style lang="scss" scoped>
.my-element {
  p {
    font-size: 18px;
  }
}
.content {
  width: 1000px;
}
</style>
