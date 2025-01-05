let classContainer
let dialogueContainer
let entityListContainer

function sendDialogue(name, age, country, msg) {
    const div = createDiv()
    const h2 = createElement(`h2`, `${name}, ${str(age)}, ${country}`)
    const h3 = createElement(`h3`, `${msg}`)
    div.child(h2)
    div.child(h3)
    div.parent(dialogueContainer)
    console.log(`${name}, ${str(age)}, ${country}: ${msg}`)
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
            addToEntityList(human.name, human.age, human.country, 'Human');
            addMarker(human.lat, human.lng, human.iconURL, () => {
                console.log("clicked me haha")
            });
        });
    })
    
    alienSpawnBtn.mouseClicked(() => {

    })

}