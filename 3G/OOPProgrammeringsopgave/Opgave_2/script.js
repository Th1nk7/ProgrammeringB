let classContainer
let dialogueContainer
let entityListContainer
let entityList = []

function sendDialogue(name, age, country, msg) {
    const div = createDiv()
    const h2 = createElement(`h2`, `${name}, ${str(age)}, ${country}`)
    const h3 = createElement(`h3`, `${msg}`)
    div.child(h2)
    div.child(h3)
    div.parent(dialogueContainer)
    console.log(`${name}, ${str(age)}, ${country}: ${msg}`)

    const container = document.getElementById('dialogue');
    container.scrollTop = container.scrollHeight;
}

function addToEntityList(name, age, country, type) {
    
    function createStyledElement(tag, content, className) {
        const element = createElement(tag, content)
        element.addClass(className)
        return element
    }
    
    const div = createDiv()
    const tag = type === 'header' ? 'h2' : 'h3'

    const eleName = createStyledElement(tag, name, 'nameArea')
    const eleAge = createStyledElement(tag, str(age), 'ageArea')
    const eleCountry = createStyledElement(tag, country, 'countryArea')
    const eleType = createStyledElement(tag, type === 'header' ? 'Type' : type, 'typeArea')

    div.child(eleName); div.child(eleAge); div.child(eleCountry); div.child(eleType);
    div.parent(entityListContainer)
}

function setup() {
    noCanvas()
    entityListContainer = select('#entityList')
    dialogueContainer = select('#dialogue')
    addToEntityList('Name', 'Age', 'Country', 'header')
    sendDialogue('Narrator', 'NaN', '???', 'Welcome to Alien Invasion, feel free to look around!')
    const humanSpawnBtn = select('#humanSpawnBtn')
    const alienSpawnBtn = select('#alienSpawnBtn')

    humanSpawnBtn.mouseClicked(() => {
        getRandomHuman().then((human) => {
            let humanObj = new Human(human.name, human.age, Math.round(random(3, 21)), human.country)
            entityList.push(humanObj);
            humanObj.introduce();
            addToEntityList(human.name, human.age, human.country, 'Human');
            addMarker(Number(human.lat), Number(human.lng), human.iconURL, () => {
                humanObj.brag();
            });
        });
    })
    
    alienSpawnBtn.mouseClicked(() => {
        getRandomAlien().then((alien) => {
            let alienObj = new Alien(alien.name, alien.age, alien.country)
            entityList.push(alienObj);
            alienObj.introduce();
            addToEntityList(alien.name, alien.age, alien.country, 'Alien');
            addMarker(Number(alien.lat), Number(alien.lng), alien.iconURL, () => {
                alienObj.speak(Math.round(random(2,14)))
            });
        });
    })

}