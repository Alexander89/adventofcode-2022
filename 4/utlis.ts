type Range = Array<number>
type ElvesTeam = [Range, Range]

export const splitElves = (line: string): [string, string] => {
  const [elveA, elveB] = line.split(',')

  if (elveA === undefined || elveB === undefined) {
    throw new Error('Invalid input')
  }

  return [elveA, elveB]
}

export const createRanges = (range: string): Range => {
  const [start, end] = range
    .split('-')
    .map((num) => parseInt(num, 10))
    .sort((a, b) => a - b)

  if (start === undefined || end === undefined) {
    throw new Error('Invalid range')
  }

  return Array(end - start + 1)
    .fill(start)
    .map((num, index) => num + index)
}

export const isElvesTeam = (team: Array<Range>): team is ElvesTeam =>
  team.length === 2

export const filterFullyOverlay = (team: ElvesTeam): boolean =>
  new Set(team.flat()).size === Math.max(team[0].length, team[1].length)

export const filterPartialOverlay = (team: ElvesTeam): boolean =>
  new Set(team.flat()).size !== team[0].length + team[1].length
