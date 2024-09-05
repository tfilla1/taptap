<template>
  <v-app class="bg-grey">
    <default-bar />

    <default-view />

    <app-messages></app-messages>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

import AppMessages from "@/composables/app-messages.vue";
</script>
