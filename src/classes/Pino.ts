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
  note: string | string[];
  key?: string[];
  color: string;
  border?: string;

  constructor(
    sound: Sound[],
    note: string[],
    color: string,
    border?: string,
    key?: string[],
  ) {
    this.sound = sound;
    this.key = key ?? [];
    this.note = note;
    this.color = color;
    this.border = border ?? '';
  }
}
