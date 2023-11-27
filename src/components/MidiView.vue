<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { useAppStore } from "@/store/app";

import anime, { AnimeTimelineInstance } from "animejs";

import { convertMidiToNote } from "@/utils/convertMidiToNote";
import { createAnimation } from "@/utils/createAnimation";

const midi: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object

const appStore = useAppStore();
const pinos = computed(() => appStore.getSounds);
const title = ref("midi devices");
const subtitle = ref("");

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");
  console.log({ midiAccess });

  midi.value = midiAccess;

  const { input, output } = listInputsAndOutputs(midiAccess);

  if (input !== "something")
    subtitle.value = `Connected: ${input.manufacturer}  ${input.name}`;
  // content.value = innout.thingInput;

  console.log({ input, output });
  startLoggingMIDIInput(midiAccess, input?.id);
};

const onMIDIFailure = (msg: any) => {
  console.error(`Failed to get MIDI access - ${msg}`);
  subtitle.value = "failed to connect to midi device";
};

const playTheNote = (note: string, octave: number) => {
  console.log(note);
  let playNote = pinos.value.find((p) => p.note == note)?.pitches;
  let soundNote = playNote?.filter((p) => p.octave === octave);
  return soundNote
    ?.map((s) => ({
      source: s.source,
      sound: new Howl({ src: [s.source] }),
    }))
    .flat(2);
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

function listInputsAndOutputs(midiAccess: any) {
  const returnObject = {} as any;
  let input;
  let output;
  for (const entry of midiAccess.inputs) {
    input = entry[1];
    console.log(
      `Input port [type:'${input.type}'] id:'${input.id}' manufacturer: '${input.manufacturer}' name: '${input.name}' version: '${input.version}'`,
    );
  }

  for (const entry of midiAccess.outputs) {
    output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id: '${output.id}' manufacturer: '${output.manufacturer}' name: '${output.name}' version: '${output.version}'`,
    );
  }

  returnObject.input = input ?? "something";
  returnObject.output = output ?? "something";

  console.log({ returnObject });
  return returnObject;
}

const onMIDIMessage = (event: any) => {
  let midiKey = event.data[1];
  let { octave, note } = convertMidiToNote(midiKey as number);

  let playNote = pinos.value.find((p) => p.note === note)?.pitches;
  let colorNote = pinos.value.find((p) => p.note === note)!.color;
  let soundNote = playNote?.filter((p) => p.octave === octave);

  console.log({ note2Play: note + "" + octave, playNote, soundNote });
  // 144: noteOn
  // 128: noteOff
  const noteOn = event.data[0] === 144;
  const something = playTheNote(note, octave);
  if (something && noteOn) {
    anime(
      createAnimation(
        note,
        typeof colorNote === "object" ? colorNote[0] : colorNote,
      ),
    );

    something[0].sound.play();
  }

  return event.data;
};

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

const midiDevices = ref(["1", "2"]);
const selectedMidiDevice = ref();
</script>

<template>
  <v-card :title="title" height="500"></v-card>
</template>
