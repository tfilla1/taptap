<script lang="ts" setup>
import KeyboardView from "@/components/KeyboardView.vue";
import MidiView from "@/components/MidiView.vue";
</script>

<template>
  <v-row>
    <v-col cols="9">
      <KeyboardView />
    </v-col>
    <v-col cols="3">
      <MidiView />
    </v-col>
  </v-row>
</template>
