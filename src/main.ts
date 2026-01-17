import { CompletionEngine } from './completion_engine';
import './style.css'
import { TextBox } from './textbox';
import { toggleBrightness } from './util';
import { sendMessage } from "./popup";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
	<h1>Workaround</h1>
	<div id="textbox" class="textbox"></div>
		<div class="navigation">
			<button id="tab-l">←</button>
			<button id="tab-r">→</button>
            <button id="clipboard">📋</button>
		</div>
	</div>
</div>
`

const tb = new TextBox(document.getElementById("textbox")!)

export const ce = new CompletionEngine([
    "Bench Press",
    "Lat Pulldown",
    "Upright Row",
    "Reverse Fly",
    "Bicep Curl (incline)",
    "Bicep Curl (standing)",
    "Hammer Curl",
    "Shoulder Press",
    "Tricep Push Down",
    "Lat Raise (cable)",
    "Lat Raise (machine)",
    "Cable Ab Crunch",
    "Squat",
    "Run"
]);

document.getElementById("tab-r")?.addEventListener('click', tb.advanceCursor);
document.getElementById("tab-l")?.addEventListener('click', tb.retreatCursor);

document.addEventListener('keydown', (e) => {
    if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        tb.retreatCursor();
    } else if (e.key === "Tab") {
        e.preventDefault();
        tb.advanceCursor();
    }
});


document.getElementById("clipboard")?.addEventListener('click', async () => {
    if (await tb.saveToClipboard()) {
        sendMessage("Saved to Clipboard");
        return;
    }
    sendMessage("Failed to save to Clipboard");
});


document.getElementById("toggle")?.addEventListener('click', toggleBrightness);
document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
