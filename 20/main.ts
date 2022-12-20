import {
  parseFile,
  iterAdd,
  find,
  shuffleList,
  shuffleRing,
  resetNodes,
  toRing,
  findInRing,
  iterAddRing,
  drawRing,
  // drawRing,
} from './utlis'

export const calc = (file: string): number => {
  const list = parseFile(file)

  shuffleList(list)
  const ring = toRing(parseFile(file))
  shuffleRing(ring)

  const start = find(list, 0)
  const startRing = findInRing(ring.entry, 0)

  if (start === undefined || startRing === undefined) {
    throw new Error('start not found')
  }
  const a = iterAdd(list, start, 1000)
  const b = iterAdd(list, start, 2000)
  const c = iterAdd(list, start, 3000)

  const ar = iterAddRing(startRing, 1000)
  const br = iterAddRing(startRing, 2000)
  const cr = iterAddRing(startRing, 3000)

  console.log(a, b, c, '=', a + b + c)
  console.log(ar.value, br.value, cr.value, '=', ar.value + br.value + cr.value)

  return a + b + c
}

export const calcB = (file: string): number => {
  const ring = toRing(parseFile(file, 811589153))

  console.log(`Initial arrangement:`)
  drawRing(ring)
  for (let i = 0; i < 10; i++) {
    shuffleRing(ring, true)
    console.log(`After ${i + 1} round of mixing:`)
    drawRing(ring)
    resetNodes(ring)
  }

  const nullEntry = findInRing(ring.entry, 0)
  if (nullEntry === undefined) {
    throw new Error('start not found')
  }
  ring.entry = nullEntry
  drawRing(ring)
  const a = iterAddRing(nullEntry, 1000).value
  const b = iterAddRing(nullEntry, 2000).value
  const c = iterAddRing(nullEntry, 3000).value

  console.log(a, b, c, '=', a + b + c)

  return a + b + c
}
