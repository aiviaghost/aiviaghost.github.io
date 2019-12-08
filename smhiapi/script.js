function getWeather(lon, lat) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayData(this)
        }
    };
    let baseURL = "https://opendata-download-metfcst.smhi.se"
    let apiURL = `/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
    xhttp.open("GET", baseURL + apiURL, true);
    xhttp.responseType = 'json';
    xhttp.send();
}

function displayData(data) {
    let json = data.response;
    console.log(json)

    let table = "<tr><th>Hours</th><th>0</th><th>12</th><th>24</th><th>36</th><th>48</th></tr>"
    // Display temperature info
    table += "<tr><td>Temperature [C]</td>"
    for (let i = 0; i <= 48; i += 12) {
        for(let j = 0; j < 18; j++){
            if(json.timeSeries[i].parameters[j].name == "t"){
                table += "<td>" + json.timeSeries[i].parameters[j].values[0] + "</td>"
                break;
            }
        }
    }
    table += "</tr>"
    // Display rain info
    let pcat = ["No precipitation", "Snow", "Snow and rain", "Rain", "Drizzle", "Freezing rain", "Freezing drizzle"];
    table += "<tr><td>Rain</td>"
    for (let i = 0; i <= 48; i += 12) {
        for(let j = 0; j < 18; j++){
            if(json.timeSeries[i].parameters[j].name == "pcat"){
                table += "<td>" + pcat[json.timeSeries[i].parameters[j].values[0]] + "</td>"
                break;
            }
        }
    }
    table += "</tr>"

    document.getElementById("table").innerHTML = table
}

document.getElementById("get").addEventListener("click", () => {
    let lon = document.getElementsByTagName("input")[0].value
    let lat = document.getElementsByTagName("input")[1].value
    getWeather(lon, lat)
})
