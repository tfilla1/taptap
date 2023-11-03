export class Pitch {
  octave: number;
  source: string;
  constructor(octave: number, source: string) {
    this.octave = octave;
    this.source = source;
  }
}

export class Pino {
  note: string | string[];
  key?: string[];
  pitches: Pitch[];
  color: string;
  border?: string;
  enharmonics?: boolean;

  constructor(
    note: string[],
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
