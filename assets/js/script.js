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

//need to add this within html

//==========================================
//local storage

//==========================================

//This function is being called below and will run when the page loads.
function init() {
  // Get stored teamsSelected from localStorage


  var storedTeams = JSON.parse(localStorage.getItem("teamsSelected"));

  // If teamsSelected were retrieved from localStorage, update the teamsSelected array to it
  if (storedTeams !== null) {
    teamsSelected = storedTeams;
  }
  console.log(teamsSelected);
  // This is a helper function that will render teamsSelected to the DOM
  renderTeamsSelected();
}

  
  function storeTeamsSelected() {
    // Stringify and set key in localStorage to teamsSelected array
    localStorage.setItem("teamsSelected", JSON.stringify(teamsSelected));
  }

  function renderTeamsSelected() {
      console.log(teamsSelected);
  }
  
  // Add submit event to form
  teamsChosen.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var teamsInputText = todoInput.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (teamsInputText === "") {
      return;
    }
  
    // Add new todoText to teamsSelected array, clear the input
    teamsSelected.push(todoText);
    teamsInput.value = "";
  
    // Store updated teamsSelected in localStorage, re-render the list
    storeTeamsSelected();
    renderTeamsSelected();
  });
  
  // Add click event to todoList element
  todoList.addEventListener("click", function(event) {
    var element = event.target;
  
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and remove the todo element from the list
      var index = element.parentElement.getAttribute("data-index");
      teamsSelected.splice(index, 1);
  
      // Store updated teamsSelected in localStorage, re-render the list
      storeTeamsSelected();
      renderTeamsSelected();
    }
  });
  
  // Calls init to retrieve data and render it to the page on load
  init()
  

  //==========================================
//end local storage

//==========================================



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
            var selectPlaceholder = document.createElement("option");
            selectPlaceholder.setAttribute("disabled", true);
            selectPlaceholder.setAttribute("selected", true);
            selectPlaceholder.setAttribute("hidden", true);
            selectPlaceholder.textContent = "Choose Team";
            
            // appending dropdown menu for team selection
            selectEl.append(selectPlaceholder);
            selectEl.append(optionEl);
        }
    });

function processTeamSelected() {
    console.log("inside function processTeamSelected");
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
    var footer = document.querySelector(".footer");
    var stats = footer.querySelectorAll("p")
    
    stats.forEach(function(stat){
        stat.remove()
        console.log(stat)
    })
    var winsEl = document.createElement('p');
    winsEl.textContent = "Team's total wins: " + teamStats.Wins;
    console.log(winsEl);
    footer.appendChild(winsEl);

    var winsEl = document.createElement('p');
    winsEl.textContent = "Team's total losses: " + teamStats.Losses;
    console.log(winsEl);
    footer.appendChild(winsEl);

    var winsEl = document.createElement('p');
    winsEl.textContent = "Team's total points: " + teamStats.Points;
    console.log(winsEl);
    footer.appendChild(winsEl);

}


document.getElementById("team-names").addEventListener("change", processTeamSelected);

