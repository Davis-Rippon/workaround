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

export const parseQuantifier = ({value, unit}: Quantifier) => `${value}${unit}`;
