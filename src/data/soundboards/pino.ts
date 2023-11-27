import { Pino } from "@/classes/Pino";

export const pianoData: Pino[] = [
  {
    note: "C",
    key: ['a', 'A', 'k', 'K'],
    color: "#EB3F33",
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 7-1.mp3`,
      },
      {
        octave: 8,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 8-1.mp3`,
        // source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ C 8-1.mp3`,
      },
    ],
  },
  {
    note: "CS_DB",
    key: ['w', 'W', 'o', 'O'],
    color: ["#F28500", '#EB3F33'],
    enharmonics: true,
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ CS_Db 7-1.mp3`,
      },
    ],
  },
  {
    note: "D",
    key: ['s', 'S', 'l', 'L'],
    color: "#F28500",
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ D 7-1.mp3`,
      },
    ],
  },
  {
    note: "DS_EB",
    key: ['e', 'E'],
    enharmonics: true,
    color: ["#FFEE00", '#F28500'],
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ DS_Eb 7-1.mp3`,
      },
    ],
  },
  {
    note: "E",
    key: ['d', 'D'],
    color: "#FFEE00",
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ E 7-1.mp3`,
      },
    ],
  },
  {
    note: "F",
    key: ['f', 'F'],
    color: "#16A22D",
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ F 7-1.mp3`,
      },
    ],
  },
  {
    note: "FS_GB",
    key: ['t', 'T'],
    enharmonics: true,
    color: ["#0000E0", '#16A22D'],
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ FS_Gb 7-1.mp3`,
      },
    ],
  },
  {
    note: "G",
    key: ['g', 'G'],
    color: "#0000E0",
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ G 7-1.mp3`,
      },
    ],
  },
  {
    note: "GS_AB",
    key: ['y', 'Y'],
    enharmonics: true,
    color: ["#7C43B1", '#0000E0'],
    pitches: [
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ GS_Ab 7-1.mp3`,
      },
    ],
  },
  {
    note: "A",
    key: ['h', 'H'],
    color: "#7C43B1",
    pitches: [
      {
        octave: 0,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 0-1.mp3`,
      },
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ A 7-1.mp3`,
      },
    ],
  },
  {
    note: "AS_BB",
    key: ['u', 'U'],
    enharmonics: true,
    color: ["#F976A6", "#7C43B1"],
    pitches: [
      {
        octave: 0,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 0-1.mp3`,
      },
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ AS_Bb 7-1.mp3`,
      },
    ],
  },
  {
    note: "B",
    key: ['j', 'J'],
    color: "#F976A6",
    pitches: [
      {
        octave: 0,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 0-1.mp3`,
      },
      {
        octave: 1,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 1-1.mp3`,
      },
      {
        octave: 2,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 2-1.mp3`,
      },
      {
        octave: 3,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 3-1.mp3`,
      },
      {
        octave: 4,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 4-1.mp3`,
      },
      {
        octave: 5,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 5-1.mp3`,
      },
      {
        octave: 6,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 6-1.mp3`,
      },
      {
        octave: 7,
        source: `${import.meta.env.VITE_SOUNDS_DIR}/piano/_ B 7-1.mp3`,
      },
    ],
  },
];
