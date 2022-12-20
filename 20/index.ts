import { readFileSync } from 'fs'
import { calc, calcB } from './main'

const main = () => {
  let file = readFileSync('./testInput.txt', 'utf-8')
  console.log('test a - ', calc(file))
  console.log('test b - ', calcB(file))

  file = readFileSync('./input.txt', 'utf-8')
  console.log('a - ', calc(file))
  console.log('b - ', calcB(file))
}
main()
