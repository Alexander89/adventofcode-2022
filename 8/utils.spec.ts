import { readFileSync } from 'fs'
import { parseLines, findTree, walkAround, TreeMap } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('env test', () => {
    expect(testinput).toBeDefined()
    expect(testinput.length).not.toStrictEqual(0)
  })

  it('parseLines', () => {
    const cmd = '12345'
    expect(parseLines(cmd)).toStrictEqual([1, 2, 3, 4, 5])
  })

  it('findTree', () => {
    const map = [
      [1, 2, 3, 4, 5, 4, 3, 2, 1],
      [1, 2, 3, 4, 3, 4, 3, 2, 1],
      [1, 9, 3, 4, 3, 4, 3, 2, 1],
    ]
    expect(findTree(([x, y]) => [x + 1, y], map)([0, 0])).toHaveLength(5)
    expect(findTree(([x, y]) => [x + 1, y], map)([0, 1])).toHaveLength(4)
    expect(findTree(([x, y]) => [x + 1, y], map)([0, 2])).toHaveLength(2)

    expect(findTree(([x, y]) => [x, y + 1], map)([0, 0])).toHaveLength(1)
    expect(findTree(([x, y]) => [x, y + 1], map)([1, 0])).toHaveLength(2)
    expect(findTree(([x, y]) => [x, y + 1], map)([2, 0])).toHaveLength(1)
  })

  it('walkAround', () => {
    const map: TreeMap = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 9, 3],
    ]
    expect(walkAround(map)).toStrictEqual(9)

    const map2: TreeMap = [
      [2, 2, 3],
      [2, 1, 3],
      [2, 2, 3],
    ]
    expect(walkAround(map2)).toStrictEqual(8)
  })
})
