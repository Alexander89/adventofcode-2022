import { moveHead, moveTail, parseLines, Particles, toIdx, Vec } from './utlis'

type State = {
  particles: Particles
  trail: Set<string>
}
type State2 = {
  allParticles: Array<Vec>
  trail: Set<string>
}

export const calc = (file: string): number => {
  const instructions = file.split('\n').flatMap(parseLines)

  const state: State = {
    particles: {
      head: [0, 0],
      tail: [0, 0],
    },
    trail: new Set(),
  }

  const { trail } = instructions.reduce((acc, dir) => {
    const particles = moveTail(moveHead(acc.particles, dir))
    acc.trail.add(toIdx(particles.tail))
    return {
      particles,
      trail: acc.trail,
    }
  }, state)

  return trail.size
}

export const calcB = (file: string): number => {
  const instructions = file.split('\n').flatMap(parseLines)

  const allParticles = Array(10)
    .fill(0)
    .map<Vec>(() => [0, 0])

  const state: State2 = {
    allParticles,
    trail: new Set(),
  }

  const { trail } = instructions.reduce<State2>((acc, dir): State2 => {
    const allParticles = acc.allParticles.reduce<Array<Vec>>(
      (acc, particle, idx) => [
        ...acc,
        idx === 0
          ? moveHead({ head: particle, tail: [0, 0] }, dir).head
          : moveTail({ head: acc.at(-1)!, tail: particle }).tail,
      ],
      [],
    )

    const tail = allParticles.at(-1)!
    acc.trail.add(toIdx(tail))

    return {
      allParticles,
      trail: acc.trail,
    }
  }, state)

  return trail.size
}
