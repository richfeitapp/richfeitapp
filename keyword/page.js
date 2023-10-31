const NUM_WORDS = 6;
const MAX_WORD_LEN = 9;

let inputs = [];
let errors = [];

function init() {
  const wordsMatch = window.location.href.match(/[?&]words=([^&]+)/);
  let initWord = null;
  if (wordsMatch) {
    initWord = wordsMatch[1].split(',');
  }
  const div = document.getElementById('patterns');
  for (let i = 0; i < NUM_WORDS; i++) {
    const section = document.createElement('DIV');
    section.className = 'wordSection';
    div.appendChild(section);

    const label = document.createElement('SPAN');
    label.innerText = 'Word 1:';
    label.className = 'label';
    section.appendChild(label);

    const input = document.createElement('INPUT');
    input.type = 'text';
    input.className = 'input';
    if (initWord) {
      input.value = initWord[i];
    }
    section.appendChild(input);
    inputs.push(input);

    const error = document.createElement('SPAN');
    error.className = 'error';
    section.appendChild(error);
    errors.push(error);

    section.appendChild(document.createElement('BR'));
  }

  inputs[0].focus();
}

function validate() {
  let result = true;

  for (let i = 0; i < NUM_WORDS; i++) {
    const error = errors[i];
    error.innerText = '';
    const value = inputs[i].value;
    if (!value) {
      error.innerText =
          'Fill in a word (use underscore or dash or dot for the blank letter).';
      result = false;
    } else {
      const blanksMatch = value.match(/([_.-])/g);
      if (!blanksMatch) {
        error.innerText = 'Use an underscore or dash or dot for the blank letter (like C.T).';
        result = false;
      } else if (blanksMatch.length !== 1) {
        error.innerText = 'Only one blank letter is allowed.';
        result = false;
      } else if (!value.match(/^[A-Za-z_.-]+$/)) {
        error.innerText =
            'Only letters and blanks (underscores or dashes or dots) are allowed.';
        result = false;
      } else if (value.length > MAX_WORD_LEN) {
        error.innerText = `Maximum of ${MAX_WORD_LEN} letters.`;
        result = false;
      }
    }
  }

  return result;
}

function resetSections() {
  document.querySelectorAll('.results_section').forEach(x => x.style.display = 'none');
  document.querySelectorAll('words').forEach(x => x.innerHTML = '');
  document.getElementById('too_many_section').style.display = 'none';
  document.getElementById('failed_section').style.display = 'none';
}

function hint() {
  resetSections();
  
  if (!validate()) {
    return;
  }

  const patterns = inputs.map(input => input.value.toUpperCase());
  const allGuesses = getAllGuesses(patterns, dict);
  const min = allGuesses
      .map(guesses => guesses.length)
      .reduce((min, len) => {
        return !min || len < min ? len : min;
      });
  const max = allGuesses
      .map(guesses => guesses.length)
      .reduce((max, len) => {
        return len > max ? len : max;
      }, 0);
  allGuesses.forEach((guesses, index) => {
    const len = guesses.length;
    let hint = `${len} ${len === 1 ? 'possibility' : 'possibilities'}`;
    if (len === min) {
      hint += ' - KEYWORD!';
    } else if (len === max) {
      hint += ' - WORST!';
    }
    errors[index].innerText = hint;
  });
}

function submit() {
  resetSections();
  
  if (!validate()) {
    return;
  }

  const patterns = inputs.map(input => input.value.toUpperCase());
  const results = solveIt(patterns, dict);
  if (!results.length) {
    document.getElementById('failed_section').style.display = 'block';
  } else {
    if (results.length > 3) {
      document.getElementById('too_many_section').style.display = 'block';
    } else {
      results.forEach((result, index) => {
        const num = index + 1;
        document.getElementById(`results_section${num}`).style.display = 'block';
        document.getElementById(`answer${num}`).innerText = result.resultWord;
        result.words.forEach(word => {
          const li = document.createElement('LI');
          li.innerText = word;
          li.className = 'answerWord';
          document.getElementById(`words${num}`).appendChild(li);
        });
      });

      document.getElementById('button_section').style.display = 'none';
      document.getElementById('reset_section').style.display = 'block';
    }
  }
}
