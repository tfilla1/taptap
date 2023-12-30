<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from "vue";
import { useAppStore } from "@/store/app";

import anime, { AnimeTimelineInstance } from "animejs";
import { createAnimation } from "@/utils/createAnimation";

import {
  convertMidiToPitch,
  convertMidiToPino,
} from "@/utils/convertMidiToNote";

const midiInputs = ref([] as any[]);
const appStore = useAppStore();
const pinos = computed(() => appStore.getSounds);

const midiDevices = computed(() => appStore.getMidiDevices);
const midiOutputs = computed(() => appStore.getMidiOutputs);
const selectedMidiDevice = computed(() => appStore.getSelectedMidiDevice);

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");

  appStore.loadMidiDevices(midiAccess);
  appStore.setSelectedMidiDevice(midiDevices.value[0].id);

  console.log({ midiInputs: midiDevices.value });

  startLoggingMIDIInput(
    midiAccess,
    selectedMidiDevice.value as unknown as MIDIPort,
  );
};
const changeSelectedDevice = (id: string) => {
  appStore.setSelectedMidiDevice(id);
};
const onMIDIFailure = (msg: any) => {
  console.error(`Failed to get MIDI access - ${msg}`);
  subtitle.value = "failed to connect to midi device";
};

const startLoggingMIDIInput = (
  midiAccess: MIDIAccess,
  indexOfPort: MIDIPort,
) => {
  console.log(indexOfPort);

  midiAccess.inputs.forEach((entry: any) => {
    entry.onmidimessage = onMIDIMessage;
  });
};

const onMIDIMessage = (event: any) => {
  let midiKey = event.data[1];
  let sounds = convertMidiToPitch(midiKey as number);
  let pino = convertMidiToPino(midiKey as number);
  if (pino!.enharmonics && typeof pino!.note === "object") {
    (pino!.note as Array<string>).forEach((item, index) => {
      console.log(item);
      console.log(index);
      anime(
        createAnimation(
          item,
          typeof pino!.color === "object" ? pino!.color[index] : pino!.color,
          pino!.enharmonics ? "id" : "class",
        ),
      );
    });
  } else {
    anime(
      createAnimation(
        pino!.note,
        typeof pino!.color === "object" ? pino!.color[0] : pino!.color,
        pino!.enharmonics ? "id" : "class",
      ),
    );
  }
  // 144: noteOn
  // 128: noteOff
  const noteOn = event.data[0] === 144;
  if (noteOn) {
    sounds![0].sound?.play();
  }
  return event.data;
};

onMounted(() => {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
});

const title = ref("midi devices");
const subtitle = ref("");
</script>

<template>
  <v-card :title="title" :subtitle="selectedMidiDevice" height="500">
    <v-list v-if="midiDevices?.length > 0">
      <v-list-subheader>Inputs</v-list-subheader>
      <v-list-item
        v-for="md in midiDevices"
        :key="md"
        :title="md.name"
        prepend-icon="$piano"
        :subtitle="md.manufacturer"
        @click="changeSelectedDevice(md.id)"
      >
      </v-list-item>
    </v-list>
    <v-list v-if="midiOutputs?.length > 0">
      <v-list-subheader>Outputs</v-list-subheader>
      <v-list-item
        v-for="md in midiOutputs"
        :key="md"
        :title="md.name"
        prepend-icon="$piano"
        :subtitle="md.manufacturer"
        @click="changeSelectedDevice(md.id)"
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>
