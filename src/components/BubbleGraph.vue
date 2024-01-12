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
        color: String,
        scale: Number,
        text: String,
        xPosition: Number,
        yPosition: Number,
        textColor: String,
      },
    ],
  },

  mounted() {},
};
</script>

<template>
  <svg>
    <circle r="50" cx="50" cy="50" fill="green"></circle>
    <text x="0" y="5" class="heavy">"test"</text>
  </svg>
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
