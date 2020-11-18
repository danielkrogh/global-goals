# global-goals

## Arrow Function
```js
// Til at fjerne overlay bruges arrow function
document.body.addEventListener('click', () => {
    let overlay = document.querySelector('#overlay');

    if(overlay) {
        overlay.remove();
    }
})
```

## Closures
```js
// Dataen vi fethcer returneres
async function fetchGoalsData() {
    let response = await fetch('https://api.mediehuset.net/sdg/goals');
    let data = await response.json();

    return data.items;
};
// Og benyttes i et andet scope
async function handleGoalData() {
    let goalsData = [...await fetchGoalsData()];
};
```
## Rest Parameter
```js
// Funtion der tager imod array med uendelig antal argumenter
async function fetchSpecificGoalData(...id) {
    let response = await fetch(`https://api.mediehuset.net/sdg/goals/${id}`);
    let data = await response.json();
    let dataArray = []
    dataArray.push(data.item)

    return dataArray;
};
```
## Spread Operator
```js
// Spread operator benyttes til at kopiering af array
async function handleGoalData() {
    let goalsData = [...await fetchGoalsData()];
};
```
## Destructuring Assignment
```js
// Array destrukturering
let [specificGoalData] = specificGoalDataArray;
```
## Error Catching
```js

```