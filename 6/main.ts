import { findStartCode } from './utlis'

export const calc = (file: string): number => findStartCode(file)
export const calcB = (file: string): number => findStartCode(file, 14)

// export const calcB = (file: string): string => {
//   const [rawStack, rawInstructions] = splitFile(file)
//   const stack = interpretStacks(rawStack)
//   const instructions = rawInstructions.map(parseInstruction)
//   const arrangedStacks = rearrangeStacks(stack, instructions, rearrangeB)
//   return arrangedStacks.map((stack) => stack[stack.length - 1]).join('')
// }
