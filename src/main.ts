import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Workaround</h1>
    <text></div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
