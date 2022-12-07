import { calc, calcB } from './main'

const testinput = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', res: 7, resB: 19 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', res: 5, resB: 23 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', res: 6, resB: 23 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', res: 10, resB: 29 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', res: 11, resB: 26 },
]

describe('main', () => {
  it('calc', () => {
    testinput.forEach(({ input, res }) =>
      expect(calc(input)).toStrictEqual(res),
    )
  })
  it('calcB', () => {
    testinput.forEach(({ input, resB }) =>
      expect(calcB(input)).toStrictEqual(resB),
    )
  })
})
