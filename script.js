/**
 * Tasks:
 * Make it PWA compatible (its in the name dude 😭) CHECK
 * Learn Javascript Async (thats the backbone of the whole thing u jus have an iPhone now 😭) CHECK
 * Make it responsive
 * MEOW
 */

let mainWindow = document.querySelector('main');

if (localStorage.getItem('APIkey') == null) {
    console.log('no key')
    mainWindow.style.display = 'none';
    document.querySelector('body').innerHTML += `<div id='getKey'><input style='width: 90%; padding: 12px 0;' type='text' id='apiKeyGetter'/>
    <p>Warning: You must input the API key EXACTLY as it is, otherwise if the app doesnt function reset the site's cache! Also refresh when you input it successfully!</p>
    <p>Design overhaul for API key input planned!</p>
    <button type='submit'>Submit</button></div>`;
    const apiKeyGetter = document.getElementById('apiKeyGetter');
    document.querySelector('button').addEventListener('click', () => {
        localStorage.setItem('APIkey', apiKeyGetter.value);
        console.log(localStorage.getItem('APIkey'));
        document.getElementById('getKey').style.display = 'none';
    });
    apiKeyGetter.style.disp
    mainWindow.style.display = 'block';

}
console.log('hello', localStorage.getItem('APIkey'))

const resultsDiv = document.getElementById('results');
const searchBar = document.getElementById('searchBar');
let dataO = undefined;
let startingIndex = 0;



function search(query, start = 0, end = 12, reset = true) {
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

searchBar.addEventListener('change', (e) => {
    e.preventDefault();
    console.log('YES', searchBar.value);
    search(searchBar.value)
})