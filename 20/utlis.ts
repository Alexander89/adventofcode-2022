export const toNumber = (char: string): number => parseInt(char, 10)

export const sum = (values: Array<number>): number =>
  values.reduce((acc, value) => acc + value, 0)

export const add = (a: number, b: number): number => a + b

export const trim = (str: string): string => str.trim()

export type NodeCommon = {
  id: number
  value: number
  moved: boolean
}
export type Node = NodeCommon & {
  prefNode: Node | undefined
  nextNode: Node | undefined
}
export type RingNode = NodeCommon & {
  prefNode: RingNode
  nextNode: RingNode
}

type LinkedListBuild = {
  head: Node | undefined
  tail: Node | undefined
  length: number
}

type LinkedList = { head: Node; tail: Node; length: number }
type LinkedRing = { entry: RingNode; length: number }

const toLinkedList = (nodes: Array<Node>): LinkedList =>
  nodes.reduce<LinkedListBuild>(
    ({ head, tail, length }, node) => {
      if (tail === undefined) {
        return { head: node, tail: node, length }
      } else {
        tail.nextNode = node
        node.prefNode = tail
        return { head, tail: node, length }
      }
    },
    { head: undefined, tail: undefined, length: nodes.length },
  ) as LinkedList

export const parseFile = (
  file: string,
  decryptionKey: number = 1,
): LinkedList =>
  toLinkedList(
    file
      .split('\n')
      .map(toNumber)
      .map((value) => value * decryptionKey)
      .map((value, id) => ({
        id,
        value,
        moved: false,
        prefNode: undefined,
        nextNode: undefined,
      })),
  )

const closeGap = (prefNode: Node | undefined, nextNode: Node | undefined) => {
  if (prefNode) {
    prefNode.nextNode = nextNode
  }
  if (nextNode) {
    nextNode.prefNode = prefNode
  }
}

export const drawList = (list: LinkedList) => {
  let node: Node | undefined = list.head
  let output = ''
  for (;;) {
    if (node === undefined) {
      break
    }

    output = output.concat(`, ${node.value}`)
    if (node === list.tail) {
      break
    }
    node = node.nextNode
  }
  console.log(output)
}

export const drawRing = (ring: LinkedRing) => {
  let node: RingNode = ring.entry
  let output = ''
  for (;;) {
    output = output.concat(`, ${node.value}`)
    node = node.nextNode
    if (node === ring.entry) {
      break
    }
  }
  console.log(output)
}
/**
 * move the node by +-1 in the list. Returns the missing steps to move
 *
 * @param list context in witch the node is moving
 * @param node node to move
 * @param amount positive or negative steps to move the node
 * @returns missing steps to move
 */
export const moveNode = (
  list: LinkedList,
  node: Node,
  amount: number,
): number => {
  node.moved = true
  if (amount === 0) {
    return 0
  }
  // drawList(list)

  // console.log('moveNode', node.id, node.value, 'amount', amount)

  const { prefNode, nextNode } = node
  if (amount > 0) {
    // if we are at the end of the list
    if (nextNode === undefined) {
      // pref item will be the new tail
      const { prefNode } = node
      if (prefNode === undefined) {
        console.error('List with 1 item not supported')
        return 0
      }

      list.tail = prefNode
      prefNode.nextNode = undefined

      // node will be the new head
      list.head.prefNode = node
      node.prefNode = undefined
      node.nextNode = list.head
      list.head = node
      // swapping to the end, do required one additional steps
      return amount
    } else {
      // close the gap
      closeGap(prefNode, nextNode)

      // If we are the head of the list, the next node will be the new head
      if (list.head === node) {
        list.head = nextNode
      }
      if (list.tail === nextNode) {
        list.tail = node
      }

      // Place the node before the one after the next node
      node.nextNode = nextNode.nextNode
      if (nextNode.nextNode) {
        nextNode.nextNode.prefNode = node
      }

      // and after the next node
      node.prefNode = nextNode
      nextNode.nextNode = node
      return amount - 1
    }
  } else {
    // if we are at the end of the list
    if (prefNode === undefined) {
      // next item will be the new head
      const { nextNode } = node
      if (nextNode === undefined) {
        console.error('List with 1 item not supported')
        return 0
      }
      list.head = nextNode
      nextNode.prefNode = undefined

      // node will be the new tail
      list.tail.nextNode = node
      node.prefNode = list.tail
      node.nextNode = undefined
      list.tail = node
      // swapping to the head, do required one additional steps
      return amount + 1
    } else {
      // close the gap
      closeGap(prefNode, nextNode)

      // If we are the head of the list, the next node will be the new head
      if (list.tail === node) {
        list.tail = prefNode
      }
      if (list.head === prefNode) {
        // we should not get something in front of the head (for some reason)
        closeGap(list.head, nextNode)

        // node will instantly move it to the new tail
        list.tail.nextNode = node
        node.prefNode = list.tail
        node.nextNode = undefined
        list.tail = node
      } else {
        // move into previous connection
        node.prefNode = prefNode.prefNode
        if (prefNode.prefNode) {
          prefNode.prefNode.nextNode = node
        }
        node.nextNode = prefNode
        prefNode.prefNode = node
      }

      return amount + 1
    }
  }
}

