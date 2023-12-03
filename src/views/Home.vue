<script lang="ts" setup>
import { computed } from "vue";
import KeyboardView from "@/components/KeyboardView.vue";
import MidiView from "@/components/MidiView.vue";

import { useAppStore } from "@/store/app";
const appStore = useAppStore();

const midiDevices = computed(() => appStore.getMidiDevices);
</script>

<template>
  <v-row>
    <v-col :cols="midiDevices.length > 0 ? '9' : '12'">
      <KeyboardView />
    </v-col>
    <v-col v-if="midiDevices.length > 0" cols="3">
      <MidiView />
    </v-col>
  </v-row>
</template>
