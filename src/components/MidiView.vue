<script lang="ts" setup>
import { useAppStore } from "@/store/app";
import { computed, onMounted, ref } from "vue";

import toast from "@/constants/toast";
import { determineAnimationTarget } from "@/data/soundboards/taptap";
import { useMessageStore } from "@/store/modules/messages";
import {
  convertMidiToPino,
  convertMidiToPitch,
} from "@/utils/convertMidiToNote";
import { createAnimation } from "@/utils/createAnimation";
import anime from "animejs";

const appStore = useAppStore();

const midiDevices = computed(() => appStore.getMidiDevices);
const midiOutputs = computed(() => appStore.getMidiOutputs);
const selectedMidiDevice = computed(() => appStore.getSelectedMidiDevice);

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");

  useMessageStore().showToast(toast.loaded("MIDI"), "success");

  appStore.loadMidiDevices(midiAccess);

  if (midiDevices.value.length > 0) {
    appStore.setSelectedMidiDevice(midiDevices.value[0]?.id);

    startLoggingMIDIInput(
      midiAccess,
      selectedMidiDevice.value as unknown as MIDIPort,
    );
  }

  console.log({ midiInputs: midiDevices.value });
};
const changeSelectedDevice = (id: string) => {
  appStore.setSelectedMidiDevice(id);
};
const onMIDIFailure = (msg: any) => {
  console.error(`Failed to get MIDI access - ${msg}`);
  subtitle.value = "failed to connect to midi device";
  useMessageStore().showToast(toast.error(), "error");
};

const startLoggingMIDIInput = (
  midiAccess: MIDIAccess,
  indexOfPort: MIDIPort,
) => {
  console.log(indexOfPort);

  midiAccess.inputs.forEach((entry: any) => {
    entry.onmidimessage = onMIDIMessage;
  });

  useMessageStore().showToast("logging midi input", "success");
};

const onMIDIMessage = (event: any) => {
  console.log({ data: event.data });
  let midiKey = event.data[1]; // note
  let sound = convertMidiToPitch(midiKey as number);
  let pino = convertMidiToPino(midiKey as number);

  pino!.color.forEach((color: any, index: any) => {
    anime(
      createAnimation(
        determineAnimationTarget(pino!, index, sound?.octave!),
        color,
      ),
    );
  });

  // 144: noteOn
  // 128: noteOff
  const noteOn = event.data[0] === 144;
  if (noteOn) {
    sound!.sound?.play();
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
  <v-card flat class="bg-secondary rounded-0">
    <template #title>
      <div class="d-flex flex-column align-start">
        <div>{{ title }}</div>
        <div class="text-caption">{{ selectedMidiDevice }}</div>
      </div>
    </template>
    <v-list v-if="midiDevices?.length > 0">
      <v-list-subheader>Inputs</v-list-subheader>
      <v-list-item
        v-for="md in midiDevices"
        :key="md.id"
        :title="`${md.manufacturer} ${md.name}`"
        prepend-icon="$piano"
        @click="changeSelectedDevice(md.id)"
      >
      </v-list-item>
    </v-list>
    <v-list v-if="midiOutputs?.length > 0">
      <v-list-subheader>Outputs</v-list-subheader>
      <v-list-item
        v-for="md in midiOutputs"
        :key="md.id"
        :title="`${md.manufacturer} ${md.name}`"
        prepend-icon="$piano"
        @click="changeSelectedDevice(md.id)"
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>
