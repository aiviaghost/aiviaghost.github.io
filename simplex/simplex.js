document.getElementById("optimize").addEventListener("click", () => {

    let objective_inputs = document.getElementsByClassName("objective_coefficient")
    let ineq_count = parseInt(document.getElementById("ineq_count").value)
    let var_count = parseInt(document.getElementById("var_count").value)
    let constant_inputs = document.getElementsByClassName("constants")
    let ineq_inputs = document.getElementsByClassName("coefficient")
    let ineq_types = document.getElementsByClassName("lte_or_gte")
    let dict = new Object()
    let solution_mix = []
    let cj_columns = []
    let cj_rows = []
    let tableau = []
    let vars = []


    for (let i = 0; i < var_count; i++) {
        vars.push("x" + (i + 1))
    }

    for (let i = 0; i < ineq_count; i++) {
        vars.push("S" + (i + 1))
        solution_mix.push("S" + (i + 1)) // initial solution mix
    }

    for (let i = 0; i < vars.length; i++) {
        dict[vars[i]] = i;
        dict[i] = vars[i];
    }

    // initialize tableau
    for (let i = 0; i < ineq_count + 2; i++) { // refactor into one-liner?
        tableau.push([])
        for (let j = 0; j < vars.length + 1; j++) {
            tableau[i].push(0)
        }
    }

    // constraints
    for (let i = 0; i < ineq_inputs.length / var_count; i++) {
        for (let j = 0; j < var_count; j++) {
            tableau[i][j] = parseFloat(ineq_inputs[i * var_count + j].value)
        }
    }

    // slack/ surplus variables
    for (let i = 0; i < ineq_count; i++) {
        tableau[i][var_count + i] = (ineq_types[i].selectedIndex == 0) ? 1 : -1
    }

    // constants
    for (let i = 0; i < constant_inputs.length; i++) {
        tableau[i][tableau[i].length - 1] = parseFloat(constant_inputs[i].value)
    }

    // objective function & cj_columns
    for (let i = 0; i < var_count; i++) {
        tableau[tableau.length - 1][i] = parseFloat(objective_inputs[i].value)
        cj_columns.push(parseFloat(objective_inputs[i].value))
    }
    for (let i = 0; i < vars.length - var_count; i++) {
        cj_columns.push(0)
    }

    // cj_rows
    for (let i = 0; i < ineq_count; i++) {
        cj_rows.push(0)
    }

    
    console.table(tableau)

    if (document.getElementById("min_or_max").selectedIndex == 0) {
        // maximize
        simplex_maximize_solver(tableau, solution_mix, cj_columns, cj_rows, dict, vars.length)
    }
    else {
        // minimize
    }
})


function simplex_maximize_solver(tableau, solution_mix, cj_columns, cj_rows, dict, total_var_count) {
    // this will solve maximize problems, refactor to allow for minimize later!!!!!!!!!!!!!!!!!
    // /maybe add artificial varaibles)
    // perform simplex procedures
    while (!is_optimal(tableau[tableau.length - 1])) { // refactor to allow minimize
        // determine pivot_column
        let pivot_column = 0
        for (let i = 0; i < total_var_count; i++) {
            if (tableau[tableau.length - 1][i] > tableau[tableau.length - 1][pivot_column]) {
                pivot_column = i
            }
        }

        // decide which variable should enter solution_mix based on pivot_column
        let entering_variable = dict[pivot_column]

        // determine pivot_row
        let divisors = []
        let constants = []
        for (let i = 0; i < tableau.length - 2; i++) {
            divisors.push(tableau[i][pivot_column])
            constants.push(tableau[i][tableau[i].length - 1])
        }
        let pivot_row = get_pivot_row(constants, divisors)

        // update solution mix
        let leaving_variable_index = pivot_row
        solution_mix[leaving_variable_index] = entering_variable
        cj_rows[pivot_row] = cj_columns[dict[entering_variable]]

        // update tableau based on new pivot_number
        let pivot_number = tableau[pivot_row][pivot_column]
        tableau[pivot_row] = tableau[pivot_row].map(x => x / pivot_number)


        for (let i = 0; i < tableau.length - 2; i++) {
            if (i != pivot_row) {
                let old_row = [...tableau[i]] // constant for each iteration so just old_row[pivot_column] could be stored instead
                for (let j = 0; j < tableau[i].length; j++) {
                    tableau[i][j] = old_row[j] - old_row[pivot_column] * tableau[pivot_row][j]
                }
            }
        }

        // zj_row
        for (let i = 0; i < total_var_count; i++) {
            sum = 0
            for (let j = 0; j < tableau.length - 2; j++) {
                sum += cj_rows[j] * tableau[j][i]
            }
            tableau[tableau.length - 2][i] = sum
        }

        for (let i = 0; i < total_var_count; i++) {
            tableau[tableau.length - 1][i] = cj_columns[i] - tableau[tableau.length - 2][i]
        }
    }

    let total_sum = 0
    for (let i = 0; i < tableau.length - 2; i++) {
        total_sum += tableau[i][tableau[i].length - 1] * cj_columns[dict[solution_mix[i]]]
    }
    console.table(tableau)
    console.log({ total_sum })
}

function is_optimal(objective_function) {
    let result = true
    for (let i = 0; i < objective_function.length; i++) {
        if (objective_function[i] > 0) {
            result = false
            break
        }
    }
    return result
}

function get_pivot_row(constants, divisors) {
    let ratios = []
    for (let i = 0; i < constants.length; i++) {
        if (divisors[i] != 0) {
            ratios.push(constants[i] / divisors[i])
        }
        else {
            ratios.push(Number.MAX_VALUE)
        }
    }
    let smallest = Number.MAX_VALUE
    let index = 0
    for (let i = 0; i < ratios.length; i++) {
        if (ratios[i] < smallest && ratios[i] >= 0) {
            smallest = ratios[i]
            index = i
        }
    }
    return index
}
