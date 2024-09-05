// TODO on dismiss toast within a dialog, it also tries to dismiss the dialog

<script lang="ts" setup>
import { useMessageStore } from "@/store/modules/messages";
import { computed } from "vue";
const messageStore = useMessageStore();

const toast = computed(() => messageStore.getToast);
const closeToast = () => messageStore.closeToast();
</script>

<template>
  <div>
    <!-- Toast message -->
    <v-snackbar
      v-model="toast.visible"
      location="bottom right"
      :color="toast.level"
    >
      {{ toast.message }}
      <template v-slot:actions>
        <v-btn icon="$close" @click="closeToast"> </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
