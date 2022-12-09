import { readFileSync } from 'fs'
import { calc, calcB } from './main'

const main = () => {
  const file = readFileSync('./input.txt', 'utf-8')
  console.log('a - ', calc(file))
  console.log('b - ', calcB(file))
}

main()
