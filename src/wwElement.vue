<template>
  <BubbleGraph :bubblesProps="bubblesProps" />
</template>

<script>
import BubbleGraph from "./components/BubbleGraph.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    BubbleGraph,
  },
};
</script>

<script setup>
const data = [
  {
    color: "#FEDACC",
    scale: 100,
    text: "SARL John Doe",
    xPosition: 0,
    yPosition: 300,
  },
  {
    color: "#696969",
    textColor: "white",
    scale: 50,
    text: "Italy",
    xPosition: 300,
    yPosition: 0,
  },
  {
    color: "#FEDACC",
    scale: 45,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 10,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 5,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 1,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 99,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 80,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 25,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 89,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 14,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
  {
    color: "#FEDACC",
    scale: 67,
    text: "Ireland",
    xPosition: 200,
    yPosition: 200,
  },
];
const bubblesProps = ref(data.sort((a, b) => b.scale - a.scale));
</script>

<style lang="scss" scoped>
.my-element {
  p {
    font-size: 18px;
  }
}
</style>
