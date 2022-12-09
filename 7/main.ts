import { convertToTree, parseLines, sum, sumDirSize } from './utlis'

export const calc = (file: string): number => {
  const fileTree = convertToTree(file.split('\n').map(parseLines))
  return sum(sumDirSize(fileTree).filter((i) => i < 100_000))
}

export const calcB = (file: string): number => {
  const fileTree = convertToTree(file.split('\n').map(parseLines))
  const dirList = sumDirSize(fileTree)
  const [root = 0] = dirList

  const availableSpace = 70_000_000 - root
  const reqSpace = 30_000_000 - availableSpace
  const sortedDirList = dirList.sort((a, b) => a - b)
  const targetDir = sortedDirList.find((size) => size > reqSpace) || 0

  return targetDir || 0
}
