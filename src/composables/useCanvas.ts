import { SIZE } from '../constants/size'

import { useTheme } from 'vuetify'

import { Vertex } from '@/classes/Vertex'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
export default function useCanvas() {
  const canvas: ComputedRef<HTMLCanvasElement> = computed(() => document.getElementById('canvas') as HTMLCanvasElement)
  const context: ComputedRef<CanvasRenderingContext2D> = computed(() => canvas.value?.getContext('2d') as CanvasRenderingContext2D)

  const theme = useTheme()
  const centerX = computed(() => SIZE.CANVAS / 2)
  const centerY = computed(() => SIZE.CANVAS / 2)

  function drawBackground() {
    context.value.clearRect(SIZE.SAFETY, SIZE.SAFETY, SIZE.CANVAS, SIZE.CANVAS);
    drawBrick(theme.current.value.colors.surface, theme.current.value.colors.surface, 0, 0, SIZE.CANVAS);
  }

  function drawBall(color: string, background: string, x: number, y: number, size: number) {
    context.value.beginPath() // Begin a new path
    context.value.arc(x, y, size, 0, Math.PI * 2, false) // Draw the arc (circle)
    setColor(color, background)
    context.value.fill() // Fill the circle
    context.value.closePath() // Close the path
  }

  function drawBrick(
    color: string,
    background: string,
    x: number,
    y: number,
    size: number,
    text?: string
  ) {

    if (context.value) {
      const textBump = 20

      setColor(background, background)

      context.value.strokeRect(x, y, size, size)
      context.value.fillRect(x, y, size, size)

      if (text) {
        setColor(color, color)
        saySomething(text, x + textBump, y + textBump)
      }
    }
  }
  function drawPaddle(
    color: string,
    background: string,
    x: number,
    y: number
  ): Vertex {

    if (context.value) {
      const textBump = 20

      setColor(background, background)

      context.value.strokeRect(x, y, SIZE.BRICK, SIZE.PADDLE)
      context.value.fillRect(x, y, SIZE.BRICK, SIZE.PADDLE)
    }
    return { x, y } as Vertex
  }
  function saySomething(
    text: string,
    x: number,
    y: number,
    font: string = '30px Arial',
    size: number = 20
  ) {
    if (context.value) {
      context.value.font = font
      context.value.fillText(text, x, y, size)
    }
  }
  function setColor(
    color: string = theme.current.value.colors.surface,
    background: string = 'pink'
  ) {

    if (context.value) {
      context.value.fillStyle = background
      context.value.strokeStyle = color
    }
  }

  return {
    canvas,
    context,
    centerX,
    centerY,
    drawBackground,
    drawBall,
    drawBrick,
    drawPaddle,
    saySomething,
    setColor
  }
}
