/**
 * Tasks:
 * Make it PWA compatible (its in the name dude 😭) CHECK
 * Learn Javascript Async (thats the backbone of the whole thing u jus have an iPhone now 😭) CHECK
 * Make it responsive CHECK
 * MEOW CHECK
 * rewrite/format Spaghetti code CHECK
 * redesign API key input screen CHECK
 * 
 * The Plan:
 * Rewrite all the spaghetti code that is the api key getter inside the main element. CHECK
 */

let mainWindow = document.querySelector('main');
const actualAppElement = document.getElementById('mainFR');
const apiKeyGetterWindow = document.getElementById('getKeyWindow');
const submitKeyBtn = document.getElementById('submitKeyBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const resultsDiv = document.getElementById('results');
const searchBar = document.getElementById('searchBar');
let dataO = undefined;
let startingIndex = 0;
const resetAPIkeyBtn = document.getElementById('resetAPIkey');

localStorage.getItem('APIkey') == null ? apiKeyGetterWindow.style.display = 'flex' : actualAppElement.style.display = 'flex';

console.log('hello', localStorage.getItem('APIkey'))




function search(query, start = 0, end = 300, reset = true) {
    const regex = / /g;
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query.replaceAll(regex, '%20')}&dataType=Foundation&api_key=${localStorage.getItem('APIkey')}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            reset == true ? resultsDiv.innerHTML = `<h2>Results: ${data.totalHits}</h2>` : console.log('continue');
            for (let i = start; i <= end; i++) {
                if (data.foods[i]?.description == undefined) break;
                resultsDiv.innerHTML += `<div class='result'>
                <h2 style='padding-left: 3px;'>${data.foods[i]?.description}</h2>
                <p style='padding-left: 3px;' class='category'>${data.foods[i]?.foodCategory != undefined ? data.foods[i]?.foodCategory : ''}</p>
                <p style='padding-left: 3px;' class='nutrients'><span>Protein: ${data.foods[i]?.foodNutrients[0]?.value != undefined ? data.foods[i].foodNutrients[0].value + ' ' + data.foods[i].foodNutrients[0].unitName : 'No Nutrients'}</span></p>
                <div class='yellow ingBtn' name='${i}'>Ingredients</div>
                </div>`
            };
            showIngBtns.forEach((btn) => {
              btn.addEventListener('click', () => {
              console.log('beep')
        
              btn.parentElement.innerHTML += `<p class='ingredients'>${data.foods[btn.getAttribute('name')].ingredients}</p>`
          })
        }) 
    });
    
}

// event Listeners

searchBar.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
    console.log('YES', searchBar.value);
    search(searchBar.value);
    searchBar.blur();
    }
})

searchBar.addEventListener('blur', () => {
    console.log('YES', searchBar.value);
    search(searchBar.value)
    searchBar.blur();
})


submitKeyBtn.addEventListener('click', () => {
    localStorage.setItem('APIkey', apiKeyInput.value);
    apiKeyGetterWindow.style.display = 'none';
    actualAppElement.style.display = 'flex';
    apiKeyInput.value = ''
    submitKeyBtn.blur();
})

resetAPIkeyBtn.addEventListener('click', () => {
    localStorage.clear();
    actualAppElement.style.display = 'none';
    apiKeyGetterWindow.style.display = 'flex';
});