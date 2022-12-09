import { readFileSync } from 'fs'
import { calc, calcB } from './main'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('main', () => {
  it('calc', () => {
    expect(calc(testinput)).toStrictEqual(21)
  })

  it('calcB', () => {
    expect(calcB(testinput)).toStrictEqual(8)
  })
})
