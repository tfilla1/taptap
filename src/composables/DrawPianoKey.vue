<script lang="ts" setup>
const background = defineModel<string>("background");
const text = defineModel<string>("text");
const target = defineModel<string>("target"); // animation target
const cssClass = defineModel<string>("cssClass");
</script>
<template>
  <!-- class="item" -->
  <div
    :id="target"
    :class="cssClass"
    :style="{
      backgroundColor: background,
    }"
  >
    {{ text }}
  </div>
</template>
<style scoped></style>
