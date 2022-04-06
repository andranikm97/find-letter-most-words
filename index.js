import fetch from 'node-fetch';

// Fetch the document, parse it, and find the letter that start the most words in it. Operation is case-insensitive.
function main() {

  fetch('https://www.gutenberg.org/cache/epub/29364/pg29364.txt')
    .then((res) => res.text(), (e) => console.log('Error in downloading the document:\n\n', e))
    .then((doc) => {
      doc = doc.split(' ');
      const letters = {};
      const winner = [null, -1];

      for (let i in doc) {
        let data = doc[i];
        data = data.replace(new RegExp(/[\n\r]/g), ' ');

        if (data !== '') {
          data = data.replace(/\s+/g, " ").trim().split(' ');
          for (let chunk of data) {
            if (chunk.startsWith('http') || chunk.startsWith('www')) {
              continue;
            } else if (chunk.indexOf('--') !== -1) {
              chunk = chunk.replace('--', ' ').split(' ');
              chunk.forEach(element => checkChunk(element, letters, winner));
            } else if (chunk.indexOf('-') !== -1) {
              chunk = chunk.replace('-', ' ').split(' ');
              chunk.forEach(element => checkChunk(element, letters, winner));
            } else {
              checkChunk(chunk, letters, winner);
            }
          }
        }
      }

      console.log('\nResult\n');
      console.log(`Letter '${winner[0]}' starts ${winner[1]} words, which is the most in the given document (case-insensitive).`);
      console.log(`\nCongatulations '${winner[0]}'!`);

      // Uncomment line below to see full statistics (case-insensitive)
      // console.log(letters);
    }, (e) => console.log('Error in parsing the document:\n\n', e))
    .catch(e => console.log('Error in program execution:\n\n', e));
}

// Function checkChunk accepts a chunk and checks whether this chunk is valid to update the object that holds track of letters and the amount of words that each letter has started.
function checkChunk(chunk, letters, winner) {
  if (chunk.length === 1) {
    if (chunk === 'a') {
      updateLetterCount(letters, 'a', winner);
    }
  } else {
    if (["\'", "\"", "_", "[", "]", "(", ")", "\/", "\\", ",", "."].includes(chunk[0]) && isLetter(chunk[1]) && isLetter(chunk[2])) {
      updateLetterCount(letters, chunk[1], winner);
    } else if (isLetter(chunk[0]) && (isLetter(chunk[1]) || chunk[1] === '.')) {
      updateLetterCount(letters, chunk[0], winner);
    }
  }
}

// Function updateLetterCount updates the object that holds track of letters and the amount of words that each letter has started. It also updates the 'winner' array, which holds the current letter with most started words in the document.
function updateLetterCount(letters, letter, winner) {
  letter = letter.toLowerCase();

  if (!letters[letter]) {
    letters[letter] = 1;
  } else {
    letters[letter] = letters[letter] + 1;
  }

  if (letters[letter] > winner[1]) {
    winner[0] = letter;
    winner[1] = letters[letter];
  }
}

// Function isLetter checks if a character is an alphabetic letter.
function isLetter(c) {
  if (typeof c !== 'string') return false;

  let code = c.toLowerCase().charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return true;
  }

  return false;
}

main();
console.log('...searching');