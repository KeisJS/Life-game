import LifeGameModel from '../lifeGameModel'

const getRandomCoords = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomCell = (min, max) => {
  return [getRandomCoords(min, max), getRandomCoords(min, max)]
}

const getBenchmarkCells = (min, max) => {
  const cellCount = (max * max) / 3
  const cells = new Map()

  let isNewCell
  let values = []
  for (let i = min; i <  cellCount; i++) {
    isNewCell = false
    while(!isNewCell) {
      const [x, y] = getRandomCell(min, max)
      const key = `${x}:${y}`
      if (!cells.has(key)) {
        isNewCell = true
        cells.set(key, [x, y])
        values.push([x, y])
      }
    }
  }

  return values
}

const bencmark = () => {
  const min = 0
  const max = 1000

  const values = getBenchmarkCells(min, max)

  perfLog(() => {
    const gameModel = new LifeGameModel({
      size: max,
      initialCells: values
    })

    for (let count = 0; count < 1; count++) {
      gameModel.nextGeneration()
    }
  }, time => {
    console.log(`Benchmark on cell count: ${values.length}`)
    console.log(`Time: ${time}`)
  })
}

const perfLog = (f, cb) => {
  const pStart = performance.now()

  f()

  const pEnd = performance.now()

  if (typeof cb === 'function') {
    cb((pEnd - pStart)/1000)
  } else {
    console.log(`${cb}: ${(pEnd - pStart)/1000} sec`)
  }
}

window.gameBench = bencmark

export { perfLog, getBenchmarkCells }

