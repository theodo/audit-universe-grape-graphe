<template>
  <circle :cx="this.cx" :cy="this.cy" :r="this.r" fill="green"></circle>
  <p ref="pElementRef" :style="style" class="circle">{{ text }}</p>
</template>

<script>
export default {
  name: "BubbleComponent",
  props: {
    r: Number,
    text: String,
    cx: Number,
    cy: Number,
  },
  computed: {
    style() {
      return {
        background: "green",
        color: "green",
      };
    },
  },
};
</script>

<style scoped>
.circle {
  display: flex;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  padding: 12px;
  width: 100px;
  overflow: hidden;
  visibility: hidden;
}
</style>
