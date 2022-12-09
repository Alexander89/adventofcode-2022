import { walkAround, parseLines, generateAllTrees, scoreTrees } from './utlis'

export const calc = (file: string): number => {
  const treeMap = file.split('\n').map(parseLines)
  return walkAround(treeMap)
}

export const calcB = (file: string): number => {
  const treeMap = file.split('\n').map(parseLines)

  const [maxScores = 0] = generateAllTrees(treeMap)
    .map(scoreTrees(treeMap))
    .sort((a, b) => b - a)
  return maxScores
}
