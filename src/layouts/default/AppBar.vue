<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const appStore = useAppStore();
const theme = useTheme();

const selectedSoundboard = computed(() => appStore.selectedSoundboard);

const toggleSoundboard = () => {
  const selected = appStore.setSelectedSoundboard();
  // octave.value = selected.key === "taptap" ? 1 : octave.value;
  // showOctave.value = selected.key !== "taptap";
};

const title = computed(() => selectedSoundboard.value.key);

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark");
const isDark = computed(() => theme.global.current.value.dark);
const debug = computed(() => appStore.getDebug);
const toggleDebug = () => {
  appStore.toggleDebug();
};
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn
        variant="flat"
        @click="toggleSoundboard"
        :prepend-icon="selectedSoundboard.icon"
        >{{ title }}</v-btn
      >
    </v-app-bar-title>
    <template #append>
      <v-btn
        :icon="debug ? '$testing' : '$lame'"
        :color="debug ? 'secondary' : 'primary'"
        @click="toggleDebug"
      ></v-btn>
      <v-btn
        :icon="isDark ? '$dark' : '$light'"
        color="secondary"
        @click="toggleTheme"
      >
      </v-btn>
    </template>
  </v-app-bar>
</template>
