<script lang="ts" setup>
import { Howl, Howler } from "howler";
import { onKeyDown, onKeyUp, onKeyStroke } from "@vueuse/core";
import { computed } from "vue";
import { onMounted, Ref, ref } from "vue";
import { useAppStore } from "@/store/app";
import { white_keys, black_keys, mod_keys } from "@/utils/keyboard";
import { determineScale, notes } from "@/data/soundboards/taptap";
import anime, { AnimeTimelineInstance } from "animejs";
import { createAnimation } from "@/utils/createAnimation";

const appStore = useAppStore();

const keys = [white_keys, black_keys, mod_keys].flat();
const pinos = computed(() => appStore.getSounds);

const timeline = ref(
  anime.timeline({
    easing: "easeOutExpo",
    duration: 1500,
    loop: false,
  }) as AnimeTimelineInstance,
);

const restart = () => {
  timeline.value.restart();
};

const minOctave = 0;
const maxOctave = 7;

const octave: Ref<number> = computed(() => appStore.getOctave);
const showOctave: Ref<boolean> = ref(true);
const changeOctave = (key: string) => {
  let innerOctave = octave.value;
  if (key === "z") innerOctave--;
  else if (key === "x") innerOctave++;

  if (octave.value < minOctave) innerOctave = 7;

  if (octave.value > maxOctave) innerOctave = 1;

  appStore.setOctave(innerOctave);
  scale.value = determineScale(notes[scaleIndex.value], innerOctave);
};

const scaleIndex = ref(0);
const scale = ref(determineScale("C", octave.value));
const scaleDisplay = computed(() => notes[scaleIndex.value]);
const showScale: Ref<boolean> = ref(true);
const changeScale = (key: string) => {
  if (key === "v") scaleIndex.value++;
  else scaleIndex.value--;

  if (scaleIndex.value < 0) scaleIndex.value = notes.length - 1;

  if (scaleIndex.value >= notes.length) scaleIndex.value = 0;

  scale.value = determineScale(notes[scaleIndex.value], octave.value);
};

const currentlyPlaying = ref({} as Howl);

onKeyUp(keys, (e: KeyboardEvent) => {
  console.log({ e });
  currentlyPlaying.value.stop();
});
onKeyStroke(
  keys,
  (e: KeyboardEvent) => {
    const key = e.key;

    const pino = pinos.value.find((p) => p.key?.includes(key));

    if (pino) {
      currentlyPlaying.value = pino?.pitches.find(
        (s) => s.octave === octave.value,
      )?.sound!;
      const source = currentlyPlaying.value.play();

      if (source) {
        if (pino!.enharmonics && typeof pino!.note === "object") {
          (pino!.note as Array<string>).forEach((item, index) => {
            anime(
              createAnimation(
                item,
                typeof pino!.color === "object"
                  ? pino!.color[index]
                  : pino!.color,
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
      }
    } else {
      if (key === "z" || key === "x") changeOctave(key);
      if (key === "c" || key === "v") changeScale(key);
    }
  },
  { dedupe: true },
);
</script>

<template>
  <v-card height="500">
    <template #title>
      <div class="d-flex flex-grow-1">
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
    <template #subtitle>
      <div class="text-wrap">
        {{ scale }}
      </div>
    </template>
    <div class="d-flex mx-2">
      <div
        v-for="(p, index) in pinos"
        class="d-flex flex-column"
        :class="p.enharmonics ? 'enharmonic' : 'non-enharmonic'"
        :key="index"
        height="700"
      >
        <div v-if="p.enharmonics" class="d-flex flex-row">
          <div
            v-for="(color, index) in p.color"
            :key="index"
            class="item px-2"
            height="50"
            :id="`${p.note[index]}`"
            :style="{
              backgroundColor: color,
            }"
          ></div>
        </div>
        <div
          v-else
          class="item"
          :class="p.note"
          height="50"
          :style="{
            backgroundColor: p.color.toString(),
          }"
        >
          {{ p.note }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style>
.enharmonic {
  /* height: 25px; */
  width: 35px;
  border: 1px solid black;
}
.non-enharmonic {
  /* height: 60px; */
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
