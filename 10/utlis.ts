type AddX1 = { type: 'addx1' }
type AddX2 = { type: 'addx2'; value: number }
type Noop = { type: 'noop' }
type Cmd = AddX1 | AddX2 | Noop

export const toNumber = (char: string): number => parseInt(char, 10)

export const parseLines = (line: string): Array<Cmd> => {
  const [cmd = '', number = '0'] = line.split(' ')
  if (cmd === 'addx') {
    return [{ type: 'addx1' }, { type: 'addx2', value: toNumber(number) }]
  } else {
    return [{ type: 'noop' }]
  }
}

export const drawFrameBuffer = (instructions: Array<Cmd>): Array<number> => {
  let x = 1
  let frameBuffer: Array<number> = []

  for (let index = 0; index < instructions.length; index++) {
    const cmd = instructions[index]
    if (cmd === undefined) {
      break
    }

    const crtX = index % 40

    frameBuffer.push(Math.abs(crtX - x) <= 1 ? 1 : 0)

    if (cmd.type === 'addx2') {
      x += cmd.value
    }
  }
  return frameBuffer
}
