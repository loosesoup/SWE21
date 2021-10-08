// Avon Abrahams
// 02925737

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

// valid wrd len
 function validWordLength(word){
   return word.length > 2
 }

// if word in dict
 function isPrefix(word, dict){
   return dict[word] != undefined; 
 }

// check if valid word to add to solutions
 function isWord(word,dict){
   return dict[word] == 1;
 }

//in boiunds
 function inBounds(n,i,j){
   return i < n && j < n && i >= 0 && j >=0;
 }

//dfs
 function dfs(grid,dict,seen,word,i,j,solutions,n){
   if ((!inBounds(n,i,j)) || seen[i][j] == true){
     return;
   }
   
   word += grid[i][j];
 
   if( isPrefix(word,dict) == true ){
     
     seen[i][j] = true;
     
     if(isWord(word,dict) && validWordLength(word)){
       solutions.push(word);
     }
     dfs(grid,dict,seen,word,i,j-1,solutions,n);
     dfs(grid,dict,seen,word,i,j+1,solutions,n);
     dfs(grid,dict,seen,word,i-1,j,solutions,n);
     dfs(grid,dict,seen,word,i+1,j,solutions,n);
     dfs(grid,dict,seen,word,i-1,j-1,solutions,n);
     dfs(grid,dict,seen,word,i+1,j-1,solutions,n);
     dfs(grid,dict,seen,word,i-1,j+1,solutions,n);
     dfs(grid,dict,seen,word,i+1,j+1,solutions,n);
   }
   
 }

 //creates "smart" dict?
 function createWordMap(dictionary){
   let dict = {};
   
   for(let i=0;i<dictionary.length;i++){
     const word = dictionary[i];
     // grab first word --> hash in the dictionary as a valid word
     // key = {0:'prefix',1:'word'}
     dict[word] = 1;
     for(let j= word.length-1;j>0;j--){
       // hash every subset of the word in the dict as prefixes
       // iterate right to left and subtract 1 char each iteration
       // 
       //check to see if substring already exits and if it does
       // let its value be the opposite of what it was stored as before
       let subStr = word.substr(0,j); 
       if (! subStr in dict){ // substring not in dict already
         dict[subStr] = 1;
       }
       else{ // substring already in dict
         if(dict[subStr] != 1){
           dict[subStr] = 0;
         } 
       }
         
      }
   }
   return dict;
   
 }
 
 // make sure grid is valid a-z no raw [s,q] must be [st,qu]
 // can see raw [u,t]
 // also make sure n x n grid 
 function isValidGrid(grid){
     //pass
 }
 
 function toLower(letter) {
  return letter.toLowerCase();
 }
 
 function normalize(iter){
     if (typeof(iter[0])== "object" ){
       res = [];
       iter.forEach(row => {
         let r = row.map(toLower);
         res.push(r)});
         return res
     }
     else{
       return iter.map(toLower);
     }
 }
 
 exports.findAllSolutions = function(grid, dictionary) {
   // check if grid or dictionary is not empty
   if (grid == null || dictionary == null ){
     return []
   }
   const n = grid.length
   //isValidGrid(grid)
   
   let solutions = []; // solution set to be returned
   
   // normalize grid and dict to lowercase before I move on!!
   
   dictionary = normalize(dictionary);
   let dict = createWordMap(dictionary);
   grid = normalize(grid);
   
   for(let i=0;i<n;i++){
     for(let j=0;j<n;j++){
       let seen = new Array(n).fill(false).map(() => new Array(n).fill(false));
       let word = "";
       dfs(grid,dict,seen,word,i,j,solutions,n)
       }
   }

  return Array.from(new Set(solutions));
}

var grid = [  ['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];

var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat','pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp','ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
