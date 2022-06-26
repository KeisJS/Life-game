import lifeGameModel from '../index'

describe('Test game model', () => {
  it('Test both rules', () => {
    const testCells = [[1, 1], [1, 2], [2, 2]]
    const lifeGame = new lifeGameModel({
      size: 10,
      initialCells: testCells
    })

    let testNewBorn
    let testDead
    const onGenerationHandler = ({ newBorn, dead }) => {
      testNewBorn = newBorn
      testDead = dead
    }

    lifeGame.addHandler('nextGeneration', onGenerationHandler)
    lifeGame.nextGeneration()

    expect(testDead).toHaveLength(0)
    expect(testNewBorn).toContainEqual([2, 1])
  })

  it('Test edge cells', () => {
    const testCells = [[0, 0], [0, 8], [0, 9]]
    const lifeGame = new lifeGameModel({
      size: 10,
      initialCells: testCells
    })

    let testNewBorn
    let testDead

    const onGenerationHandler = ({ newBorn, dead }) => {
      testNewBorn = newBorn
      testDead = dead
    }

    lifeGame.addHandler('nextGeneration', onGenerationHandler)
    lifeGame.nextGeneration()

    expect(testDead).toContainEqual([0, 0])
    expect(testDead).toContainEqual([0, 8])
    expect(testNewBorn).toContainEqual([1, 9])
    expect(testNewBorn).toContainEqual([9, 9])

    lifeGame.nextGeneration()

    expect(testNewBorn).toContainEqual([0, 0])
    expect(testNewBorn).toContainEqual([0, 8])
    expect(testDead).toContainEqual([1, 9])
    expect(testDead).toContainEqual([9, 9])
  })
})