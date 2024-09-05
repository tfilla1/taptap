<script lang="ts" setup>
import { Pino, SoundboardType } from "@/classes/Pino";
import DrawPianoKey from "@/composables/DrawPianoKey.vue";
import DrawTapTapKey from "@/composables/DrawTapTapKey.vue";
import toast from "@/constants/toast";
import { determineScale, notes } from "@/data/soundboards/taptap";
import { useAppStore } from "@/store/app";
import { useMessageStore } from "@/store/modules/messages";
import {
  createAnimation,
  createTapTapAnimation,
} from "@/utils/createAnimation";
import { tap_tap_keys } from "@/utils/keyboard";
import { onKeyStroke, onKeyUp } from "@vueuse/core";
import anime from "animejs";
import { Howl } from "howler";
import { computed, onMounted, Ref, ref } from "vue";

const appStore = useAppStore();

const octave: Ref<number | undefined> = defineModel("octave");
const soundboard: Ref<SoundboardType | undefined> = defineModel("soundboard");
const scale: Ref<string | string[] | undefined> = defineModel("scale");

const keys = tap_tap_keys;

const selectedSoundboard = computed(() => appStore.getSelectedSoundboard);
const pinos: Ref<Pino[] | undefined> = computed(() =>
  appStore.loadSoundsByType(soundboard.value as SoundboardType),
);

const minOctave = 1;
const maxOctave = 7;

const changeOctave = (key: string) => {
  if (octave.value && scale.value) {
    if (key === "z") octave.value--;
    else if (key === "x") octave.value++;

    if (octave.value < minOctave) octave.value = maxOctave;

    if (octave.value > maxOctave) octave.value = minOctave;

    appStore.setOctave(octave.value);
    scale.value = determineScale(notes[scaleIndex.value], octave.value);
  }
};

const scaleIndex = ref(0);

const changeScale = (key: string) => {
  if (key === "v") scaleIndex.value++;
  else scaleIndex.value--;

  if (scaleIndex.value < 0) scaleIndex.value = notes.length - 1;

  if (scaleIndex.value >= notes.length) scaleIndex.value = 0;

  scale.value = determineScale(notes[scaleIndex.value], octave.value ?? 1);
};

const currentlyPlaying = ref({} as Howl);

onKeyUp(
  keys,
  (e: KeyboardEvent) => ignoreTextBox(e) ?? currentlyPlaying.value.stop(),
);

const ignoreTextBox = (event: Event): boolean => {
  var target = event.target as Element;
  var targetTagName = target!.tagName ? target.tagName.toUpperCase() : "";
  return /INPUT|SELECT|TEXTAREA/.test(targetTagName);
};

onKeyStroke(
  keys,
  (e: KeyboardEvent) => {
    if (ignoreTextBox(e)) return;

    const key = e.key;

    const pino = pinos.value!.find((p: any) => p.key!.includes(key))!;

    if (selectedSoundboard.value.key === "piano") {
      if (key === "z" || key === "x") {
        changeOctave(key);
        return;
      }
      if (key === "c" || key === "v") {
        changeScale(key);
        return;
      }
      currentlyPlaying.value = pino.pitches?.find(
        (x) => x.octave === octave.value,
      )?.sound!;

      pino!.color.forEach((color: any, index: any) => {
        anime(createAnimation(determineNoteOctave(pino, index), color));
      });
    } else {
      currentlyPlaying.value = pino.pitch?.sound!;

      anime(
        createTapTapAnimation(
          pino!.note,
          typeof pino!.color === "object" ? pino!.color[0] : pino!.color,
        ),
      );
    }

    currentlyPlaying.value.play();
  },
  { dedupe: true },
);

const loadSounds = () => {
  messageStore.showToast(toast.loaded(soundboard.value!), "success");
};

const messageStore = useMessageStore();
onMounted(() => {
  loadSounds();
});

// TODO display variable amount of octaves
// const availableOctaves = ref(2);

const determineNoteOctave = (currentPino: Pino, currentIndex: number) => {
  return `${
    currentPino.accidental
      ? currentPino.note.split("_")[currentIndex]
      : currentPino.note
  }${
    !currentPino.accidental
      ? "-" +
        currentPino.pitches?.find((x) => x.octave === octave.value!)?.octave
      : ""
  }`;
};
</script>

<template>
  <div v-if="selectedSoundboard.key === 'piano'" class="d-flex justify-center">
    <div v-for="(p, index) in pinos" :key="index" class="d-flex">
      <DrawPianoKey
        v-for="(color, index) in p.color"
        :key="index"
        :background="color"
        :target="determineNoteOctave(p, index)"
        :css-class="p.accidental ? 'enharmonic' : 'non-enharmonic'"
        :text="determineNoteOctave(p, index)"
      ></DrawPianoKey>
    </div>
  </div>
  <div v-else class="d-flex flex-wrap mx-2">
    <div
      v-for="(p, index) in pinos"
      class="d-flex flex-wrap pa-1"
      :key="index"
      height="700"
    >
      <DrawTapTapKey
        :target="p.note"
        :text="p.note"
        :background="p.color.toString()"
      ></DrawTapTapKey>
    </div>
  </div>
</template>

<style>
.enharmonic {
  height: 60px;
  width: 25px;
  border: 1px solid black;
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

.tap-tap-item {
  /* background-color: #ff00aa; */
  width: 85px;
  height: 50px;
}
</style>
