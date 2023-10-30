import { Howl } from "howler";
import Pino from "@/classes/Pino";
import _ from 'lodash';

export class Keyboard {
  pinos: Pino[];
  octave: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(pinos: Pino[], octave?: number) {
    this.canvas = document.getElementById("pinot") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!;
    this.pinos = pinos;
    this.octave = octave ?? 0;
  }

  init() {
    console.log("hello world, welcome to keybored");
  }

  colorRect(
    topLeftX: number,
    topLeftY: number,
    boxWidth: number,
    boxHeight: number,
    fillColor: string
  ) {
    this.context!.fillStyle = fillColor;
    this.context!.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  drawRect(
    topLeftX: number,
    topLeftY: number,
    boxWidth: number,
    boxHeight: number,
    strokeColor: string
  ) {
    this.context!.strokeStyle = strokeColor;
    this.context!.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  fillText(
    text: string,
    font: string,
    color: string,
    stroke: boolean,
    topLeftX: number,
    topLeftY: number,
    maxWidth: number
  ) {
    this.context!.font = font;
    this.context!.fillStyle = color;
    this.context!.strokeStyle = color;
    stroke
      ? this.context!.strokeText(text, topLeftX, topLeftY, maxWidth)
      : this.context!.fillText(text, topLeftX, topLeftY, maxWidth);
  }

  drawKeys(octave: number, boardBottomY: number, key: number, minor: number, board: number, boardY: number) {
    const things = _.orderBy(this.pinos, 'note', 'desc')
    console.log({ things })

    let previousWasEnharmonics = false
    for (const p of things) {
      console.log({ p });

      if (p.enharmonics) {
        previousWasEnharmonics = true

        // black keys -- enharmonics
        this.colorRect(octave, boardBottomY, minor, board / 2, p.color);
        this.drawRect(octave, boardBottomY, minor, board / 2, '#000');

      } else {

        if (previousWasEnharmonics) {
          // key related to an enharmonics key
          this.colorRect(octave - minor, boardY, key, board, p.color);
          // this.drawRect(octave + minor, boardY, key, board, "#000");

          // fill in space between enharmonic
          this.colorRect(octave + minor, boardY, key / 2, board / 2, p.color);
          console.log('prev')

          // this.colorRect(octave, 0, minor, board / 2, p.color);
          // this.drawRect(octave, 0, minor, board / 2, '#000');


          this.colorRect(octave + minor + minor, boardBottomY, minor, board / 2, p.color);
          this.drawRect(octave + minor + minor, boardBottomY, minor, board / 2, '#000');
        } else {
          // key with no previous enharmonics

          // this.colorRect(octave + minor, boardY, key, board, "#f0a");

          this.colorRect(octave - minor, boardY, key / 2, board / 2, p.color);
          this.colorRect(octave, boardY, key / 2, board, p.color);
          this.drawRect(octave - minor, boardY, key, board, "#000");
        }

        previousWasEnharmonics = false

      }

      if (typeof p.note === "string") {
        this.fillText(
          p.note,
          "18px sans-serif",
          "black",
          false,
          octave,
          boardY + minor,
          100
        );
      } else {
        this.fillText(
          p.note.join("/"),
          "18px sans-serif",
          "black",
          false,
          octave,
          575,
          100
        );
      }

      octave -= p.enharmonics ? minor : key;

      console.log(typeof p.note);
    }
  }
  draw() {
    const boardY = 450;
    const boardBottomY = 500;
    const board = 100;
    const key = 40;
    const minor = 20;

    const octave = 420;

    this.colorRect(0, 0, this.canvas.width, this.canvas.height, "#8c9");
    this.colorRect(0, boardY, this.canvas.width, board, "#c8f");

    console.log({ pinos: this.pinos });
    console.log({ octave: this.octave });
    // const kb = this.pinos.filter(p => !p.enharmonics)
    // const semitones = this.pinos.filter(p => p.enharmonics)

    // console.log({kb})
    // console.log({semitones})
    this.drawKeys(octave, boardBottomY, key, minor, board, boardY)
    // this.drawKeys(250, boardBottomY, key, minor, board, boardY)

  }
}

class Note {
  letter: string;
  color: string;
  sound: Howl;
  constructor(letter: string, color: string, sound: Howl) {
    this.letter = letter;
    this.color = color;
    this.sound = sound;
  }
}
