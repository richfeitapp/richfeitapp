function solveIt(patterns, dict) {
  const dictSet = new Set();
  let maxLetters = 0;
  dict.forEach(word => {
    dictSet.add(word);
    if (word.length > maxLetters) {
      maxLetters = word.length;
    }
  });

  const allPrefixes = {};
  for (let prefixLen = 1; prefixLen < maxLetters; prefixLen++) {
    const prefixes = new Set();
    allPrefixes[prefixLen] = prefixes;
    dict.forEach(word => {
      if (word.length >= prefixLen) {
        prefixes.add(word.substring(0, prefixLen));
      }
    });
  }

  //patterns = ['PO_T', 'TA_ER', 'ST_VE', 'R_OT', 'HUS_Y', 'T_PE' ];
  //patterns = ['_ANDY', '_UR', 'F_IEND', '_AFFLE', 'C_ASTER', 'IMP_INT'];

  const guessesLeft = patterns.map(wordPattern => getGuesses(wordPattern, dict));
  
  const debug = false;
  debugLog(debug, 'All guesses', guessesLeft);

  const allAnswers = [];
  findMatch([], guessesLeft, dictSet, allPrefixes, debug, allAnswers);
  return allAnswers;
}

function findMatch(guesses, guessesLeft, dictSet, allPrefixes, debug, allAnswers) {
  const resultWord =
      guesses.map(guess => guess.letter).reduce((result, x) => result + x, '');

  if (!guessesLeft.length) {
    debugLog(debug, 'Checking word: ', resultWord);
    if (dictSet.has(resultWord)) {
      allAnswers.push({words: guesses.map(guess => guess.word), resultWord});
    }
    return;
  }

  if (resultWord.length) {
    if (!allPrefixes[resultWord.length].has(resultWord)) {
      debugLog(debug, 'No match for prefix:', resultWord);
      return;
    }
    debugLog(debug, 'Found match for prefix:', resultWord);
  }

  const nextGuessesLeft = guessesLeft.slice(1);
  for (nextGuess of guessesLeft[0]) {
    findMatch(
        guesses.concat(nextGuess), nextGuessesLeft, dictSet, allPrefixes, debug, allAnswers);
  }
}

function getGuesses(wordPattern, dict) {
  wordPattern = wordPattern.toUpperCase().replaceAll(/[_.-]/g, '(.)');
  return dict
      .map(word => word.match(new RegExp(`^${wordPattern}$`)))
      .filter(match => match)
      .map(match => {
        return {word: match[0], letter: match[1]};
      });
}

function debugLog(debug, prefix, message) {
  if (debug) {
    console.log(prefix, message);
  }
}
