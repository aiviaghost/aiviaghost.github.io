document.getElementById("create_tableau").addEventListener("click", () => {
    let var_count = document.getElementById("var_count").value
    let ineq_count = document.getElementById("ineq_count").value
    let tableau = document.getElementById("tableau")
    let temp_tableau = ""

    // objective function
    temp_tableau += "<tr><td><select id='min_or_max'><option selected=''>max</option><option>min</option></select></td>"
    temp_tableau += "<td>Z =</td>"
    for (let i = 0; i < var_count; i++) {
        temp_tableau += `<td><input class="objective_coefficient"></td><td>x${i + 1}`
        if (i != var_count - 1) {
            temp_tableau += " + "
        }
        temp_tableau += "</td>"
    }
    temp_tableau += "</tr>"

    // inequalities
    for (let i = 0; i < ineq_count; i++) {
        temp_tableau += "<tr>"
        for (let j = 0; j < var_count; j++) {
            temp_tableau += `<td><input class="coefficient"></td><td>x${j + 1}`
            if (j != var_count - 1) {
                temp_tableau += " + "
            }
            temp_tableau += "</td>"
        }
        temp_tableau += "<td><select class='lte_or_gte'><option selected>&lt;=</option><option>&gt;=</option><option>=</option></select></td><td><input class='constants'></td>"
        temp_tableau += "</tr>"
    }

    tableau.innerHTML = temp_tableau
})
