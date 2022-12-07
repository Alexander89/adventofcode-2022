export const findStartCode = (file: string, size: number = 4): number => {
  try {
    file.split('').reduce<Array<string>>((acc, char, idx) => {
      if (idx > size - 1) {
        acc.shift()
      }
      acc.push(char)

      if (new Set(acc).size === size) {
        throw new Error(`${idx + 1}`)
      }
      return acc
    }, [])
    return Infinity
  } catch (e) {
    if (e instanceof Error) {
      return +e.message
    }
    return Infinity
  }
}
