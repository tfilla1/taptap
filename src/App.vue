<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "./store/app";

//
onMounted(() => {
  useAppStore().loadPianoSounds();

  console.log({ something: import.meta.env });
});
</script>
