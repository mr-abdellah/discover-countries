'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const inputCountry = document.querySelector('#country');
const h1 = document.querySelector('h1');
/////////////////////////////////////

const renderCountry = (data) => {
    console.log(data[0].borders);
    const html = `
    <article class="country">
        <img class="country__img" src="${data[0].flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data[0].name.common}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>🗺️</span><a href="${Object.values(data[0].maps)[0]}">Direction To ${data[0].name.common}</a></p>
            <p class="country__row"><span>📍</span>${Object.values(data[0].capital)[0]}</p>
            <p class="country__row"><span>👫</span>${(+data[0].population / 1000000).toFixed(1)} M people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data[0].languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data[0].currencies)[0].name}</p>
            <p class="country__row"><span>⏲️</span>${Object.values(data[0].timezones)[0]}</p>
            </div>
            </article>
            `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountry = (country) => {
    // const request = new XMLHttpRequest();
    // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    // request.send();
    
    // request.addEventListener('load', function () {
    //     const data = JSON.parse(request.responseText);
    //     console.log(data);
    //     const shortcut = Object.values(data[0].currencies)[0].name;
    //     console.log(shortcut);
    // });

    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        renderCountry(data);
        // for(let neighbor of data[0].borders) {
        //     if(!neighbor) return;
        //     fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`).then(response => response.json()).then(data2 => renderCountry(data2))
        // }
        
        addBtn.addEventListener('click', () => {
            for(let neighbor of data[0].borders) {
                if(!neighbor) return;
                fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`).then(response => response.json()).then(data2 => renderCountry(data2))
            }
        }
    );
    }
    );
}


inputCountry.addEventListener('change', () => {
    getCountry(inputCountry.value);
    inputCountry.value = '';
})

const addBtn = document.querySelector('#show-neighbours');
// addBtn.addEventListener('click', () => {
//         for(let neighbor of data[0].borders) {
//             if(!neighbor) return;
//             fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`).then(response => response.json()).then(data2 => renderCountry(data2))
//         }
//     }
// );
