import { readFileSync } from 'fs'

// A for Rock, B for Paper, and C for Scissors
type OpponentChoice = 'A' | 'B' | 'C'
// X for Rock, Y for Paper, and Z for Scissors
type OwnChoice = 'X' | 'Y' | 'Z'

const calcResult = (opponent: OpponentChoice, self: OwnChoice): number => {
  switch (opponent) {
    case 'A':
      switch (self) {
        case 'X':
          return 1 + 3
        case 'Y':
          return 2 + 6
        case 'Z':
          return 3 + 0
      }
    case 'B':
      switch (self) {
        case 'X':
          return 1 + 0
        case 'Y':
          return 2 + 3
        case 'Z':
          return 3 + 6
      }
    case 'C':
      switch (self) {
        case 'X':
          return 1 + 6
        case 'Y':
          return 2 + 0
        case 'Z':
          return 3 + 3
      }
  }
}

const validInput = (
  input: Array<string | undefined>,
): input is [OpponentChoice, OwnChoice] => {
  if (input.length !== 2) {
    return false
  }
  return (
    ['A', 'B', 'C'].includes(input[0]!) && ['X', 'Y', 'Z'].includes(input[1]!)
  )
}

const splitLine = (line: string) => line.split(' ').map(trim)

const trim = (str: string): string => str.trim()

const main = () => {
  const file = readFileSync('./input.txt', 'utf-8')

  const res = file
    .split('\n')
    .map(trim)
    .map(splitLine)
    .filter(validInput)
    .reduce<number>((acc, line) => acc + calcResult(...line), 0)

  console.log(res)
}
main()
