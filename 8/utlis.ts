export type Vec = [number, number]
export type MoveFn = (pos: Vec) => Vec
export type TreeMap = Array<Array<number>>

export const toNumber = (char: string): number => parseInt(char, 10)

export const parseLines = (line: string): Array<number> =>
  line.split('').map(toNumber)

export const findTree =
  (moveFn: MoveFn, map: TreeMap) =>
  (pos: Vec): Array<Vec> => {
    let currentPos = pos
    let maxTreeSize = -1
    const largeTrees: Array<Vec> = []

    for (;;) {
      const [x, y] = currentPos

      const isOutOfMap =
        y >= map.length || x >= map[0]!.length || y < 0 || x < 0

      if (isOutOfMap) {
        return largeTrees
      }

      const size = map[y]![x]!
      if (size > maxTreeSize) {
        maxTreeSize = size
        largeTrees.push([x, y])
      }
      currentPos = moveFn(currentPos)
    }
  }

export const countTree = (moveFn: MoveFn, map: TreeMap, max: number) => {
  const width = map[0]?.length || 0
  const height = map.length || 0
  return (pos: Vec): number => {
    let currentPos = pos
    let visibleTrees = 0

    for (;;) {
      currentPos = moveFn(currentPos)
      const [x, y] = currentPos

      const isOutOfMap = y >= height || x >= width || y < 0 || x < 0
      if (isOutOfMap) {
        return visibleTrees
      }
      visibleTrees += 1

      const size = map[y]![x]!

      if (size >= max) {
        return visibleTrees
      }
    }
  }
}

const toTreeId = ([x, y]: Vec): string => `${x},${y}`
const moveDown = ([x, y]: Vec): Vec => [x, y + 1]
const moveUp = ([x, y]: Vec): Vec => [x, y - 1]
const moveRight = ([x, y]: Vec): Vec => [x + 1, y]
const moveLeft = ([x, y]: Vec): Vec => [x - 1, y]

export const walkAround = (map: TreeMap): number => {
  const width = map[0]?.length || 0
  const height = map.length || 0

  const top = Array(width)
    .fill([0, 0])
    .map(([, y], i): Vec => [i, y])

  const left = Array(height)
    .fill([0, 0])
    .map(([x], i): Vec => [x, i])

  const bottom = Array(width)
    .fill([0, height - 1])
    .map(([, y], i): Vec => [i, y])

  const right = Array(height)
    .fill([width - 1, 0])
    .map(([x], i): Vec => [x, i])

  const topToBottom = top.flatMap(findTree(moveDown, map)).map(toTreeId)
  const bottomToTop = bottom.flatMap(findTree(moveUp, map)).map(toTreeId)
  const leftToRight = left.flatMap(findTree(moveRight, map)).map(toTreeId)
  const rightToLeft = right.flatMap(findTree(moveLeft, map)).map(toTreeId)

  const allTrees = [
    ...topToBottom,
    ...bottomToTop,
    ...leftToRight,
    ...rightToLeft,
  ]

  const allUniqueTrees = new Set(allTrees)
  return allUniqueTrees.size
}

export const generateAllTrees = (map: TreeMap): Array<Vec> => {
  const width = map[0]?.length || 0
  const height = map.length || 0

  return Array(width - 2)
    .fill(0)
    .flatMap((_, x) =>
      Array(height - 2)
        .fill(x + 1)
        .map((x, y): Vec => [x, y + 1]),
    )
}

export const scoreTrees =
  (map: TreeMap) =>
  (treePos: Vec): number => {
    const [ownX, ownY] = treePos
    const ownSize = map[ownY]![ownX]!

    const down = countTree(moveDown, map, ownSize)(treePos)
    const up = countTree(moveUp, map, ownSize)(treePos)
    const right = countTree(moveRight, map, ownSize)(treePos)
    const left = countTree(moveLeft, map, ownSize)(treePos)

    return down * up * right * left
  }
