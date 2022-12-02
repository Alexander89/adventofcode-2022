import { readFileSync } from 'fs'

const trim = (str: string): string => str.trim()

const main = () => {
  const file = readFileSync('./input.txt', 'utf-8')

  const elfs = file
    .split('\n')
    .map(trim)
    .reduce<Array<number>>(
      (acc, line) => {
        if (line === '') {
          acc.push(0)
          return acc
        } else {
          const idx = acc.length - 1
          const last = acc[idx] || 0
          acc[idx] = last + parseInt(line)
          return acc
        }
      },
      [0],
    )

  const superElfs = elfs
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0)

  console.log(superElfs)
}
main()
