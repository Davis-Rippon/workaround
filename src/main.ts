import './style.css'
import { TextBox } from './textbox';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Workaround</h1>
	<div id="textbox" class="textbox"></div>
	<button id="tab">→</button>
  </div>
`

const tb = new TextBox(document.getElementById("textbox")!)

const tab = () => {
	console.log("Hello");
}

document.getElementById("tab")?.addEventListener('click', tb.advanceCursor);
