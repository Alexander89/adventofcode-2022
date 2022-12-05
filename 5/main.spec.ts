import { readFileSync } from 'fs'
import { calc, calcB } from './main'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('main', () => {
  it('calc', () => {
    expect(calc(testinput)).toStrictEqual('CMZ')
  })

  it('calcB', () => {
    expect(calcB(testinput)).toStrictEqual('MCD')
  })
})
