//targeting profile information
const profile = document.querySelector(".overview");

//global variables
const username = `kaitlyn-marino`;
const displayReposList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const backToRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


//fetching information from GitHub profile
const getProfileInfo = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    //console.log(data);
    fetchedUserInfo(data);
};

getProfileInfo();

//displaying profile information 
const fetchedUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
                        <img alt="user avatar" src=${data.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Bio:</strong> ${data.bio}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                    </div>`;
    profile.append(div);
    getRepos();
};

//fetching repos
const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    fetchedRepoInfo(repoData);
};

//displaying repos
const fetchedRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos ) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        displayReposList.append(li);
    }
};

//event listener for each repo to display further details
displayReposList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

//fetching details about each specific repo to display once clicked on
const specificRepoInfo = async function (repoName) {
    const fetchDetails = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchDetails.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/kaitlyn-marino/github-repo-gallery/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

//displaying specific details of repo
const displayRepoInfo = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    div.classList.add("repo-display-data");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
                    <p>Description: ${repoInfo.description}</p>
                    <p>Default Branch: ${repoInfo.default_branch}</p>
                    <p>Languages: ${languages.join(", ")}</p>
                    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
                    `
    repoDataSection.append(div);
    backToRepoButton.classList.remove("hide");
};

//click event for when the user is on the details page to get back to the home page
backToRepoButton.addEventListener("click", function() {
    reposSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    backToRepoButton.classList.add("hide");
});

//adding input event to the search box
filterInput.addEventListener("input", function (e) {
   const searchValue = e.target.value;
   //console.log(searchValue);
   const repos = document.querySelectorAll(".repo");
   const lowercaseValue = searchValue.toLowerCase();
   for(repo of repos) {
       const lowercaseInnerText = repo.innerText.toLowerCase();
       if (lowercaseInnerText.includes(lowercaseValue)) {
            repo.classList.remove("hide");
       } else {
            repo.classList.add("hide");
       }
   }
});


