import { readFileSync } from 'fs'
import {
  interpretStacks,
  parseCrate,
  parseInstruction,
  rearrange,
  rearrangeB,
  rearrangeStacks,
  splitFile,
} from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('env test', () => {
    expect(testinput).toBeDefined()
    expect(testinput.length).not.toStrictEqual(0)
  })

  it('split', () => {
    const [stack, instructions] = splitFile(testinput)
    const res = '    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 '
    expect(stack).toStrictEqual(res)
    expect(instructions).toStrictEqual([
      'move 1 from 2 to 1',
      'move 3 from 1 to 3',
      'move 2 from 2 to 1',
      'move 1 from 1 to 2',
    ])
  })

  it('parseCrate', () => {
    expect(parseCrate('[A]')).toStrictEqual('A')
    expect(parseCrate('[B]')).toStrictEqual('B')
    expect(parseCrate('')).toStrictEqual(undefined)
  })

  it('interpretStacks', () => {
    const [stack] = splitFile(testinput)

    expect(interpretStacks(stack)).toStrictEqual([
      ['Z', 'N'],
      ['M', 'C', 'D'],
      ['P'],
    ])
  })

  it('parseInstruction', () => {
    const [, rawInstructions] = splitFile(testinput)
    expect(parseInstruction('move 1 from 2 to 1')).toStrictEqual({
      count: 1,
      from: 2,
      to: 1,
    })

    expect(rawInstructions.map(parseInstruction)).toStrictEqual([
      { count: 1, from: 2, to: 1 },
      { count: 3, from: 1, to: 3 },
      { count: 2, from: 2, to: 1 },
      { count: 1, from: 1, to: 2 },
    ])
  })

  it('rearrange', () => {
    const stack = [['Z', 'N'], ['M', 'C', 'D'], ['P']]

    expect(rearrange(stack, { count: 1, from: 2, to: 1 })).toStrictEqual([
      ['Z', 'N', 'D'],
      ['M', 'C'],
      ['P'],
    ])
    expect(rearrange(stack, { count: 2, from: 2, to: 3 })).toStrictEqual([
      ['Z', 'N', 'D'],
      [],
      ['P', 'C', 'M'],
    ])
  })

  it('rearrangeStacks', () => {
    const stack = [['Z', 'N'], ['M', 'C', 'D'], ['P']]
    const instructions = [
      { count: 1, from: 2, to: 1 },
      { count: 2, from: 2, to: 3 },
    ]

    expect(rearrangeStacks(stack, instructions, rearrange)).toStrictEqual([
      ['Z', 'N', 'D'],
      [],
      ['P', 'C', 'M'],
    ])
  })

  it('rearrangeB', () => {
    const stack = [['Z', 'N'], ['M', 'C', 'D'], ['P']]

    expect(rearrangeB(stack, { count: 1, from: 2, to: 1 })).toStrictEqual([
      ['Z', 'N', 'D'],
      ['M', 'C'],
      ['P'],
    ])
    expect(rearrangeB(stack, { count: 2, from: 2, to: 3 })).toStrictEqual([
      ['Z', 'N', 'D'],
      [],
      ['P', 'M', 'C'],
    ])
  })
})
