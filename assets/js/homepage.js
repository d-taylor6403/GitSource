// let response = fetch("https://api.github.com/users/octocat/repos")
// console.log(response);


// let getUserRepo = function() {
// fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//   console.log("inside", response);
// });

// console.log("outside");
// };
// getUserRepo();
//brave browser fix
ethereum.autoRefreshOnNetworkChange = false;


let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


let getUserRepo = function(user) {
    //format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: Not Found" );
        }
    })
    .catch(function(error) {
        //Notice this `.catch()` getting chained on the end of the `.then()` method
        alert('Unable to connect Github');
    });
}


//Function executed upon form submission
let formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepo(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

//function to display repos
let displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl)
    }
};


userFormEl.addEventListener("submit", formSubmitHandler);

