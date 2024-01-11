'use strict';

const mode = document.querySelector(".mode");
const modeImg = document.querySelector(".mode img");
const modePr = document.querySelector(".mode p");
const arrow = document.querySelector(".back img")
const backBtn = document.querySelector(".back");
const dark = document.querySelector(".m");

let darkMode = false;
mode.addEventListener('click', () => {
    if (darkMode) {
        darkMode = false;
        dark.classList.remove('dark')
        modeImg.src = "./assets/icons/light.svg"
        arrow.src = "./assets/icons/arrow-left-black.svg"
        modePr.textContent = "Light Mode"
    } else {
        modeImg.src = "./assets/icons/night.svg"
        modePr.textContent = "Dark Mode"
        arrow.src = "./assets/icons/arrow-left-white.svg"
        dark.classList.add('dark')
        darkMode = true;
    }
});


backBtn.addEventListener('click', () =>{
    window.location.href = 'index.html';
});





const data = JSON.parse(localStorage.getItem('country'));

const {
    flags,
    name,
    population,
    region,
    capital,
    nativeName,
    subregion,
    topLevelDomain,
    currencies,
    languages,
    borders
} = data;

const flag = document.querySelector('.flag img');
const nativeNameinfo = document.querySelector('#nativeName p');
const populationInfo = document.querySelector("#population p");
const regionInfo = document.querySelector("#region p");
const subRegionInfo = document.querySelector("#subRegion p");
const capitalInfo = document.querySelector("#capital p");
const topLevelDomainInfo = document.querySelector("#topLevelDomain p");
const currenciesInfo = document.querySelector("#currencies p");
const languagesInfo = document.querySelector("#languages p");

const displayInfo = () => {
    flag.src = flags.svg;
    nativeNameinfo.textContent = nativeName;
    populationInfo.textContent = population;
    regionInfo.textContent = region;
    subRegionInfo.textContent = subregion;
    capitalInfo.textContent = capital;
    topLevelDomainInfo.textContent = topLevelDomain;
    currenciesInfo.textContent = currencies.map(currency => currency.code).join(', ');
    languagesInfo.textContent = languages.map(language => language.name).join(', ');
}

displayInfo();

