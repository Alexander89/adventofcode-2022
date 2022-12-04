import {
  splitElves,
  createRanges,
  isElvesTeam,
  filterFullyOverlay,
  filterPartialOverlay,
} from './utlis'

export const calc = (file: string): number =>
  file
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => splitElves(line).map(createRanges))
    .filter(isElvesTeam)
    .filter(filterFullyOverlay).length

export const calcB = (file: string): number =>
  file
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => splitElves(line).map(createRanges))
    .filter(isElvesTeam)
    .filter(filterPartialOverlay).length
