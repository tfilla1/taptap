import { Pino } from "@/classes/Pino";
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

    for (const p of things) {
      console.log({ p });

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
          (p.note as string[]).join("/"),
          "18px sans-serif",
          "black",
          false,
          octave,
          575,
          100
        );
      }

      octave -= p.accidental ? minor : key;

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

    this.drawKeys(octave, boardBottomY, key, minor, board, boardY)

  }
}


