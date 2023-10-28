import { Howl } from "howler";
import Pino from "@/classes/Pino";

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

  drawKeys (keyboard: number, boardBottomY: number, key: number, minor: number, board: number, boardY: number) {
    for (const p of this.pinos) {
      console.log({ p });

      if (p.semitone) {
        this.colorRect(keyboard, boardBottomY, minor * 2, board / 2, p.color);
        this.drawRect(keyboard, boardBottomY, minor * 4, board / 2, '#000');
      } else {
        this.colorRect(keyboard, boardY, key + minor, board, p.color);
        this.drawRect(keyboard, boardY, key + minor, board, "#000");
      }

      if (typeof p.note === "string") {
        this.fillText(
          p.note,
          "18px sans-serif",
          "black",
          false,
          keyboard,
          boardY + minor,
          100
        );
      } else {
        this.fillText(
          p.note.join("/"),
          "18px sans-serif",
          "black",
          false,
          keyboard,
          575,
          100
        );
      }

      keyboard += p.semitone ? minor : key;

      console.log(typeof p.note);
    }
  }
  draw() {
    const boardY = 450;
    const boardBottomY = 500;
    const board = 100;
    const key = 40;
    const minor = 20;

    const keyboard = 0;

    this.colorRect(0, 0, this.canvas.width, this.canvas.height, "#8c9");
    this.colorRect(0, boardY, this.canvas.width, board, "#c8f");

    console.log({ pinos: this.pinos });
    console.log({ octave: this.octave });
    // const kb = this.pinos.filter(p => !p.semitone)
    // const semitones = this.pinos.filter(p => p.semitone)

    // console.log({kb})
    // console.log({semitones})
    this.drawKeys(keyboard, boardBottomY, key, minor, board, boardY)
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
