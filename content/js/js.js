async function fetchGoalsData() {
    let response = await fetch('https://api.mediehuset.net/sdg/goals');
    let data = await response.json();

    return data.items;
};

async function handleGoalData() {
    let goalsData = [...await fetchGoalsData()];
    let sortedGoalsData = []

    goalsData.forEach(goal => {
        let data = [goal.title, goal.icon, `#${goal.color}`, goal.id];

        sortedGoalsData.push(data);
    })

    return sortedGoalsData;
};

async function fetchSpecificGoalData(id) {
    let response = await fetch(`https://api.mediehuset.net/sdg/goals/${id}`);
    let data = await response.json();
    let dataArray = []
    dataArray.push(data.item)

    return dataArray;
};

async function handleSpecificGoalData(id) {
    let specificGoalData = [...await fetchSpecificGoalData(id)];
    let sortedSpecificGoalData = []

    specificGoalData.forEach(specificGoal => {
        let specificData = [specificGoal.description, `#${specificGoal.color}`];

        sortedSpecificGoalData.push(specificData);
    })

    return sortedSpecificGoalData;
};

async function setGoalView() {
    let goalData = [...await handleGoalData()];

    const goalsContainer = document.querySelector('#goals-container');

    goalData.forEach(goal => {
        let imgHTML =
            `<div class="goal" data-id="${goal[3]}" style="background-color:${goal[2]}">
                <h2>${goal[0]}</h2>
                ${goal[1]}
            </div>`;

        goalsContainer.insertAdjacentHTML('beforeend', imgHTML);
    })

    let htmlGoals = document.querySelectorAll('.goal');

    htmlGoals.forEach(htmlGoal => htmlGoal.addEventListener('click', () => {
        async function setSpecificGoalView(id) {
            let specificGoalData = [...await handleSpecificGoalData(id)];

            let html =
            `<div id="overlay" style="background-color:${specificGoalData[0][1]}">
                <div class="container">
                    <p>${specificGoalData[0][0]}</p>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', html)
        }
        
        setSpecificGoalView(htmlGoal.getAttribute('data-id'));
    }))

    document.body.addEventListener('click', () => {
        let overlay = document.querySelector('#overlay');

        if(overlay) {
            overlay.remove();
        }
    })
}

setGoalView();