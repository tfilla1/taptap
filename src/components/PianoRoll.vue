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
import { white_keys, black_keys, mod_keys } from "@/utils/keyboard";

// Import other sound files as needed

const appStore = useAppStore();
const hello: Ref<string> = ref("helllo");

const sounds = computed(() => appStore.getSounds);
// const testingSound = ref([bubbleSound, claySound])
type Sound = {
  letter: string;
  color: string;
  sound: Howl;
};
const keyData = ref([] as Sound[]);
onMounted(() => {
  // init();

  const kb = new Keyboard([
    {
      color: "ff00aa",
      letter: "A",
      sound: new Howl({ src: [sounds.value[1]] }),
    },
  ]);

  kb.draw();
  for (var i = 0; i < white_keys.length; i++) {
    keyData.value.push({
      letter: white_keys[i],
      color: getRandomColor(),
      sound: new Howl({ src: [sounds.value[i]] }),
    });
  }
});

onKeyDown(white_keys, (e: KeyboardEvent) => {
  const key = e.key;

  if (key === ";") {
    console.log({ key });
    console.log(keyData.value.find((k) => k.letter === key)?.sound);
  }

  keyData.value.find((k) => k.letter === key)?.sound.play();
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
      <!-- <pre>{{ sounds }}</pre> -->
      <canvas id="pinot" width="600" height="600"></canvas>
    </v-card-text>
  </v-card>
</template>
@/services/baseball
