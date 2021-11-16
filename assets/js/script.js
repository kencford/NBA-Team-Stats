console.log('Javascript starts here');

var website_1_RequestURL = "https://www.balldontlie.io/api/v1/teams";
var website_2_RequestURL = "https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2021?key=a1724aa8907e4c5ea5ce942d00e99e6f";

var website_01_Response = {};
var numTeams = 0;
var teamSelected = ""
var teamStats = {};
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

            //===============================================================
            // Bug: if first item in team selected in the dropdown is first
            // team listed - then nothing happens
            // Somehow we need to have initial text id display box something 
            // other than the first team - something like "Select team"
            //================================================================

            // appending dropdown menu for team selection
            selectEl.append(optionEl);
        }
        // console.log()

        //not successful in getting this outside "fetch"
        // website_01_Response = data;
    });



function processTeamSelected() {
    // console.log("inside function processTeamSelected");
    teamSelected = $("#team-names option:selected").text();
    // console.log("teamSelected:", teamSelected);

    fetch(website_2_RequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // console.log(data);
            // console.log("data section: ", data["data"]);
            // console.log(data["data"]["length"]);
            numTeams = data.length;
            // console.log("numTeams ", numTeams);
            // console.log(data);

            //============================================================
            // Bug **maybe** : If names are not always identical between 2 websites
            // (which Ken is still checking)
            // Then Ken will do a lookup translation
            // It appears that *most* are in agreement
            //============================================================

            for (i = 0; i < numTeams; i++) {
                // console.log(data[i]["Name"]);
                if (data[i]["Name"] === teamSelected) {
                    teamStats = data[i];
                    break;
                }
            }

            // console.log(teamStats);

            // calling function to handle display of team stats
            displayTeamStats();

        })
}

function displayTeamStats() {
    console.log("teamSelected", teamSelected);
    console.log("teamStats:");
    console.log(teamStats);
}

document.getElementById("team-names").addEventListener("change", processTeamSelected);

//this got triggered with initial screen display rather
// than when team is selected. Used alternative shown above
// $("#team-names").change(processTeamSelected());


//displayTeamStats
