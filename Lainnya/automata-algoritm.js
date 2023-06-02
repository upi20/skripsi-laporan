// Javascript program for Finite Automata Pattern
// searching Algorithm

let NO_OF_CHARS = 256;

function getNextState(pat, M, state, x) {
  // If the character c is same as next
  // character in pattern,then simply
  // increment state
  if (state < M && x == pat[state].charCodeAt(0))
    return state + 1;

  // ns stores the result which is next state
  let ns, i;

  // ns finally contains the longest prefix
  // which is also suffix in "pat[0..state-1]c"

  // Start from the largest possible value
  // and stop when you find a prefix which
  // is also suffix
  for (ns = state; ns > 0; ns--) {
    if (pat[ns - 1].charCodeAt(0) == x) {
      for (i = 0; i < ns - 1; i++)
        if (pat[i] != pat[state - ns + 1 + i])
          break;
      if (i == ns - 1)
        return ns;
    }
  }

  return 0;
}

/* This function builds the TF table which
    represents Finite Automata for a given pattern */
function computeTF(pat, M, TF) {
  let state, x;
  for (state = 0; state <= M; ++state)
    for (x = 0; x < NO_OF_CHARS; ++x)
      TF[state][x] = getNextState(pat, M, state, x);
}

/* Prints all occurrences of pat in txt */
function search(pat, txt) {
  let M = pat.length;
  let N = txt.length;

  let TF = new Array(M + 1);
  for (let i = 0; i < M + 1; i++) {
    TF[i] = new Array(NO_OF_CHARS);
    for (let j = 0; j < NO_OF_CHARS; j++)
      TF[i][j] = 0;
  }

  computeTF(pat, M, TF);

  // Process txt over FA.
  let i, state = 0;
  for (i = 0; i < N; i++) {
    state = TF[state][txt[i].charCodeAt(0)];
    if (state == M)
      console.log("Pattern found " + "at index " + (i - M + 1));
  }
}

// Driver code
let pat = "Deterministic Finite Automaton (DFA) method: Automaton Matcher Algorithm: It starts from the first state of the automata and the first character of the text. At every step, it considers next character of text, and look for the next state in the built finite automata and move to a new state.".split("");
let txt = "Automaton".split("");

search(txt, pat);


// This code is contributed by avanitrachhadiya2155