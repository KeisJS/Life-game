import GameModel from '../index'

describe('Test Game model', () => {
  const game = GameModel.getInstance({
    size: 10,
    initialCells: []
  })

  beforeEach(() => {
    game.clear()
  })

  it('Test non die rule, set One', () => {
    const initialCells = [[1, 1], [2, 2], [3, 3]]

    game.fillCells(initialCells)

    const { dead } = game.nextGeneration()

    expect(dead).toHaveLength(2)
    expect(dead).toContainEqual([1, 1])
    expect(dead).toContainEqual([3, 3])

    const { dead: nextDead } = game.nextGeneration()

    expect(nextDead).toHaveLength(1)
    expect(nextDead).toContainEqual([2, 2])
  })

  it('Test non die rule, set Two', () => {
    const initialCells = [[1, 1], [2, 1], [2, 2], [3, 2], [4, 1], [4, 3]]

    game.fillCells(initialCells)

    const { dead } = game.nextGeneration()

    expect(dead).toHaveLength(3)
    expect(dead).toContainEqual([3, 2])
    expect(dead).toContainEqual([4, 1])
    expect(dead).toContainEqual([4, 3])

    const { dead: nextDead } = game.nextGeneration()

    expect(nextDead).toHaveLength(0)
  })

  it('Test new born rule', () => {
    const initialCells = [[1, 1], [2, 1], [2, 2], [3, 2], [4, 1], [4, 3]]

    game.fillCells(initialCells)

    const { newBorn } = game.nextGeneration()

    expect(newBorn).toHaveLength(3)
    expect(newBorn).toContainEqual([4, 2])
    expect(newBorn).toContainEqual([3, 3])
    expect(newBorn).toContainEqual([1, 2])
  })

  it('Test tor emulate', () => {
    const initialCells = [[0, 8], [9, 8], [9, 7], [3, 0], [4, 0], [5, 0]]

    game.fillCells(initialCells)

    const { newBorn, dead } = game.nextGeneration()

    expect(dead).toHaveLength(2)
    expect(newBorn).toHaveLength(3)

    expect(dead).toContainEqual([3, 0])
    expect(dead).toContainEqual([5, 0])
    expect(newBorn).toContainEqual([0, 7])
    expect(newBorn).toContainEqual([4, 1])
    expect(newBorn).toContainEqual([4, 9])
  })
})