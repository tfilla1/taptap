export class Pitch {
  octave: number;
  source: string;
  sound?: Howl;
  accidental?: boolean;
  constructor(octave: number, source: string, sound?: Howl, accidental?: boolean) {
    this.octave = octave;
    this.source = source;
    this.sound = sound ?? undefined;
    this.accidental = accidental ?? false;
  }
}


export type ScalePosition = 'TONIC' | 'SUPERTONIC' | 'MEDIANT' | 'SUBDOMINANT' | 'DOMINANT' | 'SUBMEDIANT' | 'SUBTONIC'
export class Pino {
  note: string;
  key?: string;
  color: string[];
  border?: string;
  accidental?: boolean
  position?: ScalePosition
  pitch?: Pitch; // taptap boards will have just one pitch... for now
  pitches?: Pitch[]; // pino/midi currently needs an array of pitches to search

  constructor(
    note: string,
    key: string,
    color: string[],
    border: string = '',
    accidental?: boolean,
    position?: ScalePosition,
    pitch: Pitch = {} as Pitch
  ) {
    this.note = note;
    this.key = key;
    this.color = color;
    this.border = border ?? '';
    this.accidental = accidental;
    this.position = position;
    this.pitch = pitch ?? {} as Pitch;
  }
}

type instrument = 'drum' | 'piano' | 'guitar'
export type SoundboardType = "midi" | "piano" | "taptap";

export class Soundboard {
  key: string
  pinos: Pino[]
  icon: string
  instrument: instrument

  constructor(key: 'piano' | 'taptap' | 'other', pinos: Pino[], instrument: instrument, icon: string) {
    this.key = key
    this.pinos = pinos
    this.icon = icon
    this.instrument = instrument
  }

}
