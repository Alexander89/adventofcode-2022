type Command =
  | {
      type: 'cmd'
      cmd: 'ls'
    }
  | {
      type: 'cmd'
      cmd: 'cd'
      dir: string
    }

type DirEntry = {
  type: 'dir'
  name: string
}

type FileEntry = {
  type: 'file'
  name: string
  size: number
}

type Line = Command | DirEntry | FileEntry

export const parseLines = (line: string): Line => {
  const [first, second, third] = line.split(' ')
  if (first === '$') {
    if (second === 'ls') {
      return {
        type: 'cmd',
        cmd: second,
      }
    } else if (second === 'cd') {
      return {
        type: 'cmd',
        cmd: second,
        dir: third || '',
      }
    } else {
      throw new Error('Invalid command: ' + second)
    }
  } else if (first === 'dir') {
    return {
      type: 'dir',
      name: second || '',
    }
  } else {
    return {
      type: 'file',
      name: second || '',
      size: parseInt(first || '0'),
    }
  }
}

export type FileTree = {
  [key: string]: number | FileTree
}

export const convertToTree = (lines: Array<Line>): FileTree => {
  const innerConvertToTree = (
    lines: Array<Line>,
    tree: FileTree,
  ): [FileTree, number] => {
    for (let index = 0; index < lines.length; index++) {
      const element = lines[index]

      switch (element?.type) {
        case 'cmd':
          if (element.cmd === 'cd' && element.dir === '..') {
            return [tree, index + 1]
          } else if (element.cmd === 'cd') {
            const [branch, lineCount] = innerConvertToTree(
              lines.slice(index + 1),
              {},
            )
            index += lineCount
            tree[element.dir] = branch
          }
          // ignore ls
          break
        case 'dir':
          // ignore dir
          break
        case 'file':
          tree[element.name] = element.size
          break
      }
    }
    return [tree, lines.length]
  }
  return innerConvertToTree(lines, {})[0]
}

export const sum = (arr: Array<number>): number =>
  arr.reduce((acc, value) => acc + value, 0)

export const sumDirSize = (tree: FileTree): Array<number> => {
  const innerSumDirSize = (tree: FileTree): [number, Array<number>] => {
    const directContentSize = sum(
      Object.values(tree).filter(
        (entry): entry is number => typeof entry === 'number',
      ),
    )
    const subDir = Object.values(tree).filter(
      (entry): entry is FileTree => typeof entry === 'object',
    )

    const subDirs = subDir.map(innerSumDirSize)

    // sum up the size of all subdirs and merge all subDirFolderSizeLists into one
    const [subDirSize, allSubDirs] = subDirs.reduce<[number, Array<number>]>(
      ([accSize, accSubDirSize], [size, subDirSize]) => [
        accSize + size,
        [...accSubDirSize, ...subDirSize],
      ],
      [0, []],
    )

    const size = directContentSize + subDirSize
    return [size, [size, ...allSubDirs]]
  }
  return innerSumDirSize(tree)[1]
}
