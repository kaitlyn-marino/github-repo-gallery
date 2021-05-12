//targeting profile information
const profile = document.querySelector(".overview");
//global variables
const username = `kaitlyn-marino`;
const displayReposList = document.querySelector(".repo-list");


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
    for (const repo of repos ) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        displayReposList.append(li);
    }
};

