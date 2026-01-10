export type State = Entry[];

export type Entry = {
	name: string;
	quantifierA: Quantifier;
	quantifierB: Quantifier;
};

export type Quantifier = {
	value: number;
	unit: Unit;
};

type Unit = 
	"kg" |
	"min"|
	"km" |
	null;
