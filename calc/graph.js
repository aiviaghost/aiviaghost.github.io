// Convert user input to postfix notation, this makes evaluating input easier since operator presedence is more clear
// Essentially operators follow the operands so "5+2" will become "5 2+"
function infixToPostfix(input){
    input = input.replace(/ /g, "");
    
    // This loop formats the input so that negative numbers become easier to evaluate, i.e "5+-2" will become "5+(0-2)" and "-5*-2" will become "(0-5)*(0-2)"
    let x = 0;
    while(x < input.length){
        if((x > 0 && isOperator(input.charAt(x - 1)) && isOperator(input.charAt(x))) || (x == 0 && isOperator(input.charAt(x)))){
            let i = lengthOfNumber(input, x + 1);
            let tempS1 = input.substring(0, x);
            let tempS2 = "(0" + input.substring(x, x + 1 + i) + ")";
            let tempS3 = input.substring(x + i + 1, input.length);
            input = tempS1 + tempS2 + tempS3;
            
            x += i + 4;
        }
        x++;
    }
    
    let postfix = "";
    
    let operators = new Stack();
    
    /*
    * If we detect a number we add it to the postfix string
    * If we detect an opening parenthesis we add it to the stack
    * If we detect a closing parenthesis we pop all operators in the stack and add them to the postfix string up until the opening parenthesis
    * If we detect an operator we pop all operators in the stack with higher precedence and add them to the postfix string, finally we add the current operator to the stack
    * Lastly we add any remaining operators in the stack to the postfix string
    */
    x = 0;
    while(x < input.length){
        let tempCh = input.charAt(x);
        
        if(isDigit(tempCh)){
            let i = lengthOfNumber(input, x);
            postfix += input.substring(x, x + i) + " ";
            x += i - 1;
        }
        else if(tempCh == '('){
            operators.push(tempCh);
        }
        else if(tempCh == ')'){
            let tempOp = operators.pop();
            while((tempOp) != '('){
                postfix += tempOp;
                tempOp = operators.pop();
            }
        }
        else if(isOperator(tempCh)){
            while(!operators.isEmpty() && precedence(tempCh) <= precedence(operators.peek())){
                postfix += operators.pop();
            }
            operators.push(tempCh);
        }
        
        x++;
    }
    
    while(!operators.isEmpty()){
        postfix += operators.pop();
    }
    
    return postfix;
}

// Function to check if character is one of the supported operators, parentheses are dealt with separately
function isOperator(ch){
    return ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '^';
}

// Function to check if character is a digit or not
function isDigit(ch){
    return ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' || ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9';
}

// Dunction to find the length of the current number, parameters are a string and a starting point in the string
function lengthOfNumber(input, x){
    i = 0;
    while((x + i) < input.length && isDigit(input.charAt(x + i))){
        i++;
    }
    
    return i;
}

// Function to find the length of the current number, parameters are a string and a starting point in the string
function precedence(ch){
    switch (ch){
        case '^':
            return 4;
        case '*':
        case '/':
            return 3;
        case '+':
        case '-':
            return 2;
        // For this implementation opening parenthesis will have a lower precedence than the other operators mainly so that we do not "pop it" to the postfix string
        case '(':
            return 1;
        default:
            return 0;
    }
}

/* 
* Method to evaluate a postfix string
* If we detect a number we add it to the stack
* If we detect an operator we perform it on the last two numbers in the stack
* The last remaining number will be the result of the calculation
*/
function evaluatePostfix(postfix){
    let numbers = new Stack();
    
    x = 0;
    while(x < postfix.length){
        tempCh = postfix.charAt(x);
        
        if(isDigit(tempCh)){
            i = lengthOfNumber(postfix, x);
            numbers.push(postfix.substring(x, x + i));
            x += i - 1;
        }
        else if(isOperator(tempCh)){
            numbers.push(performOperator(numbers.pop(), numbers.pop(), tempCh));
        }
        
        x++;
    }
    
    return numbers.pop();
}

// Function to perform given operator on the last two numbers in the stack
function performOperator(d1, d2, op){
    switch (op){
        case '+':
            return parseInt(d2) + parseInt(d1); // JS be like "let me just add two strings unless parseInt"
        case '-':
            return d2 - d1;
        case '*':
            return d2 * d1;
        case '/':
            return d2 / d1;
        case '^':
            return Math.pow(d2, d1);
        default:
            return null;
    }
}

// JS ain't like Java so no built in Stack<>() FeelsBadMan
class Stack {
    constructor() {
        this.stack = []
    }
    
    push(element) {
        this.stack.push(element)
    }
    
    pop() {
        if (this.isEmpty()) return 'Needs more stuff'
        return this.stack.pop()
    }
    
    peek() {
        if (this.isEmpty()) return 'Needs more stuff'
        return this.stack[this.stack.length - 1]
    }
    
    isEmpty() {
        return !this.stack.length
    }
}


/*
* This code validates the user input for the graph
*/
let graphInput = document.getElementById("graphInput");
let errorSymbol = document.getElementById("warning");
graphInput.value = "x^2 - 10";

//RegEx is bae
let regex = RegExp('[^0-9.x+\\-*/^() ]');

graphInput.addEventListener('focus', () => {
    graphInput.style.borderColor = "#027acc";
    graphInput.style.color = "#c48a73";
    errorSymbol.style.display = "none";
})

graphInput.addEventListener('blur', () => {
    if(graphInput.value == ""){
        graphInput.style.color = "#b4b4b4";
        graphInput.value = "x^2 - 10";
    }
    else if(regex.test(graphInput.value)){
        graphInput.style.borderColor = "red";
        errorSymbol.style.display = "block";
    }
    else{
        document.getElementById("output").textContent = evaluatePostfix(infixToPostfix(graphInput.value));
    }
})


/*
* This code implements the ability to resize the width of the "controls"
*/
let controls = document.getElementById("controls");
let slider = document.getElementById("slider");
let mouseActive = false;

slider.addEventListener('mousedown', () => mouseActive = true);

document.addEventListener('mouseup', () => mouseActive = false);

document.addEventListener('mousemove', e => {
    let controlsWidth = controls.offsetWidth + e.movementX;
    if(mouseActive && (controlsWidth >= 0.2 * window.innerWidth) && (controlsWidth <= 0.9 * window.innerWidth)){
        controls.style.width = controlsWidth + "px";
        slider.style.left = (slider.offsetLeft + e.movementX) + "px";
        errorSymbol.style.left = 0.1 * window.innerWidth + ((controls.offsetWidth - 0.1 * window.innerWidth) / 2) + "px";
    }
})
