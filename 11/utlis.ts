export const toNumber = (char: string): number => parseInt(char, 10)

export const trim = (str: string): string => str.trim()

type MonkeyId = number

type Monkey = {
  name: string
  id: MonkeyId
  items: Array<number>
  inspectItem: () => number | undefined
  receiveItem: (item: number) => void
  operationDivider: number
  operation: (nr: number) => number
  throwTo: (value: number) => MonkeyId
  inspectedItems: number
  receivedItems: number
}

export const parseMonkey = (monkeyDef: string): Monkey => {
  const [
    rawName = '',
    rawItems = '',
    rawOperation = '',
    rawTest = '',
    ...rawThrowTo
  ] = monkeyDef.split('\n')
  const [, rawId = '0'] = rawName.split(/[ :]/)

  const [, rawItemsCsv = ''] = rawItems.split(':')

  const items = rawItemsCsv.split(',').map(trim).map(toNumber)

  const [, opCode = 'old'] = rawOperation.split(' = ')

  const code = `(old) => ${opCode}`

  const operation = eval(code) as (old: number) => number

  const [, targetTrueStr = '1'] = rawThrowTo
    .map(trim)
    .find((line) => line.startsWith('If true'))!
    .split('monkey ')
  const [, targetFalseStr = '1'] = rawThrowTo
    .map(trim)
    .find((line) => line.startsWith('If false'))!
    .split('monkey ')

  const [, testValue = '1'] = rawTest.split('by ')

  const operationDivider = parseInt(testValue)

  const throwTo = (value: number): MonkeyId =>
    value % operationDivider === 0
      ? parseInt(targetTrueStr)
      : parseInt(targetFalseStr)

  return {
    name: rawName.substring(0, rawName.length - 1),
    id: parseInt(rawId),
    items,
    inspectItem: function (): number | undefined {
      const item = this.items.shift()
      if (item === undefined) {
        return undefined
      }
      this.inspectedItems++
      return item
    },
    receiveItem: function (item: number) {
      this.receivedItems++
      this.items.push(item)
    },
    operation,
    operationDivider,
    throwTo,
    inspectedItems: 0,
    receivedItems: 0,
  }
}

export const parseFile = (line: string): Array<Monkey> =>
  line.split('\n\n').map(parseMonkey)

export const doRound = (
  monkeys: Array<Monkey>,
  divider?: number,
): Array<Monkey> => {
  monkeys.forEach((monkey) => {
    for (;;) {
      const item = monkey.inspectItem()
      if (item === undefined) {
        break
      }
      const newWorryLvl = divider
        ? monkey.operation(item) % divider
        : monkey.operation(item) / 3

      const throwToId = monkey.throwTo(newWorryLvl)

      // console.log(
      //   `monkey ${monkey.id} throws ${item} with ${newWorryLvl} to monkey ${throwToId}`,
      // )

      monkeys.find(({ id }) => id === throwToId)!.receiveItem(newWorryLvl)
    }
  })
  return monkeys
}
