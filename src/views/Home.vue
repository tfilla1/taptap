<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import KeyboardView from "@/components/KeyboardView.vue";
import MidiView from "@/components/MidiView.vue";

import { useAppStore } from "@/store/app";
const appStore = useAppStore();

const midiDevices = computed(() => appStore.getMidiDevices);
const debug = computed(() => appStore.getDebug);

const sounds = computed(() =>
  appStore.getSounds.map((sound) => ({
    note: sound.note,
  })),
);
const scale = computed(() => appStore.getScale);
console.log({ sounds: sounds.value });
const showSounds = ref(false);
const showScale = ref(false);

onMounted(() => {
  appStore.loadSounds();
});
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
  <v-row v-if="debug">
    <v-col cols="12">
      <v-card title="debug hangout" subtitle="should have debug information">
        <v-card-text>
          <v-switch v-model="showScale" label="scale?"></v-switch>
          <v-switch v-model="showSounds" label="sounds?"></v-switch>
          <div v-if="showScale">
            <h3>scale</h3>
            <pre>{{ scale }}</pre>
          </div>
          <div v-if="showSounds">
            <h3>sounds</h3>
            <pre>{{ sounds }}</pre>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
