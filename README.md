# Workaround 
Workaround will be a very simple client-side rendered text editor for workout logging. Working around iOS limitations.

## Main Idea
I want a database on my phone that records information about workouts and is controlled by an efficient and simple frontend. 

I would like to have relevant information for my current workout automatically queried and shown, such as:
- How much weight and how many reps were done last time for a given exercise
- when that exercise was last entered
- (maybe) progress trend
- etc

## Features
- Binary File Format (for the meme)
- Database
- Autocomplete
    - Tab button autocompletes field (Multiple options)
    - Ghost of last weight + sets 
    - History DS initialised when page is loaded
    - Current implementation for ranking is Monge-Elkan with levenshtein as similarity function. This has a big asymptotic complexity but it's ok as:
        - The absolute worst case # of strings, tokens and characters per token will be an issue.
        - Need to emphasise correctness

- Text Editing
    - Text State Implementation:
        - list of name, quantifierA, quantifierB
        - `[Entry] -> [<String>, <Quantifier>, <Quantifier>]`
    - As user types, history DS is queried and most likely options are served

## Far-away Features
- Data analysis 

## TODO
- File Format
- Consider removing the edit distance penalty of a token if it is a prefix
- Schema
