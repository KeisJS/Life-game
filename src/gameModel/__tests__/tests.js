import GameModel from '../index'

describe('Test Game model', () => {
  const testFieldSize = 10

  it('Test non die rule, set One', () => {
    const initialCells = [[1, 1], [2, 2], [3, 3]]

    const game = GameModel.getInstance({
      size: testFieldSize,
      initialCells
    })

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

    const game = GameModel.getInstance({
      size: testFieldSize,
      initialCells
    })

    const { dead } = game.nextGeneration()

    expect(dead).toHaveLength(3)
    expect(dead).toContainEqual([3, 2])
    expect(dead).toContainEqual([4, 1])
    expect(dead).toContainEqual([4, 3])

    const { dead: nextDead } = game.nextGeneration()

    expect(nextDead).toHaveLength(0)
  })
})