console.log('Javascript starts here');

var website_1_RequestURL = "https://www.balldontlie.io/api/v1/teams";
var website_2_RequestURL = "https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2021?key=a1724aa8907e4c5ea5ce942d00e99e6f";

var website_01_Response = {};
var numTeams = 0;
var teamSelected = ""
var teamStats = {};
var selectEl = document.getElementById("team-names");

var teamsSelected = [];
var teamsChosen = document.querySelector("#teamsChosen");
var teamListEl = document.querySelector("#team-list");
var statListEl = document.getElementById("stat-list");

// The following function renders items in a todo list as <li> elements
function renderTeams() {
    // Clear todoList element and update todoCountSpan
    teamListEl.innerHTML = "";

    // Render a new li for each todo
    for (var i = 0; i < teamsSelected.length; i++) {
        var team = teamsSelected[i];

        var pEl = document.createElement("p");
        //pEl.textContent = team;
        pEl.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = team;
        button.setAttribute("data-index", i);

        pEl.appendChild(button);
        teamListEl.appendChild(pEl)

    }
}

function getStoredTeams() {
    var storedTeams = JSON.parse(localStorage.getItem("teamSelectedStored"));
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTeams !== null) {
        teamsSelected = storedTeams;
    }

}


//==============================
// adding init
// This function is being called below and will run when the page loads.
function init() {
    // Get stored todos from localStorage
    getStoredTeams();
    // This is a helper function that will render todos to the DOM
    renderTeams();
}

function storeTeams() {
    console.log("inside function processTeamSelected");
    const storageTeamsRaw = localStorage.getItem("teamSelectedStored");
    const storageTeams = JSON.parse(storageTeamsRaw);
    teamSelected = $("#team-names option:selected").text();
    const teams = storageTeams ? [...storageTeams, teamSelected] : [teamSelected];
    console.log(teams);
    localStorage.setItem('teamSelectedStored', JSON.stringify(teams));
}

//==============================


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
            var dataElement = data["data"][i]["full_name"];
            //======================================================
            // Need to change name of 'LA Clippers' to 'Los Angeles Clippers'
            // All other names on both websites agree
            //======================================================
            if (dataElement === 'LA Clippers') {
                dataElement = 'Los Angeles Clippers';
            }

            optionEl.setAttribute("value", dataElement);
            optionEl.textContent = dataElement;

            // console.log(optionEl);
            // var selectPlaceholder = document.createElement("option");
            // selectPlaceholder.setAttribute("disabled", true);
            // selectPlaceholder.setAttribute("selected", true);
            // selectPlaceholder.setAttribute("hidden", true);
            // selectPlaceholder.textContent = "Choose Team";

            // appending dropdown menu for team selection
            // selectEl.append(selectPlaceholder);
            selectEl.append(optionEl);
        }
    });





function processTeamSelected() {
    storeTeams();
    //replaced following with storeTeams above
    // console.log("inside function processTeamSelected");
    // const storageTeamsRaw = localStorage.getItem("teamSelectedStored");
    // const storageTeams = JSON.parse(storageTeamsRaw);
    // teamSelected = $("#team-names option:selected").text();
    // const teams = storageTeams ? [...storageTeams, teamSelected] : [teamSelected];
    // console.log(teams);
    // localStorage.setItem('teamSelectedStored', JSON.stringify(teams));
    // console.log("teamSelected:", teamSelected);

    getStoredTeams();
    renderTeams();

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

    var teamPoints = teamStats.Points;
    var stats = statListEl.querySelectorAll("p");

    stats.forEach(function (stat) {
        stat.remove();
        console.log(stat);
    })



    var nameEl = document.createElement('p');
    nameEl.classList.add("teamStatName");
    nameEl.textContent = "Team stats for " + teamStats.Name;
    console.log(nameEl);
    statListEl.appendChild(nameEl);


    var winsEl = document.createElement('p');
    winsEl.classList.add("teamStat");
    winsEl.textContent = "Team's total wins: " + teamStats.Wins;
    console.log(winsEl);
    statListEl.appendChild(winsEl);

    var lossesEl = document.createElement('p');
    lossesEl.classList.add("teamStat");
    lossesEl.textContent = "Team's total losses: " + teamStats.Losses;
    console.log(lossesEl);
    statListEl.appendChild(lossesEl);

    var pointsEl = document.createElement('p');
    pointsEl.classList.add("teamStat");
    pointsEl.textContent = "Team's total points: " + teamStats.Points;
    console.log(pointsEl);
    statListEl.appendChild(pointsEl);

}

function handleTeamClick(event) {
    console.log(event.target);
    console.log(event.target.parentElement.dataset.index);
    var teamIndex = event.target.parentElement.dataset.index;
    console.log(teamsSelected);
    teamSelected = teamsSelected[teamIndex];
    console.log(teamSelected);
    // displayTeamStats();

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

init();

document.getElementById("team-names").addEventListener("change", processTeamSelected);
teamListEl.addEventListener("click", handleTeamClick);


