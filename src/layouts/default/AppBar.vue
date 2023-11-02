<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="$logo" />
      Pino
    </v-app-bar-title>
    <template #append>
      <v-btn
            :icon="isDark ? '$dark' : '$light'"
            color="secondary"
            @click="toggleTheme"
            >
          </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')
const isDark = computed(() => theme.global.current.value.dark);

//
</script>
