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

    if (unit == "kg") 
        return `${value}${unit}`;

    if (unit == "r/s")
        return value;
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

export const levenshteinDist = (a: String, b: String): number => {
    const DP: number[][] = Array.from({ length: a.length }, () => new Array<number>(b.length));

    for (let i = 0; i < a.length; i++) {
        DP[i][0] = i;
    }

    for (let i = 0; i < b.length; i++) {
        DP[0][i] = i;
    }

    for (let i = 1; i < a.length; i++) {
        for (let j = 1; j < b.length; j++) {
            if (a[i] === b[j]) DP[i][j] = DP[i-1][j-1];
            else {
                DP[i][j] = Math.min(
                    DP[i][j - 1] + 1,
                    DP[i - 1][j] + 1,
                    DP[i - 1][j - 1] + 1,
                );
            }
        }
    }

    return DP[a.length - 1][b.length - 1];
};

export const mongeElkan = (ra: String[], rb: String[]): number => {
    if (ra.length === 0) return rb.length > 0 ? 1 : 0;
    if (rb.length === 0) return 1;

    let sum = 0;

    for (const ta of ra) {

        let distMin = Infinity;
        for (const tb of rb) {
            const d = levenshteinDist(ta, tb);
            if (d < distMin) distMin = d;
            if (distMin === 0) break;
        }
        sum += distMin;
    }
    return sum/ra.length;
};
