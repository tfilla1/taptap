<script setup lang="ts">
import { Soundboard } from "@/classes/Pino";
import { determineScale, notes } from "@/data/soundboards/taptap";
import { useAppStore } from "@/store/app";
import { computed, ref, Ref } from "vue";
import MidiView from "./MidiView.vue";

const appStore = useAppStore();

const icons = computed(() => appStore.getIcons);
const menu = computed(() => appStore.getMenu);
const selectedSoundboard = computed(() => appStore.getSelectedSoundboard);
const soundboards = computed(() => appStore.getSoundboards);

const setSelectedSoundboard = (key: string) =>
  appStore.setSelectedSoundboard(key);

const showEditSoundboard = ref(false);
const soundboard = ref({} as Soundboard);
const boardRules = ref([
  (value: string) => {
    if (value) return true;

    return "Name is required";
  },
  (value: string) => {
    if (value?.length <= 10) return true;
    return "name must be less than 10 characters";
  },
]);
const iconRules = ref([
  (value: string) => {
    if (value) return true;

    return "Icon is required";
  },
  (value: string) => {
    if (value?.length <= 10) return true;
    return "name must be less than 10 characters";
  },
]);
const toggleEditSoundboard = () => {
  showEditSoundboard.value = !showEditSoundboard.value;

  if (showEditSoundboard.value) {
    appStore.loadIcons();
  }
};

const toggleSoundboard = () => {
  const currentIndex = soundboards.value.indexOf(selectedSoundboard.value);
  const nextIndex = (currentIndex + 1) % soundboards.value.length;
  const nextSoundboard = soundboards.value[nextIndex];
  appStore.setSelectedSoundboard(nextSoundboard.key);
};

const pendingStateChanges = ref(0);
const loading = computed(() => pendingStateChanges.value > 0);
const valid = ref(false);
const addSoundboard = () => {
  if (valid.value) {
    appStore.addSoundboard({
      key: soundboard.value.key,
      icon: soundboard.value.icon,
    } as Soundboard);
    toggleEditSoundboard();
    soundboard.value = {} as Soundboard;
  }
};
const minOctave = 0;
const maxOctave = 7;

const octave: Ref<number> = computed(() => appStore.getOctave);
const scale: Ref<string | string[]> = ref("c");
const showOctave: Ref<boolean> = ref(true);
const changeOctave = (key: string) => {
  let innerOctave = octave.value;
  if (innerOctave && scale.value) {
    if (key === "z") innerOctave--;
    else if (key === "x") innerOctave++;

    if (innerOctave <= minOctave) innerOctave = 7;

    if (innerOctave > maxOctave) innerOctave = 1;

    appStore.setOctave(innerOctave);
    scale.value = determineScale(notes[scaleIndex.value], octave.value);
  }
};

const scaleIndex = ref(0);
// const scale = ref(determineScale("C", octave.value));
const scaleDisplay = computed(() => notes[scaleIndex.value]);
const showScale: Ref<boolean> = ref(true);
const changeScale = (key: string) => {
  if (key === "v") scaleIndex.value++;
  else scaleIndex.value--;

  if (scaleIndex.value < 0) scaleIndex.value = notes.length - 1;

  if (scaleIndex.value >= notes.length) scaleIndex.value = 0;

  scale.value = determineScale(notes[scaleIndex.value], octave.value ?? 1);
};

const midiDevices = computed(() => appStore.getMidiDevices);
</script>
<template>
  <v-card height="500" class="mx-4">
    <template #prepend>
      <v-btn
        :icon="selectedSoundboard.icon"
        variant="elevated"
        class="bg-primary"
        @click="toggleSoundboard"
      ></v-btn>
    </template>
    <template #title>
      {{ selectedSoundboard.key }}
    </template>
    <template #append>
      <div v-if="selectedSoundboard.key === 'piano'" class="d-flex">
        <div v-if="showOctave" class="d-flex flex-column flex-grow-1">
          <h3>octave</h3>
          <div>
            <v-btn
              icon="$minus"
              variant="flat"
              @click="changeOctave('z')"
            ></v-btn>
            {{ octave }}
            <v-btn
              icon="$plus"
              variant="flat"
              @click="changeOctave('x')"
            ></v-btn>
          </div>
        </div>
        <div v-if="showScale" class="d-flex flex-column flex-grow-1">
          <h3>scale</h3>
          <div>
            <v-btn
              icon="$minus"
              variant="flat"
              @click="changeScale('c')"
            ></v-btn>
            {{ scaleDisplay }}
            <v-btn
              icon="$plus"
              variant="flat"
              @click="changeScale('v')"
            ></v-btn>
          </div>
        </div>
      </div>
    </template>
    {{ scale }}
    <slot></slot>
  </v-card>
  <v-navigation-drawer
    v-model="menu"
    temporary
    location="right"
    class="bg-secondary"
  >
    <v-card class="bg-secondary" flat>
      <template #title>
        <div class="d-flex align-start">soundboards</div>
      </template>
      <template #append>
        <v-btn
          icon="$plus"
          variant="tonal"
          class="bg-secondary"
          @click="toggleEditSoundboard"
        ></v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="s in soundboards"
          :key="s.key"
          :title="s.key"
          :prepend-icon="s.icon"
          :active="s.key === selectedSoundboard.key"
          @click="setSelectedSoundboard(s.key)"
        ></v-list-item>
      </v-list>
    </v-card>
    <MidiView v-if="midiDevices.length > 0"></MidiView>
  </v-navigation-drawer>
  <v-dialog v-model="showEditSoundboard" max-width="420">
    <v-form v-model="valid" @submit.prevent="addSoundboard">
      <v-card
        title="manage soundboard"
        subtitle="use form to manage soundboard"
        :loading="loading"
      >
        <template #append>
          <v-btn
            icon="$close"
            variant="flat"
            @click="toggleEditSoundboard"
          ></v-btn>
        </template>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="soundboard.key"
                :rules="boardRules"
                :counter="10"
                label="soundboard name"
                required
                variant="outlined"
                :hide-details="valid"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="icons"
                v-model="soundboard.icon"
                :rules="iconRules"
                required
                label="soundboard icon"
                item-value="value"
                item-title="key"
                variant="outlined"
                :hide-details="valid"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <template #actions>
          <v-btn variant="text" @click="toggleEditSoundboard">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            class="bg-primary"
            variant="elevated"
            text="send it"
          ></v-btn>
        </template>
      </v-card>
    </v-form>
  </v-dialog>
</template>
