let expression = document.getElementById("expression");
let numbers = document.getElementById("numbers");
let operators = document.getElementById("operators");

// enable buttons for numbers
for (let i = 0; i < numbers.childElementCount - 1; i++) {
    numbers.children[i].addEventListener("pointerdown", () => {
        expression.value += numbers.children[i].textContent;
        evaluateExpression();
    })
}

// enable buttons for operators
for (let i = 1; i < operators.childElementCount; i++) {
    operators.children[i].addEventListener("pointerdown", () => {
        expression.value += operators.children[i].textContent;
        evaluateExpression();
    })
}

// enable the "=" button
numbers.children[11].addEventListener("pointerdown", () => displayResult.textContent = evaluatePostfix(infixToPostfix(expression.value)))

// enable the "clear" / "C" button
operators.children[0].addEventListener("pointerdown", () => {
    expression.value = ""; 
    displayResult.textContent = "";
})

function infixToPostfix(input){
    // "/ /g" is a RegEx to target all spaces " "
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
    return ch == '.' || ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' || ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9';
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
        this.stack = [];
    }
    
    push(element) {
        this.stack.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return 'Needs more stuff';
        return this.stack.pop();
    }
    
    peek() {
        if (this.isEmpty()) return 'Needs more stuff';
        return this.stack[this.stack.length - 1];
    }
    
    isEmpty() {
        return !this.stack.length;
    }
}

/*
* WIP
* enable ability to move caret on mobile
*
*
* enable horizontal scrolling but disable normal keyboard input 
* https://stackoverflow.com/questions/8308096/how-to-make-html-text-field-readonly-but-also-scrollable
* http://detectmobilebrowsers.com/
*/
function mobilecheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

if (mobilecheck()) {
    expression.readOnly = true;

    function readOnlyClickHandler() {
        this.removeAttribute('readonly');
    }

    function readOnlyBlurHandler() {
        this.setAttribute('readonly');
    }

    function readOnlyKeypressHandler(e) {
        e.preventDefault();
    }

    document.addEventListener('load', function () {
        expression.addEventListener('click', readOnlyClickHandler);
        expression.addEventListener('blur', readOnlyBlurHandler);
        expression.addEventListener('keypress', readOnlyKeypressHandler);
    });
} 
