<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from "vue";
import { useAppStore } from "@/store/app";

import { convertMidiToNote } from "@/utils/convertMidiToNote";

const midi: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
const midiInputs = ref([] as any[]);
const midiOutputs = ref([] as any[]);
const appStore = useAppStore();
const pinos = computed(() => appStore.getSounds);

const determineMidiInputs = (midiAccess: any) => {
  const inputs = [];
  for (const entry of midiAccess.inputs) {
    console.log({ entry });
    inputs.push(entry[1]);
  }

  return inputs;
};
const determineMidiOutputs = (midiAccess: any) => {
  const outputs = [];
  for (const entry of midiAccess.outputs) {
    console.log({ entry });
    outputs.push(entry[1]);
  }
  return outputs;
};

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");
  console.log({ midiAccess });

  midi.value = midiAccess;

  midiInputs.value = determineMidiInputs(midiAccess);
  midiOutputs.value = determineMidiOutputs(midiAccess);
  selectedMidiDevice.value = midiInputs.value[0].id;
  console.log({ midiInputs: midiInputs.value });
  startLoggingMIDIInput(midiAccess, selectedMidiDevice.value);
};
const changeSelectedDevice = (id: string) => {
  console.log({ id });
  selectedMidiDevice.value = id;
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
  let sounds = convertMidiToNote(midiKey as number);

  // 144: noteOn
  // 128: noteOff
  const noteOn = event.data[0] === 144;
  if (noteOn) {
    sounds![0].sound.play();
  }
  return event.data;
};

onMounted(() => {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
});
const title = ref("midi devices");
const subtitle = ref("");
// const midiDevices = ref(listInputsAndOutputs(midi.value));
const midiDevices = ref({});
const selectedMidiDevice = ref();
</script>

<template>
  <v-card :title="title" :subtitle="selectedMidiDevice" height="500">
    <v-list v-if="midiInputs">
      <v-list-subheader>Inputs</v-list-subheader>
      <v-list-item
        v-for="md in midiInputs"
        :key="md"
        :title="md.name"
        prepend-icon="$piano"
        :subtitle="md.manufacturer"
        @click="changeSelectedDevice(md.id)"
      >
      </v-list-item>
    </v-list>
    <v-list v-if="midiOutputs">
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
