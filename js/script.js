//targeting profile information
const profile = document.querySelector(".overview");

const username = `kaitlyn-marino`;

//fetching information from GitHub profile
const getProfileInfo = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    //console.log(data);
    fetchedUserInfo(data);
};

getProfileInfo();

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
};
