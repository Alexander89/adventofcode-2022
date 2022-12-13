import { readFileSync } from 'fs'
import { readMap, checkSides, toMapNodes, makeConnections } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('readMap', () => {
    expect(readMap(testinput)).toStrictEqual({
      start: [0, 0],
      end: [5, 2],
      map: [
        [0, 0, 1, 16, 15, 14, 13, 12],
        [0, 1, 2, 17, 24, 23, 23, 11],
        [0, 2, 2, 18, 25, 26, 23, 10],
        [0, 2, 2, 19, 20, 21, 22, 9],
        [0, 1, 3, 4, 5, 6, 7, 8],
      ],
    })
  })

  it('toMapNodes', () => {
    expect(
      toMapNodes(readMap(testinput).map).map((line) =>
        line.map(({ value }) => value),
      ),
    ).toStrictEqual([
      [0, 0, 1, 16, 15, 14, 13, 12],
      [0, 1, 2, 17, 24, 23, 23, 11],
      [0, 2, 2, 18, 25, 26, 23, 10],
      [0, 2, 2, 19, 20, 21, 22, 9],
      [0, 1, 3, 4, 5, 6, 7, 8],
    ])
  })

  it('checkSides', () => {
    const map = toMapNodes(readMap(testinput).map)
    expect(checkSides(0, 0, map)).toStrictEqual(['right', 'bottom'])
    expect(checkSides(1, 1, map)).toStrictEqual([
      'right',
      'left',
      'top',
      'bottom',
    ])
    expect(checkSides(4, 2, map)).toStrictEqual([
      'right',
      'left',
      'top',
      'bottom',
    ])
    expect(checkSides(7, 1, map)).toStrictEqual(['top', 'bottom'])
  })

  it('makeConnections', () => {
    expect(
      makeConnections(toMapNodes(readMap(testinput).map))[1]![0],
    ).toStrictEqual({
      connectedSides: ['right', 'top', 'bottom'],
      value: 0,
      visitedMin: Infinity,
    })
  })
})
