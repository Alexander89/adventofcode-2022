// import { readFileSync } from 'fs'
import { parseLines } from './utlis'

// const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('parseLines', () => {
    let cmd = 'noop'
    expect(parseLines(cmd)).toStrictEqual([{ type: 'noop' }])
    cmd = 'addx 42'
    expect(parseLines(cmd)).toStrictEqual([
      { type: 'addx1' },
      { type: 'addx2', value: 42 },
    ])
  })
})
