import { readFileSync } from 'fs'
import { addMarkers, inOrder, inOrderSort, mergeAll, readFile } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')
const input = readFileSync('./input.txt', 'utf-8')
const testOutput = readFileSync('./testoutput.txt', 'utf-8')

describe('utils', () => {
  it.skip('readFile', () => {
    expect(readFile(testinput)).toStrictEqual([
      { a: [1, 1, 3, 1, 1], b: [1, 1, 5, 1, 1] },
      { a: [[1], [2, 3, 4]], b: [[1], 4] },
      { a: [9], b: [[8, 7, 6]] },
      { a: [[4, 4], 4, 4], b: [[4, 4], 4, 4, 4] },
      { a: [7, 7, 7, 7], b: [7, 7, 7] },
      { a: [], b: [3] },
      { a: [[[]]], b: [[]] },
      {
        a: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        b: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
      },
    ])
  })

  it('inOrder', () => {
    expect(inOrder({ a: [1, 1, 3, 1, 1], b: [1, 1, 5, 1, 1] })).toBeTruthy()
    expect(inOrder({ a: [1, 1, 5, 1, 1], b: [1, 1, 3, 1, 1] })).toBeFalsy()

    expect(inOrder({ a: [[1], [2, 3, 4]], b: [[1], 4] })).toBeTruthy()
    expect(inOrder({ a: [[1], 4], b: [[1], [2, 3, 4]] })).toBeFalsy()
  })

  it('inOrder realData', () => {
    const res = readFile(input).slice(0, 5).map(inOrder)

    expect(res[0]).toBeFalsy()
    expect(res[1]).toBeTruthy()
    expect(res[2]).toBeFalsy()
    expect(res[3]).toBeTruthy()
    expect(res[4]).toBeFalsy()
  })

  it('mergeAll', () => {
    expect(mergeAll(readFile(testinput))).toHaveLength(16)
  })

  it('addMarkers', () => {
    expect(addMarkers([[4]])).toStrictEqual([[[2]], [4], [[6]]])
  })

  it('inOrderSort', () => {
    expect([[2], [3], [1]].sort(inOrderSort)).toStrictEqual([[1], [2], [3]])
    expect([[1, 2], [3], [1]].sort(inOrderSort)).toStrictEqual([
      [1],
      [1, 2],
      [3],
    ])
  })

  it('inOrderSort example file', () => {
    const res = addMarkers(mergeAll(readFile(testinput))).sort(inOrderSort)
    expect(res.map((v) => JSON.stringify(v)).join('\n')).toStrictEqual(
      testOutput,
    )
  })
})
