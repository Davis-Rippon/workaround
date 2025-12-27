import './style.css'
import { TextBox } from './textbox';
import { toggleBrightness } from './util';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
	<h1>Workaround</h1>
	<div id="textbox" class="textbox"></div>
		<div class="navigation">
			<button id="tab-l">←</button>
			<button id="tab-r">→</button>
		</div>
	</div>
</div>
`

const tb = new TextBox(document.getElementById("textbox")!)

// Bind tab button and key to advance cursor
document.getElementById("tab-r")?.addEventListener('click', tb.advanceCursor);
document.addEventListener('keydown', (e) => {
	if (e.key === "Tab" && e.shiftKey) {
		e.preventDefault();
		tb.retreatCursor();
	} else if (e.key === "Tab") {
		e.preventDefault();
		tb.advanceCursor();
	}
});

document.getElementById("toggle")?.addEventListener('click', toggleBrightness);
document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
