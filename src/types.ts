export type State = Entry[];

export type Entry = {
	name: string;
	quantifierA: Quantifier;
	quantifierB: Quantifier;
};

export type Quantifier = {
	value: string;
	unit: Unit;
};

type Unit = 
	"kg" |
	"min"|
	"km" |
   "r/s"|
	null;
