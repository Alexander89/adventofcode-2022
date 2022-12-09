import { readFileSync } from 'fs'
import { parseLines } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('env test', () => {
    expect(testinput).toBeDefined()
    expect(testinput.length).not.toStrictEqual(0)
  })

  it('parseLines', () => {
    const cmd = 'L 1234'
    expect(parseLines(cmd)).toHaveLength(1234)
    expect(parseLines(cmd)[0]).toStrictEqual('L')
  })
})
