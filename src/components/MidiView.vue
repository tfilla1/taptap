<script lang="ts" setup>
import { Howl, Howler } from "howler";
import { onKeyDown } from "@vueuse/core";
import { computed } from "vue";
import { onMounted, Ref, ref } from "vue";
import { useAppStore } from "@/store/app";
import { white_keys, black_keys, mod_keys } from "@/utils/keyboard";

import anime, { AnimeTimelineInstance } from "animejs";

const appStore = useAppStore();

const keys = [white_keys, black_keys, mod_keys].flat();
const octave: Ref<number> = ref(2);
const showOctave: Ref<boolean> = ref(true);
const pinos = computed(() => appStore.getSounds);
const midi: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object

const selectedSoundboard = computed(() => appStore.selectedSoundboard);
const soundboardOptions = computed(() => appStore.getSoundboards);
const toggleSoundboard = () => {
  const selected = appStore.setSelectedSoundboard();
  octave.value = selected.key === 'taptap' ? 1 : octave.value
  showOctave.value = selected.key !== 'taptap'
};

const timeline = ref({} as AnimeTimelineInstance);

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

const playTheNote = (note: string[], octave: number) => {
  console.log(note);
  let playNote = pinos.value.find((p) => p.note == note)?.pitches;
  let soundNote = playNote?.filter((p) => p.octave === octave);
  return soundNote
    ?.map((s) => ({ source: s.source, sound: new Howl({ src: [s.source] }) }))
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

const addSomething = (target: string, color: string) => {
  console.log(target);
  timeline.value = anime
    .timeline({
      easing: "easeOutExpo",
      duration: 1500,
      loop: false,
    })
    .add({
      targets: "." + target,
      backgroundColor: [color, color],
      translateY: [100, 200, 300, 400, 1200],
      // height: [40, 50, 600, 70, 85, 5000],
      // translateX: [0, 250, 450, 250, 0],
      // rotate: [0, 180, 0, 180, 0],
      // opacity: 1,
      duration: 3500,
      scaleY: [2, 4, 8, 16],
      // easing: "cubicBezier(.35,.94,.61,.27)",
      loop: true,
      // scale: anime.stagger([1, 4, 1, 4, 1], { from: "center" }),
      delay: anime.stagger(1000, { start: 0 }),
    });
};

const minOctave = 1;
const maxOctave = 7;
const changeOctave = (key: string) => {
  if (key === "z") {
    octave.value--;
  } else if (key === "x") {
    octave.value++;
  }
  if (octave.value < minOctave) {
    octave.value = 7;
  }
  if (octave.value > maxOctave) {
    octave.value = 1;
  }
};

const restart = () => {
  console.log("restart");
};

const onMIDIMessage = (event: any) => {
  let midiKey = event.data[1];
  let notes = pinos.value.map((p) => p.note);
  const octave = Math.floor(midiKey / 12) - 1;
  const note = notes[midiKey % 12];

  let playNote = pinos.value.find((p) => p.note == note)?.pitches;
  let soundNote = playNote?.filter((p) => p.octave === octave);

  console.log({ note2Play: note + "" + octave, playNote, soundNote });
  // 144: noteOn
  // 128: noteOff
  const noteOn = event.data[0] === 144;
  const something = playTheNote(note as string[], octave);
  if (something && noteOn) {
    addSomething(
      typeof note === "string"
        ? note.replace("#", "S")
        : note.join("").replace("#", "S"),
      pinos.value.find((p) => p.note === note)!.color,
    );
    something[0].sound.play();
  }

  return event.data;
};
onKeyDown(keys, (e: KeyboardEvent) => {
  const key = e.key;

  const pino = pinos.value.find((p) => p.key?.includes(key));
  console.log({pino})
  if (pino) {
    const source = pino?.pitches
      .filter((s) => s.octave === octave.value)
      .map((s) => ({ source: s.source, sound: new Howl({ src: [s.source] }) }))
      .flat(2);

    // find((s) => s.octave === octave.value)?.source;

    if (source) {
      addSomething(
        typeof pino?.note === "string"
          ? pino.note.replace("#", "S")
          : pino!.note.join("").replace("#", "S"),
        pino!.color,
      );
      console.log({ source: source[0] });
      source[0].sound.play();
    }
  } else {
    changeOctave(key);
  }
});

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

const title = computed(() => selectedSoundboard.value.key) //ref("Use Buttons to Change Octave");
const subtitle = ref("Connect MIDI device if you desire");
const content = ref("here is some content");
</script>

<template>
  <v-card
    :title="title"
    :subtitle="subtitle"
    class="d-flex flex-column"
    height="500"
    width="800"
  >
    <template #append>
      <div class="d-flex">
        <div>
          <v-btn
            variant="flat"
            @click="toggleSoundboard"
            :icon="selectedSoundboard.icon"
          ></v-btn>
        </div>
        <div v-if="showOctave">
          <v-btn icon="$minus" variant="flat" @click="octave--"></v-btn>
          {{ octave }}
          <v-btn icon="$plus" variant="flat" @click="octave++"></v-btn>
        </div>
        <div>
          <v-btn variant="elevated" class="bg-primary" @click="restart"
            >activate pino</v-btn
          >
        </div>
      </div>
    </template>
    <div class="d-flex">
      <div
        v-for="(p, index) in pinos"
        class="d-flex flex-column mx-2"
        :class="p.enharmonics ? 'enharmonic pa-4' : 'non-enharmonic'"
        :key="index"
        :style="{
          backgroundColor: p.color,
          border: p.enharmonics ? '1px solid black' : '',
        }"
        height="500"
      >
        <div
          class="item"
          :class="
            typeof p.note === 'string'
              ? p.note.replace('#', 'S')
              : p.note.join('').replace('#', 'S')
          "
        >
          {{ typeof p.note === "string" ? p.note : p.note.join("/") }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style>
.enharmonic {
  height: 25px;
  width: 35px;
}
.non-enharmonic {
  height: 60px;
  width: 50px;
}
.letter {
  display: inline-block;
  opacity: 0;
  top: 0;
  left: 0;
}
.d-none {
  display: none;
}
.pa-1 {
  padding: 15px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  /* background-color: #ff00aa; */
  width: 50px;
  height: 50px;
}
</style>
