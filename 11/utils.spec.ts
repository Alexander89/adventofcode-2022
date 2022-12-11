import { readFileSync } from 'fs'
import { doRound, parseFile } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('doRound', () => {
    let monkeys = parseFile(testinput)

    for (let round = 1; round < 21; round++) {
      monkeys = doRound(monkeys)
      if (`${round}` in testData) {
        expect(
          monkeys.reduce<Record<string, Array<number>>>(
            (acc, { id, items }) => ({ ...acc, [id]: items }),
            {},
          ),
        ).toStrictEqual(testData[`${round}`])
      }
    }
  })

  it('parseFile', () => {
    // expect(parseFile(testinput)).toStrictEqual(609)
  })
})

const testData: Record<string, Record<number, Array<number>>> = {
  '2': {
    0: [695, 10, 71, 135, 350],
    1: [43, 49, 58, 55, 362],
    2: [],
    3: [],
  },

  '3': {
    0: [16, 18, 21, 20, 122],
    1: [1468, 22, 150, 286, 739],
    2: [],
    3: [],
  },

  '4': {
    0: [491, 9, 52, 97, 248, 34],
    1: [39, 45, 43, 258],
    2: [],
    3: [],
  },

  '5': {
    0: [15, 17, 16, 88, 1037],
    1: [20, 110, 205, 524, 72],
    2: [],
    3: [],
  },

  '6': {
    0: [8, 70, 176, 26, 34],
    1: [481, 32, 36, 186, 2190],
    2: [],
    3: [],
  },

  '7': {
    0: [162, 12, 14, 64, 732, 17],
    1: [148, 372, 55, 72],
    2: [],
    3: [],
  },

  '8': {
    0: [51, 126, 20, 26, 136],
    1: [343, 26, 30, 1546, 36],
    2: [],
    3: [],
  },

  '9': {
    0: [116, 10, 12, 517, 14],
    1: [108, 267, 43, 55, 288],
    2: [],
    3: [],
  },

  '10': {
    0: [91, 16, 20, 98],
    1: [481, 245, 22, 26, 1092, 30],
    2: [],
    3: [],
  },

  '15': {
    0: [83, 44, 8, 184, 9, 20, 26, 102],
    1: [110, 36],
    2: [],
    3: [],
  },

  '20': {
    0: [10, 12, 14, 26, 34],
    1: [245, 93, 53, 199, 115],
    2: [],
    3: [],
  },
}
