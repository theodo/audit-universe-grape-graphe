<template>
  <BubbleGraph :bubblesProps="content.data" :graphId="content.id" />
  <p>Graph Name : {{ content.id }}</p>
  <p>Graph element : {{ content.data[0].text }}</p>
  <p>Graph value : {{ content.data[0].value }}</p>
</template>

<script>
import BubbleGraph from "./components/BubbleGraph.vue";

export default {
  name: "App",
  components: {
    BubbleGraph,
  },
  props: {
    content: { type: "Object", required: true },
  },
};
</script>

<script setup>
const dataNotUsed = [
  {
    color: "#FEDACC",
    value: 100,
    text: "SARL John Doe",
  },
  {
    color: "#696969",
    textColor: "white",
    value: 50,
    text: "Italy",
  },
  {
    color: "#FEDACC",
    value: 45,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 10,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 5,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 1,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 99,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 80,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    value: 25,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 89,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 14,
    text: "Ireland",
  },
  {
    color: "#FEDACC",
    value: 67,
    text: "Ireland",
  },
];
</script>

<style lang="scss" scoped>
.my-element {
  p {
    font-size: 18px;
  }
}
</style>
