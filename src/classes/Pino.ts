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

class Note {
  letter: string
  url: string

  constructor(letter: string, url: string) {
    this.letter = letter
    this.url = url
  }
}
class Octave {
  notes: Note[]

  constructor(notes: Note[]) {
    this.notes = notes
  }
}

export class Pino_Test {
  octave: Octave

  constructor(octave: Octave) {
    this.octave = octave
  }
}

export class Pino {
  note: string;
  key?: string[];
  pitches: Pitch[];
  color: string | string[];
  border?: string;
  enharmonics?: boolean;

  constructor(
    note: string,
    key: string[],
    pitches: Pitch[],
    color: string,
    border: string = '',
    enharmonics: boolean = false
  ) {
    this.note = note;
    this.key = key;
    this.pitches = pitches;
    this.color = color;
    this.border = border ?? '';
    this.enharmonics = enharmonics ?? false;
  }
}

export class Soundboard {
  type: 'piano' | 'taptap' | 'other'
  pinos: Pino[]

  constructor(type: 'piano' | 'taptap' | 'other', pinos: Pino[]) {
    this.type = type
    this.pinos = pinos
  }

}
