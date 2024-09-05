<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { computed, onMounted } from "vue";
import { useTheme } from "vuetify";

const appStore = useAppStore();
const theme = useTheme();

const app = computed(() => appStore.getApp);

const isDark = computed(() => theme.global.current.value.dark);
const toggleTheme = () =>
  (theme.global.name.value = isDark.value ? "light" : "dark");

const toggleMenu = () => {
  appStore.toggleMenu();
};

onMounted(() => {
  appStore.loadSoundboards();
  // appStore.setSelectedSoundboard("piano");
});
</script>

<template>
  <v-app-bar flat class="bg-primary">
    <v-app-bar-title>
      <v-icon>{{ app.icon }}</v-icon>
      {{ app.key }}
    </v-app-bar-title>
    <template #append>
      <v-btn
        :icon="isDark ? '$dark' : '$light'"
        color="secondary"
        @click="toggleTheme"
      >
      </v-btn>
      <v-btn icon="$menu" color="secondary" @click="toggleMenu"></v-btn>
    </template>
  </v-app-bar>
</template>
