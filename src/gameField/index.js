import styles from './styles.module.scss'

const GameField = size => {
  const columns = document.createElement('div')

  columns.className = styles.gameField__columns

  const rows = document.createElement('div')

  rows.className = styles.gameField__rows

  const gameField = document.createElement('div')

  gameField.className = styles.gameField
  gameField.style.width = `${size * 20}px`
  gameField.style.height = `${size * 20}px`

  for (let i = 0; i < size; i++) {
    const row = document.createElement('div')

    row.setAttribute('data-index', i.toString())
    row.className = styles.gameField__row

    rows.appendChild(row)

    const column = document.createElement('div')

    column.setAttribute('data-index', i.toString())
    column.className = styles.gameField__column

    columns.appendChild(column)
  }

  gameField.appendChild(rows)
  gameField.appendChild(columns)

  gameField.addEventListener('click', ({ offsetX: x, offsetY: y, target }) => {
    const elX = x - x%20
    const elY = y - y%20

    console.log({ x, y, elX, elY })

    const cell = document.createElement('div')

    cell.className = styles.gameField__cell
    cell.style.left = `${elX}px`
    cell.style.top = `${elY}px`

    gameField.appendChild(cell)
  })

  return gameField
}

export default GameField