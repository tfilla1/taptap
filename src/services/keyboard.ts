
import { Howl } from 'howler'
export class Keyboard {
  notes: Note[]
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(notes: Note[]) {
    this.canvas = document.getElementById('thng') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.notes = notes
  }

  init() {
    console.log('hello world, welcome to keybored')
  }

  colorRect(topLeftX: number, topLeftY: number, boxWidth: number, boxHeight: number, fillColor: string) {
    this.context!.fillStyle = fillColor;
    this.context!.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  drawRect(topLeftX: number, topLeftY: number, boxWidth: number, boxHeight: number, strokeColor: string) {
    this.context!.strokeStyle = strokeColor;
    this.context!.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }
  draw() {
    const board = 100;
    const key = 40;

    this.colorRect(0, 0, this.canvas.width, this.canvas.height, '#8c9');
    this.colorRect(0, 0, this.canvas.width, board, '#c8f');

    for (let i = 0; i < 17; i++) {
      this.drawRect(i * key, 0, key, board, '#f0a');
    }
  }
}

class Note {
  letter: string
  color: string
  sound: Howl
  constructor(letter: string, color: string, sound: Howl) {
    this.letter = letter
    this.color = color
    this.sound = sound
  }
}
