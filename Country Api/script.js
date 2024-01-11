const cauntryBoxs = document.querySelector(".boxs-grid");
const searchInput = document.getElementById("input");
const searchBtn = document.getElementById("btn");

const fetchCountry = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v2/all`);
        const data = await response.json();
        console.log(data);
        displayCountryData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchCountry();

const displayCountryData = (data) => {
    cauntryBoxs.innerHTML = "";

    data.forEach((dataItem,index) => {
        const {
            flags, name, population, region, capital,
            nativeName, subregion, topLevelDomain,
            currencies, languages, borders
        } = dataItem;
        const svgUrl = flags.svg;
        cauntryBoxs.innerHTML += `
            <div class="box">
                <div class="flag">
                    <img src="${svgUrl}" alt="">
                </div>
                <div class="info">
                    <div class="head">
                        <h1 class="country">${name}</h1>
                    </div>
                    <div class="country-info">
                        <div class="inf"><h4>Population: </h4><p class="pop">${population}</p></div>
                        <div class="inf"><h4>Region: </h4><p class="reg">${region}</p></div>
                        <div class="inf"><h4>Capital: </h4><p class="cap">${capital}</p></div>
                    </div>
                </div>
            </div>`;


            cauntryBoxs.addEventListener('click', (e) => {
                // find the clicked countryBox element
                const countryBox = e.target.closest('.box');
            console.log(e.target);
                // find the index of the clicked countryBox
                const index = Array.from(cauntryBoxs.children).indexOf(countryBox);
            
                // set the session storage item
                localStorage.setItem('country', JSON.stringify(data[index]));
            
                // redirect to the new page
                window.location.href = 'countryPage.html';
            });
    });



};

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const countryBoxes = cauntryBoxs.querySelectorAll('.box');
    countryBoxes.forEach((box) => {

        const countryName = box.querySelector('.country').textContent.toLowerCase();
        const region = box.querySelector('.reg').textContent.toLowerCase();
        if (countryName.startsWith(searchTerm) || region.startsWith(searchTerm)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }

    });
});


const mode = document.querySelector(".mode");
const modeImg = document.querySelector(".mode img");
const modePr = document.querySelector(".mode p");
const dark = document.querySelector(".dark");
let darkMode = false;
mode.addEventListener('click', () => {
    if (darkMode) {
        dark.classList.remove('dark')
        darkMode = false;
        modeImg.src = "./assets/icons/light.svg"
        arrow.src = "./assets/icons/arrow-black.svg"
        modePr.textContent = "Light Mode"
    } else {
        modeImg.src = "./assets/icons/night.svg"
        modePr.textContent = "Dark Mode"
        arrow.src = "./assets/icons/arrow-white.svg"
        dark.classList.add('dark')
        darkMode = true;
    }
});

const listHead = document.querySelector(".list-head");
const regionList = document.querySelector(".region-list ul");
const listImg = document.querySelector(".list-head img");
const arrow = document.getElementById("arrow");
listHead.addEventListener("click", () => {
    if (regionList.style.display === "none" || regionList.style.display === "") {
        regionList.style.display = "flex";
        listImg.style.transform = 'rotate(180deg)';
        listImg.style.transition = 'transform 0.5s ease';
    } else {
        regionList.style.display = "none";
        listImg.style.transform = 'rotate(0deg)';
        listImg.style.transition = 'transform 0.5s ease';
    }
}, 1500);







const filterRegion = document.querySelectorAll("#list li");

filterRegion.forEach((regionBtn) => {
    regionBtn.addEventListener("click", async () => {
        const { region } = regionBtn.dataset;
        regionList.style.display = "none";

        try {
            const response = await fetch(`https://restcountries.com/v2/region/${region}`);
            const filteredData = await response.json();
            displayCountryData(filteredData);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    });
});


const countryBoxes = cauntryBoxs.querySelectorAll('.box');

countryBoxes.forEach((countryBox) => {
    console.log(countryBox);
    countryBox.addEventListener("click", () => {
        console.log("a");
    })
})