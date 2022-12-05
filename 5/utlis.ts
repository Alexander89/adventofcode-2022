type RawInstructions = Array<string>
type Instruction = { count: number; from: number; to: number }
type Instructions = Array<Instruction>

type Stack = Array<string>
type Stacks = Array<Stack>

export const splitFile = (content: string): [string, RawInstructions] => {
  const [stack = '', instructions = ''] = content.split('\n\n')
  return [stack, instructions.split('\n')]
}

export const parseCrate = (stack: string): string | undefined => {
  if (stack.length === 0) {
    return undefined
  } else {
    return stack.substring(1, stack.length - 1)
  }
}

export const interpretStacks = (definition: string): Stacks => {
  const [titles, ...lines] = definition
    .split('\n')
    .map((line) => {
      const count = Math.ceil(line.length / 4)
      return Array(count)
        .fill(0)
        .map((_, i) => line.substring(i * 4, i * 4 + 3))
        .map((s) => s.trim())
    })
    .reverse()

  if (!titles) {
    return [[]]
  }

  const cleanLines = lines.map((line) => line.map(parseCrate))

  return cleanLines.reduce<Stacks>(
    (acc, line) =>
      line.reduce<Stacks>((acc2, crate, i) => {
        const stack = acc2[i]
        if (crate && stack) {
          stack.push(crate)
        }
        return acc2
      }, acc),
    Array(titles.length)
      .fill(0)
      .map(() => []) as Stacks,
  )
}

export const parseInstruction = (instruction: string): Instruction => {
  const [, countStr, , fromStr, , toStr] = instruction.split(' ')

  if (!countStr || !fromStr || !toStr) {
    throw new Error(`Invalid instruction: ${instruction}`)
  }

  return {
    count: parseInt(countStr),
    from: parseInt(fromStr),
    to: parseInt(toStr),
  }
}

export const rearrangeStacks = (
  stacks: Stacks,
  instructions: Instructions,
  rearrangeFn: (stack: Stacks, instruction: Instruction) => Stacks,
): Stacks =>
  instructions.reduce(
    (acc, instruction) => rearrangeFn(acc, instruction),
    stacks,
  )

export const rearrange = (
  stacks: Stacks,
  { count, from, to }: Instruction,
): Stacks =>
  Array<{ from: number; to: number }>(count)
    .fill({ from, to })
    .reduce((acc, { from, to }) => {
      acc[to - 1]?.push(acc[from - 1]?.pop()!)
      return acc
    }, stacks)

export const rearrangeB = (
  stacks: Stacks,
  { count, from, to }: Instruction,
): Stacks => {
  const fromStack = stacks[from - 1]
  const toStack = stacks[to - 1]
  if (!fromStack || !toStack) {
    throw new Error(`Invalid stacks: ${fromStack} ${toStack}`)
  }
  stacks[from - 1] = fromStack.slice(0, fromStack.length - count)
  stacks[to - 1] = [...toStack, ...fromStack.slice(fromStack.length - count)]
  return stacks
}
