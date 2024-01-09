const cauntryBoxs = document.querySelector(".boxs-grid");
const searchInput = document.getElementById("input");
const searchBtn = document.getElementById("btn");

const fetchCountry = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v2/all`);
        const data = await response.json();
        displayCountryData(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchCountry();

const displayCountryData = (data) => {
    cauntryBoxs.innerHTML = "";

    data.forEach((dataItem) => {
        const { flags, name, population, region, capital } = dataItem;
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
    });
};

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const countryBoxes = cauntryBoxs.querySelectorAll('.box');
    countryBoxes.forEach((box) => {
        const countryName = box.querySelector('.country').textContent.toLowerCase();
        const region = box.querySelector('.reg').textContent.toLowerCase();
        if (countryName.includes(searchTerm)||region.includes(searchTerm)) {
            box.style.display = 'block'; 
        } else {
            box.style.display = 'none'; 
        }
    });
});
