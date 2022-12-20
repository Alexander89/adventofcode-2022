import { stdout } from 'process'

export const toNumber = (char: string): number => parseInt(char, 10)

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const add = (a: number, b: number): number => a + b

export const trim = (str: string): string => str.trim()

export type Vec = [number, number]
export type Line = [Vec, Vec]

export const newLine = (a: string, b: string): Line => [
  a.split(',').map(toNumber) as Vec,
  b.split(',').map(toNumber) as Vec,
]

export const readFile = (file: string): Array<Line> =>
  file.split('\n').flatMap(
    (line) =>
      line
        .split('->')
        .map(trim)
        .reduce<{ last: undefined | string; list: Array<Line> }>(
          ({ last, list }, value) => ({
            last: value,
            list: last ? [...list, newLine(last, value)] : list,
          }),
          { last: undefined, list: [] },
        ).list,
  )

export const doCollides = (line: Line) => (dot: Vec) => {
  // vertical line
  if (line[0][0] === line[1][0]) {
    const right = Math.max(line[0][1], line[1][1])
    const left = Math.min(line[0][1], line[1][1])

    return dot[0] === line[0][0] && dot[1] >= left && dot[1] <= right
  } else {
    const top = Math.max(line[0][0], line[1][0])
    const bottom = Math.min(line[0][0], line[1][0])

    return dot[1] === line[0][1] && dot[0] >= bottom && dot[0] <= top
  }
}

type Size = { x: number; y: number; w: number; h: number }

export const drawMap =
  (
    size: Size,
    doCollideLines: (dot: Vec) => boolean,
    doCollideDot: (dot: Vec) => boolean,
  ) =>
  () => {
    for (let y = size.y - 1; y <= size.h + 2; y++) {
      for (let x = size.x - 1; x <= size.w + 1; x++) {
        stdout.write(
          doCollideLines([x, y]) ? '#' : doCollideDot([x, y]) ? 'o' : '.',
        )
      }
      stdout.write('\n')
    }
  }

export const calcSize = (lines: Line[]): Size =>
  lines.reduce(
    ({ x, y, w, h }, l) => ({
      x: Math.min(x, l[0][0], l[1][0]),
      y: Math.min(y, l[0][1], l[1][1]),
      w: Math.max(w, l[0][0], l[1][0]),
      h: Math.max(h, l[0][1], l[1][1]),
    }),
    { x: 1000, y: 1000, w: 0, h: 0 },
  )

export const calcSizeDots = (dots: Vec[]): Size =>
  dots.reduce(
    ({ x, y, w, h }, l) => ({
      x: Math.min(x, l[0]),
      y: Math.min(y, l[1]),
      w: Math.max(w, l[0]),
      h: Math.max(h, l[1]),
    }),
    { x: 1000, y: 1000, w: 0, h: 0 },
  )
