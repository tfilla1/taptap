<script lang="ts" setup>
// import { AnimeInstance, Animation } from 'animejs';

import anime, { AnimeParams, AnimeTimelineInstance } from "animejs";
import { onMounted } from "vue";
import { computed } from "vue";
import { ref } from "vue";
const STARTING_WIDTH = 50;
const STARTING_HEIGHT = 50;
const STARTING_DURATION = 1500;

const newAnimation = () =>
  ({
    targets: "",
    rotate: 0,
    translateX: 0,
    translateY: 0,
    color: "",
    backgroundColor: "",
    easing: "",
    opacity: "",
    duration: STARTING_DURATION,
    scale: 0,
    loop: true,
    width: STARTING_WIDTH,
    height: STARTING_HEIGHT,
  } as AnimeParams);

const animation = ref(anime(newAnimation()));
const timeline = ref({} as AnimeTimelineInstance);
const valid = ref(true);
const targetRules = [(v: any) => !!v || "Target is required"];

const colors = computed(() => ["#f0a", "#0af", "#a0f", undefined]);
const backgroundColors = computed(() => ["#f0a", "#0af", "#a0f", undefined]);
const targets = computed(() => [".item", ".letter"]);

const createTimeline = () => {
  timeline.value = anime.timeline({
    easing: "easeOutExpo",
    duration: 1500,
    loop: true,
  });
};

const initialAnimation = () => {
  timeline.value
    .add({
      targets: ".item",
      backgroundColor: ["#f0a", "#0af", "#a0f", "#0af", "#f0a"],
      translateY: [0, 250, 450, 250, 0],
      translateX: [0, 250, 450, 250, 0],
      rotate: [0, 180, 0, 180, 0],
      opacity: 1,
      duration: 3500,
      scale: [1, 4, 1, 4, 1],
      easing: "cubicBezier(.35,.94,.61,.27)",
      loop: true,
    })
    .add({
      targets: ".item",
      translateX: [250],
      opacity: 1,
      backgroundColor: ["#f0a", "#a0f", "#f0a"],
      duration: 1500,
      easing: "cubicBezier(.35,.94,.61,.27)",
    })
    .add({
      targets: ".letter",
      color: ["#ff0", "#0ff", "#ff0"],
      top: 0,
      left: 0,
      opacity: 1,
      translateX: [0, 10],
      translateY: [0, 150],
      rotate: {
        value: 1080,
        duration: 2000,
        easing: "easeOutExpo",
      },
      scale: anime.stagger([1, 2, 1], { from: "center" }),
      delay: anime.stagger(1000, { start: 0 }),
    })
    .add({
      targets: ".item",
      translateX: [250, 150, 200],
      translateY: [0, 150, 190],
      width: [25, 75, 225],
      opacity: 1,
      backgroundColor: ["#f0a", "#a0f", "#f0a"],
      duration: 4000,
      endDelay: 5000,
      easing: "cubicBezier(.35,.94,.61,.27)",
    });
};

const createAnimation = () => {
  console.log(animation.value.animatables);
  initialAnimation();
  timeline.value.add(anime(animation.value));
  timeline.value.add({
    targets: ".item",
    backgroundColor: "#f0a", //animation.value.backgroundColor,
    color: "#0af", //animation.value.color,
    duration: STARTING_DURATION,
  });
};
const start = () => {
  timeline.value.play();
};
const pause = () => {
  timeline.value.pause();
};
const restart = () => {
  timeline.value.restart();
};

onMounted(() => {
  createTimeline();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>animation test</v-card-title>
          <!-- <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-select
                label="targets"
                v-model="animation.targets"
                :items="targets"
                :rules="targetRules"
              ></v-select>
              <v-select
                label="color"
                v-model="animation.color"
                :items="colors"
              ></v-select>
              <v-select
                label="background color"
                v-model="animation.backgroundColor"
                :items="backgroundColors"
              ></v-select>
              <v-btn class="mr-4" color="success" text @click="newAnimation"
                >new animation</v-btn
              >
            </v-form>
          </v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary" @click="createAnimation"
              >new animation</v-btn
            >
            <v-btn class="bg-info" @click="start">start</v-btn>
            <v-btn class="bg-warning" @click="pause">pause</v-btn>
            <v-btn class="bg-error" @click="restart">restart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card width="500" height="500">
          <v-card-text>
            <div class="item"></div>
            <h1>
              <span class="letter pa-1">h</span>
              <span class="letter pa-1">e</span>
              <span class="letter pa-1">l</span>
              <span class="letter pa-1">l</span>
              <span class="letter pa-1">o</span>
            </h1>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="6">
        <v-card>
          <v-card-text>
            <code>{{ timeline }}</code>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<style>
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
  background-color: #ff00aa;
  width: 50px;
  height: 50px;
}
</style>
