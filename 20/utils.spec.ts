import { readFileSync } from 'fs'
import { forEach, parseFile, resetNodes, toRing } from './utlis'

const testinput = readFileSync('./testInput.txt', 'utf-8')
const lines = testinput.split('\n').length

describe('utils', () => {
  it('readFile', () => {
    const ring = toRing(parseFile(testinput))
    expect(ring).toBeDefined()

    expect(ring.entry.nextNode).toBeDefined()

    let node = ring.entry
    for (let i = 0; i < lines; i++) {
      node = node.nextNode
    }

    expect(node).toBe(ring.entry)
  })

  it('resetNodes', () => {
    const ring = toRing(parseFile(testinput))
    expect(ring).toBeDefined()

    forEach(ring, (node) => (node.moved = true))
    forEach(ring, (node) => expect(node.moved).toBeTruthy())

    resetNodes(ring)
    forEach(ring, (node) => expect(node.moved).toBeFalsy())
  })
})
