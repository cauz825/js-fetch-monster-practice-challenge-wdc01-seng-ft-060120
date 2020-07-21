let baseUrl = "http://localhost:3000"
let monstersUrl = baseUrl + "/monsters"
let pageNumber = 1
let pageUrl = monstersUrl + `/?_limit=50&_page=${pageNumber}`

document.addEventListener("DOMContentLoaded", () => {
    monsterForm();
    fetchMonsters();
    document.addEventListener("click", (event) => {
        if(event.target.id === "forward")
        forwardPage();
        if(event.target.id === "back")
        backPage();
    })
});

function fetchMonsters() {
    fetch(pageUrl)
    .then (response => response.json())
    .then (monsters => renderAllMonsters(monsters))
};

function renderAllMonsters(monsters) {
    monsters.forEach(monster => renderMonster(monster))
};

function renderMonster(monster) {
    let monsterContainer = document.getElementById('monster-container')
    let div = document.createElement("div")
    let monsterName = document.createElement("h2")
    let monsterAge = document.createElement("h4")
    let monsterDescribe = document.createElement("p")

    monsterContainer.appendChild(div)
    div.appendChild(monsterName)
    monsterName.textContent = monster.name
    div.appendChild(monsterAge)
    monsterAge.textContent = `Age: ${monster.age}`
    div.appendChild(monsterDescribe)
    monsterDescribe.textContent = `Bio: ${monster.description}`
};

function monsterForm() {
    let newMonster = document.getElementById("create-monster")
    let monstForm = document.createElement("form");
        monstForm.id = "monster-form"
    let inputName = document.createElement("input")
        inputName.id = "name"
        inputName.placeholder = "name..."
    let inputAge = document.createElement("input")
        inputAge.id = "age"
        inputAge.placeholder = "age..."
    let inputDescription = document.createElement("input")
        inputDescription.id = "description"
        inputDescription.placeholder = "description..."
    let createButton = document.createElement("button")
        createButton.textContent = "Create"

    newMonster.appendChild(monstForm)
    monstForm.appendChild(inputName)
    monstForm.appendChild(inputAge)
    monstForm.appendChild(inputDescription)
    monstForm.appendChild(createButton)

    monstForm.addEventListener("click", (e) => {
        e.preventDefault()
        let monstName = inputName.value
        let monstAge = inputAge.value
        let monstDescription = inputDescription.value
        createMonster(monstName, monstAge, monstDescription)
    })
};

function createMonster(monstName, monstAge, monstDescription) {
    let postRequest = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json.stringify({
            name: monstName,
            age: monstAge,
            description: monstDescription
        })
    }
    fetch(pageUrl, postRequest)
    .then(response => response.json)
    .then(monster => renderMonster(monster))
};

function forwardPage() {
    pageNumber + 1
    console.log(pageNumber)
}

function backPage() {
    console.log("back page")
}

