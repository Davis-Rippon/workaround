import type { Quantifier } from "./types";

export const Constants = {
	EMPTY_QUANTIFIER: {value: 0, unit: null} as Quantifier
}

export const getObject = (parent: HTMLElement, id: string): HTMLElement => {
	let obj = parent.querySelector<HTMLElement>(`#${id}`)

	if (!obj) {
		obj = document.createElement("div");
		parent.appendChild(obj);
	}

	return obj;
}

export const parseQuantifier = ({value, unit}: Quantifier) => `${value}${unit}`;
