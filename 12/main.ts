import {
  makeConnections,
  readMap,
  simpleWalk,
  toAZ,
  toMapNodes,
  Vec,
} from './utlis'

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const calc = (file: string): number => {
  let { map: primMap, start, end } = readMap(file)

  const map = makeConnections(toMapNodes(primMap))

  const [finisher] = simpleWalk([start], end, map)
  // console.log(finisher)

  const drawMap = primMap.map((line) => line.map((value) => toAZ(value) + ' '))

  finisher?.steps.forEach(([x, y]) => {
    drawMap[y]![x] = '🤸'
  })

  drawMap.forEach((line) => console.log(line.join('')))

  return finisher?.visited || Infinity
}

export const calcB = (file: string): number => {
  let { map: primMap, end } = readMap(file)

  const startPoss = primMap.flatMap((line, y) =>
    line.flatMap((value, x) => (value === 0 ? [[x, y] as Vec] : [])),
  )

  const map = makeConnections(toMapNodes(primMap))
  const [finisher] = simpleWalk(startPoss, end, map)
  // console.log(finisher)

  const drawMap = primMap.map((line) => line.map((value) => toAZ(value) + ' '))

  finisher?.steps.forEach(([x, y]) => {
    drawMap[y]![x] = '🤸'
  })

  drawMap.forEach((line) => console.log(line.join('')))

  return finisher?.visited || Infinity
}
