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
  // Big compound lifts
  "barbell back squat",
  "front squat",
  "box squat",
  "pause squat",
  "barbell bench press",
  "close grip bench press",
  "incline bench press",
  "decline bench press",
  "overhead press",
  "push press",
  "deadlift conventional",
  "sumo deadlift",
  "romanian deadlift",
  "trap bar deadlift",

  // Olympic lift variations
  "power clean",
  "hang clean",
  "clean and jerk",
  "power snatch",
  "hang snatch",
  "snatch pull",
  "clean pull",

  // Upper body accessories
  "pull up",
  "chin up",
  "lat pulldown",
  "barbell row",
  "pendlay row",
  "dumbbell row",
  "seated cable row",
  "face pull",
  "rear delt fly",
  "lateral raise",
  "front raise",

  // Pressing accessories
  "dumbbell bench press",
  "dumbbell shoulder press",
  "arnold press",
  "dips weighted",
  "skull crushers",
  "triceps pushdown",
  "overhead triceps extension",

  // Lower body accessories
  "bulgarian split squat",
  "walking lunges",
  "reverse lunges",
  "step ups",
  "leg press",
  "hack squat",
  "leg curl lying",
  "leg curl seated",
  "leg extension",
  "hip thrust",
  "glute bridge",

  // Core & carries
  "hanging leg raise",
  "ab wheel rollout",
  "plank weighted",
  "farmer carry",
  "suitcase carry",

  // Calves & conditioning
  "standing calf raise",
  "seated calf raise",
  "sled push",
  "prowler sprint"
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


document.getElementById("clipboard")?.addEventListener('click', () => {
    sendMessage("Saved to Clipboard");
    tb.saveToClipboard();
});

document.getElementById("toggle")?.addEventListener('click', toggleBrightness);
document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
