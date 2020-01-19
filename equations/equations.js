let wrapper = document.getElementById("wrapper");
let addEq = document.getElementById("addEq");
let btnSolve = document.getElementById("btnSolve");
let eqWrapper = document.getElementById("eqWrapper");

// Reposition the button for adding new equations
function repositionButtons(){
    // left:
    // space between wrapper and edge of window(x-axis)
    let outsideSpace = (window.innerWidth - wrapper.offsetWidth)/2;
    // space between equations and edge of wrapper
    let insideMargin = 0.1 * wrapper.offsetWidth;
    let last = eqWrapper.childNodes.length - 2; // wacky index
    let eqLength = eqWrapper.childNodes[last].offsetWidth;
    addEq.style.left = outsideSpace + insideMargin + eqLength + "px";
    btnSolve.style.left = -70 + addEq.offsetLeft + "px";
    
    // top:
    addEq.style.top = 0.15 * window.innerHeight + 40 * (eqWrapper.childNodes.length - 3) + "px";
    btnSolve.style.top = 55 + addEq.offsetTop + "px";
}

["load", "resize"].forEach(e => {
    window.addEventListener(e, repositionButtons);
})

// add equation
addEq.addEventListener('click', () => {
    let child = document.createElement("input");
    child.classList.add("equations");
    eqWrapper.appendChild(child);
    repositionButtons();
})


// this solves the equations:
btnSolve.addEventListener('click', () => {
    let children = eqWrapper.childNodes.length;
    let vars = [];
    let eqs = [];
    // these loops determine how many and which variables are in the system (ex. {x, y, z})
    for(let i = 0; i < children; i++){
        // if child element is an element node (not a wacky "text node") => do stuff
        if(eqWrapper.childNodes[i].nodeType == "1" && eqWrapper.childNodes[i].classList[0] == "equations"){
            let temp = eqWrapper.childNodes[i].value;
            temp = temp.replace(/ /g, "");
            eqs.push(temp);
            for(let j = 0; j < temp.length; j++){
                let regex = new RegExp("[a-ö]", "i");
                if(temp[j].match(regex) && !vars.includes(temp[j])){
                    vars.push(temp[j]);
                }
            }
        }
    }
    
    // create dictionary to keep track of which var belongs where in the matrix
    let dict = new Object();
    for(let i = 0; i < vars.length; i++){
        dict[vars[i]] = i;
        dict[i] = vars[i];
    }
    console.log(dict);
    
    // create the matrix
    let matrix = [];
    for(let i = 0; i < eqs.length; i++) {
        matrix[i] = [];
        for(let j = 0; j <= vars.length; j++) {
            matrix[i][j] = 0;
        }
    }
    
    /* 
    * populate the matrix with the coefficients from each equation
    * use dictionary to place each variable in its specific column
    * if an "=" is detected add the subsequent constant term to the last column in the matrix
    */
    for(let i = 0; i < eqs.length; i++){
        let eq = eqs[i];
        for(let j = 0; j < eq.length; j++){
            if(vars.includes(eq[j])){
                matrix[i][dict[eq[j]]] = coefficient(eq, j);
            }
            else if(eq[j] == "="){
                matrix[i][vars.length] = constantTerm(eq, j+1);
            }
        }
    }

    // log initial matrix
    let cMatrix = [];
    for(let i = 0; i < matrix.length; i++){
        cMatrix[i] = [...matrix[i]];
    }
    console.table(cMatrix);
    
    // determines the coefficient infront of a variable
    function coefficient(str, end){
        let start = end - 1;
        while(start >= 0 && str[start].match(/[0-9.]/)){
            start--;
        }
        let result = parseFloat(str.substring(start, end));
        if(!isNaN(result)){
            return result;
        }
        else if(str[start] == "-"){
            return -1;
        }
        else{
            return 1;
        }
    }
    
    // determines the constant term after the "="
    function constantTerm(str, start){
        let end = start;
        while(end < str.length && str[end].match(/[0-9-.]/)){
            end++;
        }
        return parseFloat(str.substring(start, end));
    }
    
    // WIP, TODO: refactor =>
    // => while (main diagonal != 1) => swap rows
    // after main diagonal contains no zeros =>
    // => set main iagonal to one and set the rest to zero
    for(let i = 0; i < matrix.length; i++){
        let mainCo = matrix[i][i];
        /* 
        * if coefficient in main-diagonal is 0
        * swap row with a row containing a variable in same column that is != 0
        */
        if(mainCo == 0){
            for(let j = matrix.length - 1; j >= 0; j--){ // try "let j = i + 1" or "j = 0"
                if(matrix[j][i] != 0){
                    let temp = [...matrix[i]]; // spread operator Pogchamp
                    matrix[i] = [...matrix[j]];
                    matrix[j] = [...temp];
                    mainCo = matrix[i][i];
                    break;
                }
            }
        }
        if(mainCo != 1){
            setMainCoToOne(matrix[i], i);
            mainCo = matrix[i][i];
        }

        // set the coefficients below the main diagonal to 0
        for(let j = i + 1; j < matrix.length; j++){
            if(matrix[j][i] != 0){
                let factor = -1 * matrix[j][i];
                for(let k = 0; k <= vars.length; k++){
                    matrix[j][k] += factor * matrix[i][k];
                }
            }
        }
    }

    // sets coefficients along "main-diagonal" to 1
    function setMainCoToOne(row, i){
        let mainCo = row[i];
        for(let j = 0; j <= vars.length; j++){
            row[j] /= mainCo;
        }
    }

    // sets coefficients above the main diagonal to 0
    for(let i = vars.length - 1; i >= 0; i--){
        for(let j = i - 1; j >= 0; j--){
            if(matrix[j][i] != 0){
                let factor = -1 * (matrix[j][i]);
                matrix[j][i] += factor;
                matrix[j][vars.length] += factor * matrix[i][vars.length];
            }
        }
    }
    console.table(matrix);

    // WIP
    // check if found solutions are valid => output solutions or error message
    for(let i = 0; i < eqs.length; i++){
        for(let j = 0; j < vars.length; j++){
            let variable = new RegExp(dict[j], "g");
            eqs[i] = eqs[i].replace(variable, matrix[i][vars.length]);
        }
    }

    // display results and add option to hide/ remove results
    let results = document.getElementById("results");
    for(let i = 0; i < matrix.length; i++){
        if(dict[i] != undefined){
            let p = document.createElement("p");
            // floating point workaround :ok_hand:
            if(Math.abs(Math.round(matrix[i][vars.length]) - matrix[i][vars.length]) <= 0.0000000001){
                p.textContent = dict[i] + " = " + Math.round(matrix[i][vars.length]);
            }
            else{
                p.textContent = dict[i] + " = " + matrix[i][vars.length];
            }
            results.appendChild(p);
        }
    }
    results.style.display = "block";
    results.addEventListener('mousedown', removeChildren);
    function removeChildren(){
        for(let i = results.childElementCount - 1; i >= 0; i--){
            results.removeChild(results.childNodes[i]);
        }
        results.style.display = "none";
        results.removeEventListener('mousedown', removeChildren);
    }
})