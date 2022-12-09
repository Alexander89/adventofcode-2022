import { readFileSync } from 'fs'
import { calc, calcB } from './main'

const testinput = readFileSync('./testInput.txt', 'utf-8')
const testinput2 = readFileSync('./testInput2.txt', 'utf-8')

describe('main', () => {
  it('calc', () => {
    expect(calc(testinput)).toStrictEqual(13)
  })

  it('calcB', () => {
    expect(calcB(testinput2)).toStrictEqual(36)
  })
})
