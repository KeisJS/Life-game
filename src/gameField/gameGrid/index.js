import styles from '../styles.module.scss'

class GameGrid {
  container

  constructor(container) {
    this.container = container
  }

  static getInstance() {
    const gameGrid = document.createElement('div')

    gameGrid.className = styles.gameField__gameGrid

    return new GameGrid(gameGrid)
  }

  getContainer() {
    return this.container
  }

  buildOrRefreshGrid(size) {
    const gameGrid = document.createDocumentFragment()
    const columns = document.createElement('div')

    columns.className = styles.gameField__columns

    const rows = document.createElement('div')

    rows.className = styles.gameField__rows

    for (let i = 0; i < size; i++) {
      const row = document.createElement('div')

      row.className = styles.gameField__row

      rows.appendChild(row)

      const column = document.createElement('div')

      column.className = styles.gameField__column

      columns.appendChild(column)
    }

    gameGrid.appendChild(rows)
    gameGrid.appendChild(columns)

    this.container.replaceChildren(gameGrid)

    return this
  }
}

export default GameGrid