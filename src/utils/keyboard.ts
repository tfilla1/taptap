export const white_keys = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l"
]

export const black_keys = [
  "w",
  "e",
  "t",
  "y",
  "u",
  "o",
];

export const piano_keys = [
  "a",
  "w",
  "s",
  "e",
  "d",
  "f",
  "t",
  "g",
  "y",
  "h",
  "u",
  "j",
  "k",
  "o",
  "l"
]

export const mod_keys = [
  "z",
  "x",
  "c",
  "v",
]

export const tap_one_keys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
]

export const tap_two_keys = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";"
]

export const tap_three_keys = [
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/"
]

const white_keys_modified = white_keys.map(wk => ({
  letter: wk,
  enharmonics: false
}))
const black_keys_keys_modified = black_keys.map(bk => ({
  letter: bk,
  enharmonics: true
}))

export const the_keys = white_keys_modified.concat(black_keys_keys_modified)

export const tap_tap_keys = tap_one_keys.concat(tap_two_keys.concat(tap_three_keys))
export const tap_tap_keys_modified = tap_tap_keys.map(ttk => ({ letter: ttk, enharmonics: false }))
