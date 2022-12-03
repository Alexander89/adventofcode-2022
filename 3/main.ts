import {
  splitCompartments,
  extractWrongPart,
  calcPrio,
  sortLines,
  makeGroups,
  completeGroups,
  findSharedItem,
} from './utlis'

export const calc = (file: string): number =>
  file
    .split('\n')
    .map(splitCompartments)
    .map(extractWrongPart)
    .reduce<number>((acc, line) => acc + calcPrio(line), 0)

export const calcB = (file: string) =>
  file
    .split('\n')
    .map(sortLines)
    .reduce(makeGroups, [[]])
    .filter(completeGroups)
    .map(findSharedItem)
    .reduce<number>((acc, line) => acc + calcPrio(line), 0)
