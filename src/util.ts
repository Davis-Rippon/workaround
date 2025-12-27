import type { Quantifier } from "./types";

export const EMPTY_QUANTIFIER: Quantifier = { value: 0, unit: null };

export const HEADER_ENTRY = {
  name: "<p style=\"text-decoration: underline;\">Exercise</p>",
  quantifierA: EMPTY_QUANTIFIER,
  quantifierB: EMPTY_QUANTIFIER
};

export const NEW_ENTRY = {
	name: "",
	quantifierA: EMPTY_QUANTIFIER,
	quantifierB: EMPTY_QUANTIFIER
};

export const Constants = {
  EMPTY_QUANTIFIER,
  NEW_ENTRY,
  HEADER_ENTRY
};

export const getObject = (parent: HTMLElement, id: string): HTMLElement => {
	let obj = parent.querySelector<HTMLElement>(`#${id}`)

	if (!obj) {
		obj = document.createElement("div");
		obj.setAttribute("id", id);
		parent.appendChild(obj);
	}

	return obj;
}

export const parseQuantifier = (q: Quantifier | null | undefined) => {
	if (!q) return "";

	const {value, unit} = q;
	return `${value}${unit}`;
}

export const toggleBrightness = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme === "dark";

  // toggle theme
  root.dataset.theme = isDark ? "light" : "dark";

  // update icon
  const toggle = document.getElementById("toggle");
  if (toggle) {
    toggle.innerText = isDark ? "🌙" : "☀️";
  }
};


export const syncToggleIcon = () => {
  const toggle = document.getElementById("toggle");
  if (!toggle) return;

  toggle.innerText =
    document.documentElement.dataset.theme === "dark" ? "☀️" : "🌙";
};


export const placeCaretAtEnd = (el: HTMLElement) => {
  const range = document.createRange();
  const sel = window.getSelection();
  if (!sel) return;

  range.selectNodeContents(el);
  range.collapse(false); // false = end

  sel.removeAllRanges();
  sel.addRange(range);
}

