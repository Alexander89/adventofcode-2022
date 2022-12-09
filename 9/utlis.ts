export type Vec = [number, number]

export type Particles = {
  head: [number, number]
  tail: [number, number]
}

type Direction = 'R' | 'L' | 'U' | 'D'

export const toIdx = ([x, y]: Vec): string => `${x},${y}`
export const toNumber = (char: string): number => parseInt(char, 10)
export const isDirection = (char: string): char is Direction =>
  ['R', 'L', 'U', 'D'].includes(char)

export const parseLines = (line: string): Array<Direction> => {
  const [direction = '', amount = '0'] = line.split(' ')

  if (!isDirection(direction)) {
    throw new Error('wrong instruction')
  }
  return Array(toNumber(amount)).fill(direction)
}

export const moveHead = (
  { head, tail }: Particles,
  dir: Direction,
): Particles => {
  const headPos = ([x, y]: Vec): Vec => {
    switch (dir) {
      case 'R':
        return [x + 1, y]
      case 'U':
        return [x, y + 1]
      case 'D':
        return [x, y - 1]
      case 'L':
        return [x - 1, y]
    }
  }
  return {
    head: headPos(head),
    tail,
  }
}

const isTouching = ([hX, hY]: Vec, [x, y]: Vec): boolean =>
  Math.abs(hX - x) <= 1 && Math.abs(hY - y) <= 1

export const tailPos = ([hX, hY]: Vec, [x, y]: Vec): Vec => {
  // don't move tail if head is touching
  if (isTouching([hX, hY], [x, y])) {
    return [x, y]
  }

  if (hX !== x && hY !== y) {
    const yMove = hY > y ? 1 : -1
    const xMove = hX > x ? 1 : -1

    return [x + xMove, y + yMove]
    // diagonal
  } else {
    // horizontal or vertical
    if (hX > x) {
      return [x + 1, y]
    }
    if (hX < x) {
      return [x - 1, y]
    }
    if (hY > y) {
      return [x, y + 1]
    }
    if (hY < y) {
      return [x, y - 1]
    }
  }

  return [x, y]
}

export const moveTail = ({ head, tail }: Particles): Particles => {
  return { head, tail: tailPos(head, tail) }
}
