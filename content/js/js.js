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
        let data = {title: goal.title, icon: goal.icon, color: `#${goal.color}`, id: goal.id};

        sortedGoalsData.push(data);
    })

    return sortedGoalsData;
};

// Fetch af specifik verdensmål udfra id
async function fetchSpecificGoalData(...id) {
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
        let specificData = {description: specificGoal.description, color: `#${specificGoal.color}`, targets: specificGoal.targets};

        sortedSpecificGoalData.push(specificData);
    })

    return sortedSpecificGoalData;
};

/*
* View
*/
async function setGoalView() {
    let goalData = [...await handleGoalData()];

    console.log(Array.isArray(goalData))
    const goalsContainer = document.querySelector('#goals-container'); // Container der skal indeholde alle mål

    // Printer fejl hvis input til funktion ikke er af typen array
    try {
        if(Array.isArray(goalData) != true) throw 'Input ikke array';
    }
    catch(err) {
        let errMessage = `<p>${err}</p>`;
        goalsContainer.insertAdjacentHTML('beforeend', errMessage);
        goalsContainer.setAttribute('style', 'color:#000;');
    }

    goalData.forEach(goal => { // For hvert mål laves HTML som tilføjes til vores container
        let imgHTML =
            `<div class="goal" data-id="${goal.id}" style="background-color:${goal.color}">
                <div>
                    <h2><span>${goal.id}</span><span>${goal.title}</span></h2>
                    ${goal.icon}
                </div>
            </div>`;

        goalsContainer.insertAdjacentHTML('beforeend', imgHTML);
    })

    let htmlGoals = document.querySelectorAll('.goal'); // Array med alle de oprettede mål

    htmlGoals.forEach(htmlGoal => htmlGoal.addEventListener('click', () => { // Ved klik på et af de oprettede mål
        setSpecificGoalView(htmlGoal.getAttribute('data-id')); // Kalder funktion med id fra klikket mål

        async function setSpecificGoalView(id) {
            let specificGoalDataArray = [...await handleSpecificGoalData(id)]; // Får fat i data ang. klikket mål
            let [specificGoalData] = specificGoalDataArray;

            let html = // Overlay med målets baggrundsfarve og beskrivelse
            `<div id="overlay" style="background-color:${specificGoalData.color}">
                <div class="container">
                    <h1>Beskrivelse af mål ${id}</h1>
                    <p>${specificGoalData.description}</p>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', html); // Overlay tilføjes i bunden af body

            specificGoalData.targets.forEach(subGoal => { // For hvert undermål laves html som tilføjes til overlay container
                let subGoalHTML = `
                <div class="sub-goal">
                    <h2>${subGoal.title}</h2>
                    <p>${subGoal.description}</p>
                <div>`;

                document.querySelector('#overlay .container').insertAdjacentHTML('beforeend', subGoalHTML)
            })
        }
    }))

    document.body.addEventListener('click', () => { // Ved klik på overlay fjernes overlay
        let overlay = document.querySelector('#overlay');

        if(overlay) {
            overlay.remove();
        }
    })
}

setGoalView();