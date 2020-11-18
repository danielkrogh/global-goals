/*
* Controller
*/
// Fetch af 17 verdensmål
async function fetchGoalsData() {
    let response = await fetch('https://api.mediehuset.net/sdg/goals');
    let data = await response.json();

    return data.items;
};

// Håndtering af 17 verdensmål
async function handleGoalData() {
    let goalsData = [...await fetchGoalsData()];
    let sortedGoalsData = []

    goalsData.forEach(goal => {
        let data = [goal.title, goal.icon, `#${goal.color}`, goal.id];

        sortedGoalsData.push(data);
    })

    return sortedGoalsData;
};

// Fetch af specifik verdensmål udfra id
async function fetchSpecificGoalData(id) {
    let response = await fetch(`https://api.mediehuset.net/sdg/goals/${id}`);
    let data = await response.json();
    let dataArray = []
    dataArray.push(data.item)

    return dataArray;
};

// Håndtering af specifik verdensmål udfra id
async function handleSpecificGoalData(id) {
    let specificGoalData = [...await fetchSpecificGoalData(id)];
    let sortedSpecificGoalData = []

    specificGoalData.forEach(specificGoal => {
        let specificData = [specificGoal.description, `#${specificGoal.color}`, specificGoal.targets];

        sortedSpecificGoalData.push(specificData);
    })

    return sortedSpecificGoalData;
};

/*
* View
*/
async function setGoalView() {
    let goalData = [...await handleGoalData()];

    const goalsContainer = document.querySelector('#goals-container'); // Container der skal indeholde alle mål

    goalData.forEach(goal => { // For hvert mål laves HTML som tilføjes til vores container
        let imgHTML =
            `<div class="goal" data-id="${goal[3]}" style="background-color:${goal[2]}">
                <div>
                    <h2>${goal[0]}</h2>
                    ${goal[1]}
                </div>
            </div>`;

        goalsContainer.insertAdjacentHTML('beforeend', imgHTML);
    })

    let htmlGoals = document.querySelectorAll('.goal'); // Array med alle de oprettede mål

    htmlGoals.forEach(htmlGoal => htmlGoal.addEventListener('click', () => { // Ved klik på et af de oprettede mål
        setSpecificGoalView(htmlGoal.getAttribute('data-id')); // Kalder funktion med id fra klikket mål

        async function setSpecificGoalView(id) {
            let specificGoalData = [...await handleSpecificGoalData(id)]; // Får fat i data ang. klikket mål

            let html = // Overlay med målets baggrundsfarve og beskrivelse
            `<div id="overlay" style="background-color:${specificGoalData[0][1]}">
                <div class="container">
                    <h1>Beskrivelse af mål ${id}</h1>
                    <p>${specificGoalData[0][0]}</p>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', html); // Overlay tilføjes i bunden af body

            specificGoalData[0][2].forEach(subGoal => { // For hvert undermål laves html som tilføjes til overlay container
                let subGoalHTML = `
                <div class="sub-goal">
                    <h2>${subGoal.title}</h2>
                    <p>${subGoal.description}</p>
                <div>`;

                document.querySelector('#overlay .container').insertAdjacentHTML('beforeend', subGoalHTML)
            })
        }
    }))

    document.body.addEventListener('click', () => {
        let overlay = document.querySelector('#overlay');

        if(overlay) {
            overlay.remove();
        }
    })
}

setGoalView();