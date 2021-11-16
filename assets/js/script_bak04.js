console.log('Javascript starts here');

var website_1_RequestURL = "https://www.balldontlie.io/api/v1/teams";


var website_01_Response = {};
var numTeams = 0;
var selectEl = document.getElementById("team-names");

//need to add this within html

fetch(website_1_RequestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // console.log(data);
        // console.log("data section: ", data["data"]);
        // console.log(data["data"]["length"]);
        numTeams = data["data"]["length"];
        for (var i = 0; i < numTeams; i++) {
            // console.log(data["data"][i]["full_name"]);
            var optionEl = document.createElement("option");
            var dataElement = data["data"][i]["full_name"]

            optionEl.setAttribute("value", dataElement);
            optionEl.textContent = dataElement;

            // console.log(optionEl);
            // appending dropdown menu for team selection
            selectEl.append(optionEl);
        }
        // console.log()

        //not successful in getting this outside "fetch"
        // website_01_Response = data;
    });

function processTeamSelected() {
    // console.log("inside function processTeamSelected");
    var teamSelected = $("#team-names option:selected").text();
    console.log("teamSelected:", teamSelected);
}

document.getElementById("team-names").addEventListener("change", processTeamSelected);

//this got triggered with initial screen display rather
// than when team is selected. Used alternative shown above
// $("#team-names").change(processTeamSelected());



