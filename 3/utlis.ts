export const splitCompartments = (content: string): [string, string] => {
  const lng = content.length
  const first = content.substring(0, lng / 2)
  const second = content.substring(lng / 2)
  return [first, second]
}

export const extractWrongPart = ([first, second]: [string, string]): string => {
  const secondList = new Set(second.split(''))
  const wrongPart = new Set(
    first.split('').filter((char) => secondList.has(char)),
  )
  return Array.from(wrongPart).join('')
}

const aCode = 'a'.charCodeAt(0) // 97
const aCapCode = 'A'.charCodeAt(0) // 65
export const calcPrio = (wrongPart: string): number =>
  wrongPart.split('').reduce((acc, char) => {
    const charCode = char.charCodeAt(0)
    if (charCode >= aCode) {
      return acc + (charCode - aCode) + 1
    } else {
      return acc + (charCode - aCapCode) + 27
    }
  }, 0)

type char = string
type Group = [Set<char>, Set<char>, Set<char>]
type PartialGroup = Array<Set<char>>
type PartialGroups = Array<PartialGroup>
// type Groups = Array<Group>

export const sortLines = (line: string): Set<char> =>
  new Set(line.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)))

export const makeGroups = (
  acc: PartialGroups,
  line: Set<char>,
): PartialGroups => {
  const last = acc[acc.length - 1]
  if (last && last.length !== 3) {
    last.push(line)
  } else {
    acc.push([line])
  }
  return acc
}

export const completeGroups = (group: PartialGroup): group is Group =>
  group.length === 3

export const findSharedItem = (group: Group): string => {
  const [first, second, third] = group

  const sharedPart =
    Array.from(first).find((char) => second.has(char) && third.has(char)) || ''

  return sharedPart
}
