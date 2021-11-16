console.log('Javascript starts here');

var website_1_RequestURL = "https://www.balldontlie.io/api/v1/teams";
// var badR?questUrl = 'https://api.github.com/orgs/nodejddd/repad';

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
            var optionEl = document.createElement("option" );
            optionEl.setAttribute("value", data["data"][i]["full_name"] );
            optionEl.textContent = data["data"][i]["full_name"];
            // create option elements
            // pTags[0].setAttribute("style", "font-size: 40px;")
            // set value attribute to full name property in array elements
            console.log(optionEl);
            selectEl.append(optionEl);
        }
        // console.log()

        //not successful in getting this outside "fetch"
        // website_01_Response = data;
    });

  // this approach not successful
//   console.log(website_01_Response);

