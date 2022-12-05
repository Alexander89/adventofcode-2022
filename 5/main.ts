import {
  interpretStacks,
  splitFile,
  parseInstruction,
  rearrangeStacks,
  rearrange,
  rearrangeB,
} from './utlis'

export const calc = (file: string): string => {
  const [rawStack, rawInstructions] = splitFile(file)
  const stack = interpretStacks(rawStack)
  const instructions = rawInstructions.map(parseInstruction)
  const arrangedStacks = rearrangeStacks(stack, instructions, rearrange)
  return arrangedStacks.map((stack) => stack[stack.length - 1]).join('')
}

export const calcB = (file: string): string => {
  const [rawStack, rawInstructions] = splitFile(file)
  const stack = interpretStacks(rawStack)
  const instructions = rawInstructions.map(parseInstruction)
  const arrangedStacks = rearrangeStacks(stack, instructions, rearrangeB)
  return arrangedStacks.map((stack) => stack[stack.length - 1]).join('')
}
