import styles from './App.module.scss';

const App = () => {
  const root = document.querySelector('#root')

  root.innerHTML = `<div class=${styles.app}>Hello world</div>`
}

export default App