import {
  readFile,
  inOrder,
  add,
  mergeAll,
  addMarkers,
  inOrderSort,
} from './utlis'

export const calc = (file: string): number =>
  readFile(file)
    .map(inOrder)
    .map((ok, idx) => ({ ok, idx }))
    .filter(({ ok }) => ok)
    .map(({ idx }) => idx + 1)
    .reduce(add, 0)

export const calcB = (file: string): number => {
  const res = addMarkers(mergeAll(readFile(file))).sort(inOrderSort)
  const marker2Idx = res.findIndex((r) => JSON.stringify(r) === '[[2]]') + 1
  const marker6Idx = res.findIndex((r) => JSON.stringify(r) === '[[6]]') + 1

  return marker2Idx * marker6Idx
}
