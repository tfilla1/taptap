<script lang="ts" setup>
import KeyboardView from "@/components/KeyboardView.vue";
import ShellView from "@/components/ShellView.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const selectedSoundboard = computed(() => appStore.getSelectedSoundboard);

const currentOctave = computed(() => appStore.getOctave);

const midiDevices = computed(() => appStore.getMidiDevices);
</script>

<template>
  <ShellView>
    <v-alert v-if="midiDevices.length < 1" type="info" class="rounded-0"
      >please connect a midi device, otherwise enjoy the inbuilt piano system
      until a better name comes along ;)</v-alert
    >
    <div>{{ selectedSoundboard.key }}</div>
    <KeyboardView
      :octave="currentOctave"
      scale="C"
      :soundboard="selectedSoundboard.key"
    />
    <!-- <KeyboardView :octave="currentOctave" scale="C" soundboard="pino" /> -->
  </ShellView>
</template>
