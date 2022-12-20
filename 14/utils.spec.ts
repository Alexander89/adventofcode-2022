import { readFileSync } from 'fs'
import { readFile, doCollides } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('readFile', () => {
    const lines = readFile(testinput)
    expect(lines).toHaveLength(5)
  })

  it('doCollides', () => {
    const check = doCollides([
      [0, 0],
      [0, 10],
    ])

    expect(check([0, 0])).toBeTruthy()
    expect(check([0, 5])).toBeTruthy()
    expect(check([0, 10])).toBeTruthy()
    expect(check([1, 5])).toBeFalsy()
  })
})
