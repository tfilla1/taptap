class Sound {
  octave: number;
  source: string;
  constructor(octave: number, source: string) {
    this.octave = octave;
    this.source = source;
  }
}

export default class Pino {
  sound: Sound[];
  note: string | string[];
  color: string;
  key?: string[];
  border?: string;
  semitone?: boolean;

  constructor(
    sound: Sound[],
    note: string[],
    color: string,
    border?: string,
    key?: string[],
    semitone?: boolean
  ) {
    this.sound = sound;
    this.key = key ?? [];
    this.note = note;
    this.color = color;
    this.border = border ?? '';
    this.semitone = semitone ?? false;
  }
}
