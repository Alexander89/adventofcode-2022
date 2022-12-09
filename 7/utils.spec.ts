import { readFileSync } from 'fs'
import { convertToTree, parseLines } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')

describe('utils', () => {
  it('env test', () => {
    expect(testinput).toBeDefined()
    expect(testinput.length).not.toStrictEqual(0)
  })

  it('parseLines', () => {
    const cmd = parseLines('$ cd a')
    const dir = parseLines('dir a')
    const file = parseLines('123 a')

    expect(cmd).toStrictEqual({ type: 'cmd', cmd: 'cd', dir: 'a' })
    expect(dir).toStrictEqual({ type: 'dir', name: 'a' })
    expect(file).toStrictEqual({ type: 'file', name: 'a', size: 123 })
  })

  it('convertToTree', () => {
    const cmds = [
      '$ cd a',
      '123 a1',
      '$ cd b',
      '123 b1',
      '123 b2',
      '$ cd ..',
      '123 a2',
      '$ cd c',
      '123 c1',
      '123 c2',
    ].map(parseLines)

    const tree = convertToTree(cmds)
    const res = {
      a: {
        a1: 123,
        a2: 123,
        b: {
          b1: 123,
          b2: 123,
        },
        c: {
          c1: 123,
          c2: 123,
        },
      },
    }

    expect(tree).toStrictEqual(res)
  })
})
