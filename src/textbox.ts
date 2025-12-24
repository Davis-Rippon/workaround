import type { State } from "./types";
import { Constants, getObject, NEW_ENTRY, parseQuantifier } from "./util";

export class TextBox {
	state: State;
	object: HTMLElement;
	current_focus: HTMLElement | null;
	cursor_row_idx: number;
	cursor_col_idx: number;

	constructor(textbox: HTMLElement) {
		this.object = textbox;

		this.cursor_row_idx = 0;
		this.cursor_col_idx = -1; // Dumb but unimportant

		this.state = [
			NEW_ENTRY
		];

		this.current_focus = null;

		// Render HEADER_ENTRY
		// this.buildHeader();
	}

	/*
	 * Render changes to a specifc entry 
	 */
	renderEntry(entry_idx?: number) {
		// If no entry_idx specified then render the most recent entry
		if (!entry_idx) {
			entry_idx = this.cursor_row_idx;
		}

		const entry_html = getObject(this.object, `entry-${entry_idx}`);

		entry_html.setAttribute("class", "entry");

		const entry_obj = this.state[entry_idx];

		if (!entry_obj) {
			throw new Error("TextBox(renderEntry): No Entry to Render");
		}

		const {name, quantifierA, quantifierB} = entry_obj;

		entry_html.innerHTML = `
		<div id="c0">${name}</div>
		<div id="c1">${parseQuantifier(quantifierA)}</div>
		<div id="c2">${parseQuantifier(quantifierB)}</div>
		`
		this.object.appendChild(entry_html);
	}

	/*
	* Push a blank entry onto the textbox, internally and on the DOM
	* Doesnt increment row_idx
	* Can currently only append entry to end of list
	*/
	newEntry() {
		this.state.push(Constants.NEW_ENTRY);
		const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);
		entry_html.setAttribute("class", "entry");
		entry_html.innerHTML = `
		<div id="c0"></div>
		<div id="c1"></div>
		<div id="c2"></div>
		`
	}

	advanceCursor = () => {
		if (this.current_focus) 
			{
				this.current_focus.removeAttribute("contenteditable");
			}

		if ((this.cursor_col_idx = (this.cursor_col_idx + 1) % 3) === 0) 
			{
				console.log("End of row - creating new entry");
				this.cursor_row_idx++;
				this.newEntry();
			}

		const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);

		console.log(entry_html);

		this.current_focus = getObject(entry_html, `c${this.cursor_col_idx}`);
		this.current_focus.setAttribute("contenteditable", "true");
		this.current_focus.focus();
	}


	retreatCursor = () => {
		if (this.current_focus) 
			{
				this.current_focus.removeAttribute("contenteditable");
			}

		if ((this.cursor_col_idx = (this.cursor_col_idx - 1)) < 0) 
			{
				if (this.cursor_row_idx === 0)
					{
						console.log("Cannot retreat cursor");
						return;
					}
				console.log("End of row - creating new entry");
				this.cursor_row_idx--;
				this.newEntry();
			}

		const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);

		console.log(entry_html);

		this.current_focus = getObject(entry_html, `c${this.cursor_col_idx}`);
		this.current_focus.setAttribute("contenteditable", "true");
		this.current_focus.focus();
	}

}
