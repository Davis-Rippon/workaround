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

// Bind tab button and key to advance cursor
document.getElementById("tab")?.addEventListener('click', tb.advanceCursor);
document.addEventListener('keydown', (e) => {
	if (e.key === "Tab" && e.shiftKey) {
		console.log("SHIFTTBA");
		e.preventDefault();
		tb.retreatCursor();
	} else if (e.key === "Tab") {
		e.preventDefault();
		tb.advanceCursor();
	}
});

