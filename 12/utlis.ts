export const toNumber = (char: string): number => parseInt(char, 10)

export const toAZNumber = (char: string): number =>
  char === 'S'
    ? 0
    : char === 'E'
    ? 1001
    : char.charCodeAt(0) - 'a'.charCodeAt(0)

export const toAZ = (charCode: number): string =>
  `${String.fromCharCode(charCode + 'a'.charCodeAt(0))}`

export const trim = (str: string): string => str.trim()

export type Vec = [number, number]
type Sides = 'top' | 'right' | 'bottom' | 'left'
type PrimitiveMap = Array<Array<number>>
type MapNodes = {
  value: number
  visitedMin: number
  connectedSides: Array<Sides>
}
type Map = Array<Array<MapNodes>>

export const setEToMax = (primMap: PrimitiveMap): PrimitiveMap => {
  const max = primMap.reduce(
    (acc, row) =>
      Math.max(
        acc,
        row.reduce(
          (acc2, value) => Math.max(acc2, value === 1001 ? 0 : value),
          0,
        ),
      ),
    0,
  )

  return primMap.map((row) =>
    row.map((value) => (value === 1001 ? max : value)),
  )
}

type InputData = {
  start: Vec
  end: Vec
  map: PrimitiveMap
}

export const readMap = (file: string): InputData => {
  const rawMap = file
    .split('\n')
    .map(trim)
    .map((line) => line.split(''))

  const width = rawMap[0]!.length

  const startPos = rawMap.flat().indexOf('S')
  const endPos = rawMap.flat().indexOf('E')

  const map = setEToMax(rawMap.map((line) => line.map(toAZNumber)))
  return {
    start: [startPos % width, Math.floor(startPos / width)],
    end: [endPos % width, Math.floor(endPos / width)],
    map,
  }
}

export const toMapNodes = (primMap: PrimitiveMap): Map =>
  primMap.map((line) =>
    line.map((value) => ({
      value,
      visitedMin: Infinity,
      connectedSides: [],
    })),
  )

export const makeConnections = (looseMap: Map): Map =>
  looseMap.map((row, rowIdx) =>
    row.map((node, columnIdx) => ({
      ...node,
      connectedSides: checkSides(columnIdx, rowIdx, looseMap),
    })),
  )

export const checkSides = (
  columnIdx: number,
  rowIdx: number,
  looseMap: Map,
): Array<Sides> => {
  const { value } = looseMap[rowIdx]![columnIdx]!

  const right = looseMap[rowIdx]![columnIdx + 1]
  const left = looseMap[rowIdx]![columnIdx - 1]
  const top = looseMap[rowIdx - 1]
    ? looseMap[rowIdx - 1]![columnIdx]
    : undefined
  const bottom = looseMap[rowIdx + 1]
    ? looseMap[rowIdx + 1]![columnIdx]
    : undefined

  const maxHeight = value + 1
  const res: Array<Sides> = []
  if (right && right.value <= maxHeight) {
    res.push('right')
  }
  if (left && left.value <= maxHeight) {
    res.push('left')
  }
  if (top && top.value <= maxHeight) {
    res.push('top')
  }
  if (bottom && bottom.value <= maxHeight) {
    res.push('bottom')
  }
  return res
}

export type Walker = {
  pos: Vec
  id: number
  visited: number
  blocked: boolean
  arrived: boolean
  steps: Array<Vec>
}

const mkWalker = (pos: Vec, visited: number): Walker => ({
  pos,
  id: 0,
  visited,
  blocked: false,
  arrived: false,
  steps: [],
})

export const simpleWalk = (
  starts: Array<Vec>,
  end: Vec,
  map: Map,
): Array<Walker> => {
  const walkers = starts.map((start) => mkWalker(start, 0))

  const deadWalkers: Array<Walker> = []

  for (;;) {
    const orgWalker = walkers.shift()
    if (!orgWalker) {
      break
    }
    // increase step counter
    orgWalker.visited += 1
    const [x, y] = orgWalker.pos

    const newWalkers = map[y]![x]!.connectedSides.flatMap((dir) => {
      const walker = JSON.parse(JSON.stringify(orgWalker))
      let pos: Vec = [0, 0]
      switch (dir) {
        case 'top':
          pos = [x, y - 1]
          break
        case 'right':
          pos = [x + 1, y]
          break
        case 'bottom':
          pos = [x, y + 1]
          break
        case 'left':
          pos = [x - 1, y]
          break
      }

      const [newX, newY] = pos
      walker.steps.push(pos)

      if (newX === end[0] && newY === end[1]) {
        walker.arrived = true
        deadWalkers.push(walker)
        return []
      }

      const point = map[newY]![newX]!

      if (point.visitedMin > walker.visited) {
        point.visitedMin = walker.visited
        walker.pos = [newX, newY]
        return walker
      } else {
        walker.blocked = true
        deadWalkers.push(walker)
      }
      return []
    })
    walkers.push(...newWalkers)
  }
  return deadWalkers
    .filter((walker) => walker.arrived)
    .sort((a, b) => a.visited - b.visited)
}
