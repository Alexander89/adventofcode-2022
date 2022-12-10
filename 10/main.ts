import { stdout } from 'process'
import { drawFrameBuffer, parseLines } from './utlis'

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const calc = (file: string): number => {
  const instructions = file.split('\n').flatMap(parseLines)

  const values: Array<number> = []
  let x = 1

  for (let index = 0; index < instructions.length; index++) {
    const cmd = instructions[index]
    if (cmd === undefined) {
      break
    }

    const cmdNr = index + 1
    if ((cmdNr - 20) % 40 === 0) {
      console.log('cmdNr', cmdNr, 'x', x)
      values.push(x * cmdNr)
    }

    if (cmd.type === 'addx2') {
      x += cmd.value
    }
  }

  return sum(values)
}

export const calcB = (file: string): Array<number> => {
  const instructions = file.split('\n').flatMap(parseLines)

  let frameBuffer: Array<number> = drawFrameBuffer(instructions)
  for (let idx = 0; idx < frameBuffer.length; idx++) {
    const element = frameBuffer[idx]
    if (idx % 40 === 0) {
      stdout.write('\n')
    }
    stdout.write(element ? '🎁' : '🎄')
  }
  return frameBuffer
}