export const moveNodeRing = (node: RingNode, amount: number) => {
  node.moved = true
  if (amount !== 0) {
    const { prefNode, nextNode } = node
    // if we are at the end of the list
    // close the gap
    closeGap(prefNode, nextNode)

    const after = iterAddRing(node, amount < 0 ? amount - 1 : amount)

    // move into previous connection
    node.nextNode = after.nextNode
    node.prefNode = after

    after.nextNode.prefNode = node
    after.nextNode = node
  }
}

export const find = (list: LinkedList, value: number) => {
  let node = list.head
  for (;;) {
    if (node.nextNode === undefined) {
      return undefined
    }

    if (node.value === value) {
      return node
    }
    node = node.nextNode
  }
}

export const iterAdd = (list: LinkedList, start: Node, idx: number) => {
  let node = start
  for (let i = 0; i < idx; i++) {
    node = node.nextNode ? node.nextNode : list.head
  }
  return node.value
}

export const findInRing = (
  start: RingNode,
  value: number,
): RingNode | undefined => {
  let node = start
  for (;;) {
    if (node.value === value) {
      return node
    }
    node = node.nextNode
    if (node === start) {
      return undefined
    }
  }
}

export const iterAddRing = (start: RingNode, steps: number) => {
  let node = start
  if (steps > 0) {
    for (let i = 0; i < steps; i++) {
      node = node.nextNode
    }
  } else {
    for (let i = 0; i > steps; i--) {
      node = node.prefNode
    }
  }
  return node
}

export const shuffleList = (list: {
  head: Node
  tail: Node
  length: number
}) => {
  let node: Node | undefined = list.head
  for (;;) {
    if (node === undefined) {
      break
    }

    let newNode: Node | undefined

    const { value, prefNode, nextNode, moved } = node
    if (moved) {
      // console.log('already moved', node.id, 'move next:', node.nextNode?.id)
      newNode = node.nextNode
    } else {
      const moveAmount = value % (list.length - 2)
      // console.log('move', node.id, value, moveAmount)
      if (prefNode === undefined) {
        newNode = nextNode
      } else {
        newNode = prefNode
      }

      node.moved = true
      for (let i = moveAmount; i !== 0; ) {
        i = moveNode(list, node, i)
      }
    }
    node = newNode
  }
}

export const shuffleRing = (ring: LinkedRing, useIndex: boolean = false) => {
  let node: RingNode = ring.entry
  const nodeCount = ring.length
  let movements = 0
  for (;;) {
    const { value, nextNode, moved, id } = node

    if (useIndex ? movements === id : moved === false) {
      movements++
      const moveAmount = value % (nodeCount - 1)
      moveNodeRing(node, moveAmount)
      // console.log(
      //   `${moveAmount} moves between ${node.prefNode.value} and ${node.nextNode.value}`,
      // )
      // drawRing(ring)
    }
    node = nextNode

    if (nodeCount === movements) {
      break
    }
  }
}

export const resetNodes = (ring: LinkedRing) =>
  forEach(ring, (node) => (node.moved = false))

export const toRing = (list: LinkedList) => {
  list.head.prefNode = list.tail
  list.tail.nextNode = list.head

  let ring = {
    entry: list.head as RingNode,
    length: list.length,
  } satisfies LinkedRing

  return ring
}

export const forEach = (ring: LinkedRing, cb: (node: RingNode) => void) => {
  let node = ring.entry
  for (;;) {
    cb(node)

    node = node.nextNode
    if (node === ring.entry) {
      break
    }
  }
}
