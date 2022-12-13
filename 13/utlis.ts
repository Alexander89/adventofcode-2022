export const toNumber = (char: string): number => parseInt(char, 10)

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const add = (a: number, b: number): number => a + b

export const trim = (str: string): string => str.trim()

type Signal = Array<number | Signal>

type SignalSet = {
  a: Signal
  b: Signal
}
type InputData = Array<SignalSet>

export const readFile = (file: string): InputData =>
  file
    .split('\n\n')
    .map(trim)
    .flatMap((line) => {
      const [a, b] = line
        .split('\n')
        .map(trim)
        .map((signal) => JSON.parse(signal) as Signal)
      if (a !== undefined && b !== undefined) {
        return [{ a, b }]
      } else {
        return []
      }
    })

export const mergeAll = (signals: Array<SignalSet>): Array<Signal> =>
  signals.map(({ a, b }) => [a, b]).flat(1)

export const addMarkers = (signals: Array<Signal>): Array<Signal> => [
  [[2]],
  ...signals,
  [[6]],
]

export const isNumber = (value: number | Signal): value is number =>
  typeof value === 'number'

export const isSignal = (value: number | Signal): value is Signal =>
  typeof value !== 'number'

const inInnerOrderWrapper = (s: SignalSet): 'true' | 'false' | 'undecided' => {
  const res = inInnerOrder(s)
  // console.log(JSON.stringify(s.a), '\n', JSON.stringify(s.b), '\n', res)
  return res
}

const inInnerOrder = ({ a, b }: SignalSet): 'true' | 'false' | 'undecided' => {
  const [aValue, ...restA] = a
  const [bValue, ...restB] = b

  if (aValue === undefined && bValue === undefined) {
    return 'undecided'
  }
  /**
   * If the left list runs out of items first, the inputs are in the right order.
   */
  if (aValue === undefined) {
    // a is shorter than b
    return 'true'
  }
  /**
   * IIf the right list runs out of items first, the inputs are not in the right order.
   */
  if (bValue === undefined) {
    // b is shorter than a
    return 'false'
  }

  if (isNumber(aValue)) {
    if (isNumber(bValue)) {
      /*
       * If the left integer is lower than the right integer, the inputs are in the right order.
       * If the left integer is higher than the right integer, the inputs are not in the right order.
       * Otherwise, the inputs are the same integer; continue checking the next part of the input.
       */
      if (aValue < bValue) {
        return 'true'
      }
      if (aValue > bValue) {
        return 'false'
      }

      return inInnerOrderWrapper({ a: restA, b: restB })
    } else {
      /*
       * If exactly one value is an integer, convert the integer to a list which contains that
       * integer as its only value, then retry the comparison.
       */
      return inInnerOrderWrapper({
        a: [[aValue], ...restA],
        b: [bValue, ...restB],
      })
    }
  } else {
    if (isNumber(bValue)) {
      /**
       * If exactly one value is an integer, convert the integer to a list which contains that
       * integer as its only value, then retry the comparison.
       */
      return inInnerOrderWrapper({
        a: [aValue, ...restA],
        b: [[bValue], ...restB],
      })
    } else {
      /**
       * If both values are lists, compare the first value of each list, then the second value, and so on.
       * (If the left list runs out of items first, the inputs are in the right order.)
       * (If the right list runs out of items first, the inputs are not in the right order.)
       * If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
       */
      const listComp = inInnerOrderWrapper({ a: aValue, b: bValue })
      if (listComp !== 'undecided') {
        return listComp
      }
      return inInnerOrderWrapper({ a: restA, b: restB })
    }
  }
}

export const inOrder = (signalSet: SignalSet): boolean => {
  const res = inInnerOrderWrapper(signalSet)
  return res === 'true' || res === 'undecided'
}

export const inOrderSort = (a: Signal, b: Signal): number => {
  switch (inInnerOrderWrapper({ a, b })) {
    case 'true':
      return -1
    case 'false':
      return 1
    case 'undecided':
      return 0
  }
}
