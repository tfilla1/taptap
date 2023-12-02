export const white_keys = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l"]

export const black_keys = [
  "w",
  "e",
  "t",
  "y",
  "u",
  "o",
];

export const mod_keys = [
  "z",
  "x",
  "c",
  "v",
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
