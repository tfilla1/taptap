<script lang="ts" setup>
const color = defineModel<string>("background");
const text = defineModel<string>("text");

const target = defineModel<string>("target");
</script>
<template>
  <div
    :id="target"
    class="tap-tap-item"
    :class="target"
    height="50"
    :style="{
      backgroundColor: color,
    }"
  >
    {{ text }}
  </div>
</template>
