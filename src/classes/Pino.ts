export class Pitch {
  octave: number;
  source: string;
  constructor(octave: number, source: string) {
    this.octave = octave;
    this.source = source;
  }
}

export class Pino {
  pitches: Pitch[];
  note: string | string[];
  color: string;
  key?: string[];
  border?: string;
  enharmonics?: boolean;

  constructor(
    pitches: Pitch[],
    note: string[],
    color: string,
    border?: string,
    key?: string[],
    enharmonics?: boolean
  ) {
    this.pitches = pitches;
    this.key = key ?? [];
    this.note = note;
    this.color = color;
    this.border = border ?? '';
    this.enharmonics = enharmonics ?? false;
  }
}
