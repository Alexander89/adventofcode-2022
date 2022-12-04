import { readFileSync } from 'fs'
import {
  splitElves,
  createRanges,
  filterFullyOverlay,
  isElvesTeam,
} from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('env test', () => {
    expect(testinput).toBeDefined()
    expect(testinput.length).not.toStrictEqual(0)
  })

  it('splitElves', () => {
    expect(splitElves('1-2,2-4')).toStrictEqual(['1-2', '2-4'])
    expect(splitElves('1-1,10-25')).toStrictEqual(['1-1', '10-25'])
    expect(splitElves('103-295,250-144')).toStrictEqual(['103-295', '250-144'])
  })

  it('createRanges', () => {
    expect(createRanges('1-1')).toStrictEqual([1])
    expect(createRanges('11-15')).toStrictEqual([11, 12, 13, 14, 15])
    expect(createRanges('4-2')).toStrictEqual([2, 3, 4])
  })

  it('isElvesTeam', () => {
    expect(isElvesTeam([[1], [1]])).toBeTruthy()
    expect(isElvesTeam([[1], [1], [1]])).toBeFalsy()
    expect(isElvesTeam([[1]])).toBeFalsy()
  })

  it('filterFullyOverlay true', () => {
    expect(filterFullyOverlay([[1], [1]])).toBeTruthy()
    expect(
      filterFullyOverlay([
        [1, 2, 3, 4, 5],
        [3, 4, 5],
      ]),
    ).toBeTruthy()
    expect(
      filterFullyOverlay([
        [1, 2, 3, 4, 5],
        [3, 4, 5],
      ]),
    ).toBeTruthy()
    expect(
      filterFullyOverlay([
        [3, 4, 5],
        [3, 4, 5],
      ]),
    ).toBeTruthy()
  })
  it('filterFullyOverlay false', () => {
    expect(filterFullyOverlay([[1], [2]])).toBeFalsy()
    expect(
      filterFullyOverlay([
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ]),
    ).toBeFalsy()

    expect(
      filterFullyOverlay([
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ]),
    ).toBeFalsy()
  })
})
