import type { State } from "./types";
import { Constants, getObject, parseQuantifier } from "./util";

export class TextBox {
	state: State;
	object: HTMLElement;
	cursor_idx: number;

	constructor(textbox: HTMLElement) {
		this.cursor_idx = 0;
		this.state = [
			{name: "Name", quantifierA: Constants.EMPTY_QUANTIFIER, quantifierB: Constants.EMPTY_QUANTIFIER}
		];
		this.object = textbox;

		this.renderEntry();
	}

	renderEntry(entry_idx?: number) {
		// If no entry_idx specified then render the most recent entry
		if (!entry_idx) {
			entry_idx = this.cursor_idx;
			this.cursor_idx++;
		}

		const entry_html = getObject(this.object, `entry-${entry_idx}`);

		entry_html.setAttribute("class", "entry");

		const entry_obj = this.state[entry_idx];

		if (!entry_obj) {
			throw new Error("TextBox(renderEntry): No Entry to Render");
		}

		const {name, quantifierA, quantifierB} = entry_obj;

		entry_html.innerHTML = `
		<div>${name}</div>
		<div>${parseQuantifier(quantifierA)}</div>
		<div>${parseQuantifier(quantifierB)}</div>
		`
		this.object.appendChild(entry_html);
	}

}
