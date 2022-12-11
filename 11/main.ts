import { doRound, parseFile } from './utlis'

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const calc = (file: string, rounds: number = 20): number => {
  let monkeys = parseFile(file)

  const divider = monkeys
    .map(({ operationDivider }) => operationDivider)
    .reduce((acc, value) => acc * value, 1)

  for (let round = 0; round < rounds; round++) {
    monkeys = doRound(monkeys, rounds === 20 /*💌*/ ? undefined : divider)
  }

  monkeys = monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems)
  const [most, second] = monkeys

  return most!.inspectedItems * second!.inspectedItems
}

export const calcB = (file: string): number => calc(file, 10_000)
