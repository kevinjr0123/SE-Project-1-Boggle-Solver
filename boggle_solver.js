// Return an array of words from the dictionary if the grid includes all letters for a particular word in the dictionary
exports.findAllSolutions = function(grid, dictionary) {
  let solution = [];

  // checks if grid or dict is empty
  if (grid == null || dictionary == null) 
    return solutions;

  // Loop through the outer array []
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length != grid.length) {
      return solutions;
    }
  }

  // Convert all characters in the grid and dictionary to lower case
  convertToLowerCase(grid, dictionary);

  // Checks if grid is valid 
  if(!isGridValid(grid)) {
    return solutions;
  }

//Setup all data structures
let solutionSet = new Set();
let hash = createHashMap(dictionary);

 //Iterate over NXN grid - find words that begin with grid [y][x]
  for(let y = 0; y < grid.length; y++) {
    for(x = 0; x < grid.length; x++) {
      let word = '';

      let visited = new Array(grid.length).fill(false).map(() => new Array(grid.length).fill(false));

      findWords(word, y, x, grid, visited, hash, solutionSet);
    }
  }
  solutions = Array.from(solutionSet);
  return solutions;
}

findWords = function(word, y, x, grid, visited, hash, solutionSet) {
  let adjMatrix = [[-1, -1],
                  [-1, 0],
                  [-1, 1],
                  [0, 1],
                  [1,1],
                  [1,0],
                  [1,-1],
                  [0,-1]];

  //Base Case:
  //b1: y and x are out of bounds
  //b2: already visited y and x 
  //return 
  if(y < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true)
    return;

  //Append grid[y][x] to the word
  word += grid[y][x];

  //is new word a prefix for any word in trie/hash
  if(isPrefix(word, hash)) {

    //if prefix is a word in the trie, mark as visited
    visited[y][x] = true; 
    if(isWord(word, hash)) {
      
      //if true and word size > 3, add word to solutionSet
      if(word.length >= 3)
        solutionSet.add(word)
    }
    //keep searching using the adjacent tiles, call findWords()
    for(let i = 0; i < 8; i++) {
      findWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
    }

  }

  //if not a prefix, then unmark location y,x as visited
  visited[y][x] = false; 
}

isPrefix = function(word, hash) {
  return hash[word] != undefined;
}

isWord = function(word, hash) {
  return hash[word] == 1;
}

createHashMap = function(dictionary) {
  var dict = {}; 
  for(let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for(let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength-1);
      if(str in dict) {
        if(str == 1) {
          dict[str] = 1;
        }
      }
      else {
        dict[str] = 0;
      }
    }
  }
  return dict;
}
convertToLowerCase = function(grid, dict) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for(let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
}

isGridValid = function(grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
        if(!grid[i][j].match(regex)) {
          return false;
      }
    }
  }
  return true; 
}

var grid = [['Qu', 'A', 'X', 'St', 'L'],
['A', 'R', 'R', 'I', 'L'],
['Y', 'F', 'I', 'E', 'D'],
['M', 'R', 'I', 'C', 'K'],
['A', 'N', 'D', 'M', 'O']];
var dictionary = ['arf', 'ciel', 'derrick', 'army', 'hawaii', 'hero', 'academia', 'still'];

console.log(exports.findAllSolutions(grid, dictionary));
