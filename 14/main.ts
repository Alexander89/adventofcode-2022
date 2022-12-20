import {
  calcSize,
  calcSizeDots,
  doCollides,
  drawMap,
  readFile,
  Vec,
} from './utlis'

export const calc = (file: string): number => {
  const lines = readFile(file)
  const size = calcSize(lines)
  const lineChecks = lines.map(doCollides)

  const doCollideLines = (dot: Vec): boolean =>
    lineChecks.some((check) => check(dot))
  const doCollideDot = (dot: Vec): boolean =>
    drops.some((drop) => drop[0] === dot[0] && drop[1] === dot[1])

  const drops: Array<Vec> = []
  let activeDrop: Vec = [500, 0]

  const doCollide = (dot: Vec) => doCollideLines(dot) || doCollideDot(dot)

  const draw = drawMap(size, doCollideLines, doCollideDot)

  for (;;) {
    const testDrop: Vec = [activeDrop[0], activeDrop[1] + 1]
    if (testDrop[1] > size.w + 1) {
      draw()
      return drops.length
    }

    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    testDrop[0] -= 1
    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    testDrop[0] += 2
    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    drops.push(activeDrop)
    activeDrop = [500, 0]
  }
}

export const calcB = (file: string): number => {
  const lines = readFile(file)
  const size = calcSize(lines)
  lines.push([
    [-Infinity, size.h + 2],
    [Infinity, size.h + 2],
  ])

  const lineChecks = lines.map(doCollides)

  const doCollideLines = (dot: Vec): boolean =>
    lineChecks.some((check) => check(dot))
  const doCollideDot = (dot: Vec): boolean =>
    drops.some((drop) => drop[0] === dot[0] && drop[1] === dot[1])

  const drops: Array<Vec> = []
  let activeDrop: Vec = [500, 0]

  const doCollide = (dot: Vec) => doCollideLines(dot) || doCollideDot(dot)

  for (;;) {
    const testDrop: Vec = [activeDrop[0], activeDrop[1] + 1]

    if (testDrop[1] > size.w + 1) {
      drawMap(calcSizeDots(drops), doCollideLines, doCollideDot)()
      return drops.length
    }

    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    testDrop[0] -= 1
    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    testDrop[0] += 2
    if (!doCollide(testDrop)) {
      activeDrop = testDrop
      continue
    }

    if (
      (activeDrop[0] === 500 && activeDrop[1] === 0) ||
      drops.length > 120000
    ) {
      drops.push(activeDrop)
      drawMap(calcSizeDots(drops), doCollideLines, doCollideDot)()
      return drops.length
    }
    drops.push(activeDrop)
    activeDrop = [500, 0]
  }
}
