"use strict";

const result = document.getElementById("result");

const input = document.getElementById("input");
const btn = document.getElementById("search__btn");

const user = document.getElementById("user");
const username = document.getElementById("username");
const joined = document.getElementById("date");
const repos = document.getElementById("repo");
const followers = document.getElementById("follower");
const followings = document.getElementById("following");
const bio = document.getElementById("bio");
const img = document.getElementById("img");

const repo__links = document.getElementById("repo__links");

const loading = document.getElementById("loading");
const errorEl = document.getElementById("error");

let dev;

const fetchUser = (developer) => {
    loading.classList.remove('hidden');
    fetch(`https://api.github.com/users/${developer}`)
        .then((response) => {
            if (!response.ok) {
                errorEl.classList.remove('hidden');
                result.classList.add('hidden');
                throw new Error("Couldn't find any user");
            } else {
                errorEl.classList.add('hidden');
                result.classList.remove('hidden');
                return response.json();
            }
        })
        .then((data) => {
            loading.classList.add('hidden');
            displayUser(data);
        })
        .catch((error) => {
            console.error(error); 
            loading.classList.add('hidden');
        });
};

btn.addEventListener('click', () => {
    result.classList.add('hidden');
    const givenValue = input.value.trim();
    if (givenValue) {
        fetchUser(givenValue);
    }
    input.value = "";
});

const displayUser = (userData) => {
    const indexOfT = userData.created_at.indexOf("T");
    repos.textContent = userData.public_repos;
    followers.textContent = userData.followers;
    followings.textContent = userData.following;
    bio.textContent = !userData.bio ? "No Bio" : userData.bio;
    username.textContent = "@" + userData.login;
    username.href = userData.html_url;
    img.src = userData.avatar_url;
    user.textContent = userData.name;
    joined.textContent = `Joined ${userData.created_at.slice(0, indexOfT)}`;
};

console.log("a");
