import { readFileSync } from 'fs'
import { calc } from './main'

const testInput = readFileSync('./testInput.txt', 'utf-8')

describe('main', () => {
  it('calc', () => {
    expect(calc(testInput)).toStrictEqual(3)
  })

  // it('calcB', () => {
  //   expect(calcB(testInput)).toStrictEqual(5)
  // })
})
