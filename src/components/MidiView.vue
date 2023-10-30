<script lang="ts" setup>
import { Howl, Howler } from "howler";
import { onKeyDown } from "@vueuse/core";
import { computed } from "vue";
import { onMounted, Ref, ref } from "vue";
import { useAppStore } from "@/store/app";
import { white_keys, black_keys, mod_keys } from "@/utils/keyboard";

import anime, { AnimeParams, AnimeTimelineInstance } from "animejs";

const appStore = useAppStore();

const keys = [white_keys, black_keys, mod_keys].flat();
const octave: Ref<number> = ref(2);
const pinos = computed(() => appStore.getSounds);
const midi: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const inputDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const outputDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess); // global MIDIAccess object
// const eventDisplay: Ref<MIDIAccess> = ref({} as MIDIAccess);

const timeline = ref({} as AnimeTimelineInstance);

const onMIDISuccess = (midiAccess: MIDIAccess) => {
  console.log("MIDI ready!");
  console.log({ midiAccess });

  midi.value = midiAccess;

  const innout = listInputsAndOutputs(midiAccess);

  subtitle.value = `Connected: ${innout.input.manufacturer}  ${innout.input.name}`;
  // content.value = innout.thingInput;

  console.log({ innout });
  startLoggingMIDIInput(midiAccess, innout.input?.id);
};

const onMIDIFailure = (msg: any) => {
  console.error(`Failed to get MIDI access - ${msg}`);
  subtitle.value = "failed to connect to midi device";
};

function onMIDIMessage(event: any) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data} bytes]: `;
  console.log(event.data);

  for (const character of event.data) {
    console.log({ character });
    str += `${character.toString(16)} `;
  }
  console.log(str);
  return event.data;
}

const startLoggingMIDIInput = (
  midiAccess: MIDIAccess,
  indexOfPort: MIDIPort
) => {
  console.log(indexOfPort);

  midiAccess.inputs.forEach((entry: any) => {
    entry.onmidimessage = onMIDIMessage;
  });
};

// const listInputsAndOutputs = (midiAccess: any) => {
//   let thingInput = midiAccess.inputs.forEach((entry:any) => entry).join()
//   // .forEach((entry) => {
//   //   const input = entry;
//   //   console.log({entry})
//   //   console.log(
//   //     `Input port [type:'${input.type}']` +
//   //       ` id:'${input.id}'` +
//   //       ` manufacturer:'${input.manufacturer}'` +
//   //       ` name:'${input.name}'` +
//   //       ` version:'${input.version}'`
//   //   );
//   //   return input;
//   // });

//   let thingOutput = midiAccess.outputs
//   // .forEach((entry) => {
//   //   const output = entry;
//   //   console.log(
//   //     `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
//   //   );
//   //   return output;
//   // });

//   console.log({thingOutput})
//   return { thingInput, thingOutput };
// };

function listInputsAndOutputs(midiAccess: any) {
  const returnObject = {} as any;
  let input;
  let output;
  for (const entry of midiAccess.inputs) {
    input = entry[1];
    console.log(
      `Input port [type:'${input.type}'] id:'${input.id}' manufacturer: '${input.manufacturer}' name: '${input.name}' version: '${input.version}'`
    );
  }

  for (const entry of midiAccess.outputs) {
    output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id: '${output.id}' manufacturer: '${output.manufacturer}' name: '${output.name}' version: '${output.version}'`
    );
  }

  returnObject.input = input ?? "something";
  returnObject.output = output ?? "something";

  console.log({ returnObject });
  return returnObject;
}

// onMounted(() => {
//   navigator.requestMIDIAccess().then((access: any) => {
//     // Get lists of available MIDI controllers
//     const inputs = access.inputs;
//     inputDisplay.value = inputs.forEach((x) => x);
//     const outputs = access.outputs;
//     outputDisplay.value = outputs.forEach((x) => x);

//     access.onstatechange = (event: any) => {
//       // Print information about the (dis)connected MIDI controller
//       eventDisplay.value = event;
//       console.log({ event });
//       // console.log(event.port?.name, event.port.manufacturer, event.port.state);
//     };
//   });
// });

// navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
navigator.requestMIDIAccess().then((midiAccess: any) => {
  Array.from(midiAccess.inputs).forEach((input: any) => {
    input[1].onmidimessage = (msg: any) => {
      // console.log(msg);
      console.log(msg.data);
    };
  });
});

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


const minOctave = 1
const maxOctave = 7
const changeOctave = (key: string) => {
  if (key === 'z') {
      octave.value--
    } else if (key === 'x') {
      octave.value++
    }
    if (octave.value < minOctave) {
      octave.value = 7
    }
    if (octave.value > maxOctave) {
      octave.value = 1
    }
}
const start = () => {
  timeline.value.play();
};
const pause = () => {
  timeline.value.pause();
};
const restart = () => {
  timeline.value.restart();
};

onKeyDown(keys, (e: KeyboardEvent) => {
  const key = e.key;

  const pino = pinos.value.find((p) => p.key?.includes(key));

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
        pino!.color
      );
      console.log({ source: source[0] });
      source[0].sound.play();
    }
  } else {
    changeOctave(key)
  }
});

const title = ref("helllo");
const subtitle = ref("Please connect your MIDI device to begin");
const content = ref("here is some content");
</script>

<template>
  <!-- <v-card :title="keyba
    ">{{ keyba }}</v-card> -->

  <v-card
    :title="title"
    :subtitle="subtitle"
    class="d-flex flex-column"
    height="500"
    width="800"
  >
    <template #append>
      {{ octave }}
    </template>
    <div class="d-flex">
      <div
        v-for="(p, index) in pinos"
        class="d-flex flex-column mx-2"
        :class="p.enharmonics ? 'enharmonic' : 'non-enharmonic'"
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
        <!-- <v-btn
          class="bg-primary mx-2"
          @click="
            addSomething(
              typeof p.note === 'string'
                ? p.note.replace('#', 'S')
                : p.note.join('').replace('#', 'S'), p.color
            )
          "
        >
          {{ typeof p.note === "string" ? p.note : p.note.join("/") }}</v-btn
        > -->
      </div>
    </div>
    <!-- <pre>{{ midi }}</pre>
        <pre>{{ inputDisplay }}</pre>
      <pre>{{ outputDisplay }}</pre>
      <pre>{{ eventDisplay }}</pre> -->
    <!-- <pre>{{ content }}</pre> -->
    <!-- <v-card-text>

    </v-card-text> -->
  </v-card>
</template>

<style>
.enharmonic {
  height: 40px;
  width: 50px;
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
