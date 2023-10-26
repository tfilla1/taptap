
import { Howl } from 'howler'
import Pino from '@/classes/Pino'

export class Keyboard {
  pinos: Pino[]
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(pinos: Pino[]) {
    this.canvas = document.getElementById('pinot') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.pinos = pinos
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
    const minor = 20;

    this.colorRect(0, 0, this.canvas.width, this.canvas.height, '#8c9');
    this.colorRect(0, 0, this.canvas.width, board, '#c8f');

    for (const p of this.pinos) {
      console.log({p})
    }

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
