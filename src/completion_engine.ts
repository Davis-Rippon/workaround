/*
    * Autocomplete engine for exercises
*/

import { mongeElkan } from "./util";

export class CompletionEngine {
    tokenisedWords: { tokens: string[]; original: string }[] = [];

    constructor(strs: string[]) {
        for (const str of strs) {
            this.tokenisedWords.push({ tokens: str.toLowerCase().split(' '), original: str });
        }
    }
    
    public query(s: String[]): String[] {
        const out = this.tokenisedWords
        .slice()
        .sort((a, b) => { return mongeElkan(s, a.tokens) - mongeElkan(s, b.tokens)})
        .map(x => x.original);

        return out;
    }

    public size(): number { return this.tokenisedWords.length };
}
