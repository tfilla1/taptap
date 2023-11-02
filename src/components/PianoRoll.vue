<script lang="ts" setup>
import { onKeyDown } from "@vueuse/core";
import { useAppStore } from "@/store/app";
import { Howl, Howler } from "howler";
import paper from "paper";
import { getRandomColor } from "@/utils/getRandomColor";
import { ref, computed, Ref } from "vue";
import { onMounted } from "vue";
import init from "@/services/baseball";
import { Keyboard } from "@/services/keyboard";
import Pino from "@/classes/Pino";
import { white_keys, black_keys, mod_keys } from "@/utils/keyboard";


const keys = [white_keys, black_keys].flat();
// Import other sound files as needed
// keys.push(white_keys)

const appStore = useAppStore();
const hello: Ref<string> = ref("helllo");

const octave: Ref<number> = ref(2);
const pinos = computed(() => appStore.getSounds);
// const testingSound = ref([bubbleSound, claySound])

onMounted(() => {
  // init();

  const kb = new Keyboard(appStore.getSounds, octave.value);
  console.log({ pino: pinos.value });
  kb.draw();
});
const keyColor = ref("#ff00aa");
onKeyDown(keys, (e: KeyboardEvent) => {
  const key = e.key;

  const pino = pinos.value.find((p) => p.key?.includes(key));

  keyColor.value = pino?.color ?? "";
  const source = pino?.pitches
    .filter((s) => s.octave === octave.value)
    .map((s) => ({ source: s.source, sound: new Howl({ src: [s.source] }) }))
    .flat(2);

  // find((s) => s.octave === octave.value)?.source;

  if (source) {
    console.log({ source: source[0] });
    source[0].sound.play();
  }
  // if (keyData[key]) {
  // var maxPoint = new Point(view.size.width, view.size.height);
  // var randPoint = Point.random();
  // var point = maxPoint * randPoint;
  // var nCrcl = new Path.Circle(point, 360);

  // nCrcl.fillColor = keyData[event.key].color;

  // crcl.push(nCrcl);
  // }
});

// window.onload = function () {
//   // Get a reference to the canvas object
//   var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
//   // Create an empty project and a view for the canvas:
//   paper.setup(canvas);
//   // Create a Paper.js Path to draw a line into it:
//   var path = new paper.Path();
//   // Give the stroke a color
//   path.strokeColor = "black" as unknown as  paper.Color;
//   var start = new paper.Point(100, 100);
//   // Move to start and draw a line from there
//   path.moveTo(start);
//   // Note that the plus operator on Point objects does not work
//   // in JavaScript. Instead, we need to call the add() function:
//   path.lineTo(start.add([200, -50]));
//   // Draw the view now:
//   paper.view.draw();
// };
</script>

<template>
  <v-card :title="hello">
    <v-card-text>
      <!-- <pre>{{ pinos }}</pre> -->
      <div :style="{ backgroundColor: keyColor }">{{ keyColor }}</div>
      <canvas id="pinot" width="600" height="600"></canvas>
      <!-- <div style="position: relative">
        <canvas
          id="layer1"
          width="100"
          height="100"
          style="position: absolute; left: 0; top: 0; z-index: 0"
        ></canvas>
        <canvas
          id="layer2"
          width="100"
          height="100"
          style="position: absolute; left: 0; top: 0; z-index: 1"
        ></canvas>
      </div> -->
    </v-card-text>
  </v-card>
</template>
