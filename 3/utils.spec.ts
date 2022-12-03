import { readFileSync } from 'fs'
import {
  splitCompartments,
  extractWrongPart,
  calcPrio,
  sortLines,
  makeGroups,
  findSharedItem,
} from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

const toSet = (l: string) => new Set(l.split(''))

describe('utils', () => {
  it('splitCompartments', () => {
    const [a, b] = splitCompartments('test')
    expect(a).toStrictEqual('te')
    expect(b).toStrictEqual('st')
  })
  it('splitCompartments2', () => {
    const [a, b] = splitCompartments('vJrwpWtwJgWrhcsFMMfFFhFp')
    expect(a).toStrictEqual('vJrwpWtwJgWr')
    expect(b).toStrictEqual('hcsFMMfFFhFp')
  })

  it('extractWrongPart', () => {
    expect(extractWrongPart(['teTitaE', 'StLHPt'])).toStrictEqual('t')
  })

  it('calcPrio', () => {
    expect(calcPrio('a')).toStrictEqual(1)
    expect(calcPrio('A')).toStrictEqual(27)
    expect(calcPrio('aA')).toStrictEqual(28)
    expect(calcPrio('abc')).toStrictEqual(6)
    expect(calcPrio('ABC')).toStrictEqual(27 + 28 + 29)
  })

  it('sortLines', () => {
    expect(sortLines('ba')).toStrictEqual(toSet('ab'))
    expect(sortLines('Ba')).toStrictEqual(toSet('Ba'))
    expect(sortLines('ABBBBB')).toStrictEqual(toSet('AB'))
    expect(
      sortLines('agAOcioIEClmpcwDODTnagAOcioIEClImpcwDODTn'),
    ).toStrictEqual(toSet('ACDEIOTacgilmnopw'))
  })

  it('makeGroups', () => {
    const testSet = testinput.split('\n').map((l) => new Set(l))

    expect(testSet.reduce(makeGroups, [[]])).toStrictEqual([
      [
        toSet('vJrwpWtwJgWrhcsFMMfFFhFp'),
        toSet('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'),
        toSet('PmmdzqPrVvPwwTWBwg'),
      ],
      [
        toSet('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'),
        toSet('ttgJtRGJQctTZtZT'),
        toSet('CrZsJsPPZsGzwwsLwLmpwMDw'),
      ],
    ])
  })

  it('findSharedItem', () => {
    const a1 = toSet('vJrwpWtwJgWrhcsFMMfFFhFp')
    const b1 = toSet('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')
    const c1 = toSet('PmmdzqPrVvPwwTWBwg')

    expect(findSharedItem([a1, b1, c1])).toStrictEqual('r')

    const a2 = toSet('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')
    const b2 = toSet('ttgJtRGJQctTZtZT')
    const c2 = toSet('CrZsJsPPZsGzwwsLwLmpwMDw')

    expect(findSharedItem([a2, b2, c2])).toStrictEqual('Z')
  })
})
