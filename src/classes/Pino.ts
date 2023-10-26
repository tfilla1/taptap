class Sound {
  octave: string;
  source: string;
  constructor(octave: string, source: string) {
    this.octave = octave;
    this.source = source;
  }
}

export default class Pino {
  sound: Sound[];
  key: string[];
  note: string[];
  octave: string[];
  color: string;
  border: string;

  constructor(
    sound: Sound[],
    key: string[],
    note: string[],
    octave: string[],
    color: string,
    border: string
  ) {
    this.sound = sound;
    this.key = key;
    this.note = note;
    this.octave = octave;
    this.color = color;
    this.border = border;
  }
}
