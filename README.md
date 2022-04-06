# Logic

This program downloads a text file from https://www.gutenberg.org/cache/epub/29364/pg29364.txt, parses it, and outputs the letter (case-insensitive) that starts the most words in this file.

# Decision making

As I browsed the document for kinds of input, I made a few assumptions that affected the way I would write my program:

1. The letter 'a' is considered a word (according to people on Quora).
2. All web links (i.e. strings starting with 'http' or 'www') are not considered as words.
3. Abbreviations with 1 letter ahead of a dot, like 'U.S.', are considered as word ('U.S.' = 2 words).
4. For any string that has a '-' or '--' (such cases exist), any adjacent word (if valid) to such an instance is counted as a separate word, instead of the string being counted as a whole word. For example, 'one-pound' is counted as 2 words.
5. Special characters that can preceed a valid word are: '\', '/', '[', ']','(',')', '_', ',', and '.'.

If I had the opportunity to ask questions, I would simply verify that the assumptions above are correct. 

# Trade-offs

I think the program accomplishes exactly what I expected given the complexity of the task and avaliable tools.

# Prerequisites

In order to be able to run this program, please make sure that you have Node.js installed at version 12.20.0 or higher, and that you have npm configured as a global executable. Node.js should already come with node and npm executables.

# Executing

In order to run this program, please unzip this folder, open it in an editor of your choice, and run the following commands from the terminal at the same location:

1. `npm install`
2. `node index.js`

