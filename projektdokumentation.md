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

```
## Spread Operator
```js

```
## Destructuring Assignment
```js

```
## Error Catching
```js

```