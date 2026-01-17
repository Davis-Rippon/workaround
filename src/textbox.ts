import { ce } from "./main";
import type { State } from "./types";
import { Constants, getObject, parseQuantifier } from "./util";

export class TextBox {
	state: State;
	object: HTMLElement;
	_current_focus: HTMLElement | null;
	cursor_row_idx: number;
	cursor_col_idx: number;

	constructor(textbox: HTMLElement) {
		this.object = textbox;

		this.cursor_row_idx = -1;
		this.cursor_col_idx = -1; // Dumb but unimportant

		this.state = [ ];

		this._current_focus = null;
	}


	private placeCaretAtEnd(el: HTMLElement) {
		const range = document.createRange();
		const sel = window.getSelection();
		if (!sel) return;

		range.selectNodeContents(el);
		range.collapse(false); 

		sel.removeAllRanges();
		sel.addRange(range);
	}

    private asString() : string {
        let out = "";
        for (const element of this.state) {
            const {name, quantifierA, quantifierB} = element;
            out += `${name}: ${parseQuantifier(quantifierA)} ${parseQuantifier(quantifierB)} \n`
        }

        return out;
    }

    public async saveToClipboard() {
        try {
            await navigator.clipboard.writeText(this.asString());
        } catch (err) {
            return false;
        }

        return true;
    }

	/*
	 * Render changes to a specifc entry 
	 */
	renderEntry(entry_idx?: number) {
		// If no entry_idx specified then render the most recent entry
		if (entry_idx === undefined) {
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
	private newEntry() {
		this.state.push({...Constants.NEW_ENTRY});
		const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);
		entry_html.setAttribute("class", "entry");
		entry_html.innerHTML = `
        <div class="container">
		<div class="cell"" inputmode="search" data-col="0"></div>
        </div>
		<div class="cell" inputmode="decimal" data-col="1"></div>
		<div class="cell" inputmode="decimal" data-col="2"></div>
		`
	}



    private onInput = () => {
        if (!this.current_focus) return;

        let entry = this.state[this.cursor_row_idx];

		switch (this.cursor_col_idx) {
			case 0:
				entry.name = this.current_focus.innerText;
                let suggestions = document.getElementById("suggest");
                if (!suggestions) break;
                suggestions.innerHTML = "<ul>" 
                                        + ce.query(entry.name.split(' ')).map((x, i) => `<li data-col="${i}">` + x + `</li>`).join(' ') 
                                        + "</ul>";


                // Clicking selects a suggestion
                const items = suggestions.querySelectorAll<HTMLLIElement>("li");

                items.forEach((li) => {
                    li.addEventListener("mousedown", (e) => {
                        const index = Number(li.dataset.col);
                        e.preventDefault();
                        this.selectSuggestion(index);
                        this.destroySuggestionBox();
                    });
                });

                this.highlightSuggestion();

                
			break;
			case 1:

			break;
			case 2:
			break;
			default:
				throw new Error("Invalid cursor_col_idx");
		}
    }

    private destroySuggestionBox = () => { document.getElementById("suggest")?.remove(); }
    private selectionIndex = 0;
    private suggestionsBox: HTMLDivElement = (() => {
        // When a suggestion box is created we set the index to 0
        this.selectionIndex = 0;
        const div = document.createElement("div");
        div.id = "suggest";
        div.classList.add("suggestions", "hide-scrollbar");
        return div;
    })();

    private onFocusShowSuggestions = () => {
        const suggestions = this.suggestionsBox;
        this._current_focus?.after(suggestions);
        this.selectionIndex = 0;
        this.highlightSuggestion();

    };

    private selectSuggestion = (index: number = this.selectionIndex) => {
        const suggestionbox = document.getElementById('suggest');

        if (!suggestionbox || !this.current_focus) return;

        const s = suggestionbox?.querySelector(`[data-col="${index}"]`) as HTMLElement | null;

        if (s && this.current_focus) {
            this.current_focus.innerText = s.innerText;
            this.destroySuggestionBox();
            this.advanceCursor();
        }
    }

    private highlightSuggestion() {
        const suggestionbox = document.getElementById('suggest');


        suggestionbox?.querySelectorAll('li').forEach((el, idx) => {
            if (idx === this.selectionIndex) {
                el.classList.add('highlighted');
            } else {
                el.classList.remove('highlighted');
            }
        });
    }

    private handleSuggestSelection = (e: KeyboardEvent) => {
        // Check if suggestion box is visible

        // Scroll up/down
        if (e.key === "." && (e.shiftKey || e.getModifierState("CapsLock")) || e.key === ">") {
            e.preventDefault();
            if (this.selectionIndex != 0) {
                this.selectionIndex = (this.selectionIndex - 1) 
            }

            console.log("Retr");
            this.highlightSuggestion();

        } else if (e.key === ".") {
            e.preventDefault();
            this.selectionIndex = (this.selectionIndex + 1) % ce.size()
            this.highlightSuggestion();
            console.log("Adv");
        }

        if (e.key === "Enter") {
            e.preventDefault();
            this.selectSuggestion(this.selectionIndex);
        }

    };

    set current_focus(el: HTMLElement | null) {
        this._current_focus?.removeEventListener('keydown', this.handleSuggestSelection);
        this._current_focus?.removeEventListener('input', this.onInput);
        this._current_focus?.removeEventListener('blur', this.destroySuggestionBox);
        this._current_focus?.removeEventListener('focus', this.onFocusShowSuggestions);

        this._current_focus = el;

        this._current_focus?.addEventListener('input', this.onInput);

        if (this.cursor_col_idx === 0) {
            this._current_focus?.addEventListener('blur', this.destroySuggestionBox);
            this._current_focus?.addEventListener('focus', this.onFocusShowSuggestions);

            this._current_focus?.addEventListener('keydown', this.handleSuggestSelection);
        }
    }

    get current_focus() {
        return this._current_focus;
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

					if (!document.getElementById(`entry-${this.cursor_row_idx}`))
						this.newEntry();
				}

				const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);

				this.current_focus = entry_html.querySelector(`[data-col="${this.cursor_col_idx}"]`);
				if (!this.current_focus) throw new Error("Cell does not exist");

				this.current_focus.setAttribute("contenteditable", "true");
				this.current_focus.focus({ preventScroll: true });
				this.placeCaretAtEnd(this.current_focus);
	}


	retreatCursor = () => {
		if (this.cursor_row_idx <= 0 && this.cursor_col_idx <= 0) {
			console.log("Cannot retreat cursor");
            if (this.current_focus) this.current_focus.focus({ preventScroll: true });
			return;
		}

		if (this.current_focus) {
			this.current_focus.removeAttribute("contenteditable");
		}

		this.cursor_col_idx--;

		if (this.cursor_col_idx < 0) {
			this.cursor_col_idx = 2;
			this.cursor_row_idx--;
		}

		const entry_html = getObject(this.object, `entry-${this.cursor_row_idx}`);
		this.current_focus = entry_html.querySelector(`[data-col="${this.cursor_col_idx}"]`);
		if (!this.current_focus) throw new Error("Cell does not exist");

		this.current_focus.setAttribute("contenteditable", "true");
		this.current_focus.focus({ preventScroll: true });
		this.placeCaretAtEnd(this.current_focus);
	};

}

