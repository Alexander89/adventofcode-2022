import { findStartCode } from './utlis'

describe('utils', () => {
  it('env test', () => {
    const testinput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'

    expect(findStartCode(testinput)).toStrictEqual(7)
  })
})
