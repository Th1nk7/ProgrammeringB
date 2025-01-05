let profileArr = []

class Person {
    constructor(name, age, city) {
        this.name = name
        this.age = age
        this.city = city
    }

    yearsTillReitrement() {
        return( 67 - this.age > 0 ? str(67 - this.age) : "Allerede pensioneret!" )
    }

    createDisplay() {
        this.div = createDiv()
        this.div.style(`background-color: rgba(${random(0,200)}, ${random(0,200)}, ${random(0,200)}, 0.6);`)
        this.nameText = createElement('p', `<b>Navn:</b><br>${this.name}`)
        this.nameText.parent(this.div)
        this.ageText = createElement('p', `<b>Alder:</b><br>${this.age}`)
        this.ageText.parent(this.div)
        this.cityText = createElement('p', `<b>By:</b><br>${this.city}`)
        this.cityText.parent(this.div)
        this.div.parent('#profileDisplay')
    }

    createOption(optionId) {
        this.option = createElement('option', `${this.name}, ${str(this.age)}`)
        this.option.value(str(optionId))
        this.option.html(this.name + ", " + str(this.age))
        this.option.parent('#selectPension')
    }
}

function setup() {
    let createProfileButton = select('#createProfile')
    let calcPensionButton = select('#buttonPension')
    let calcPensionSelect = select('#selectPension')
    createProfileButton.mousePressed(newProfile)
    calcPensionButton.mousePressed(() => {
        try {
            for (let i = 0; i < profileArr.length; i++) {
                if (profileArr[i][1] === Number(calcPensionSelect.value())) {
                    if (profileArr[i][0].yearsTillReitrement() != "Allerede pensioneret!") {
                        alert(`Udregnet år til pension: ${profileArr[i][0].yearsTillReitrement()} år`)
                    }
                    else {
                        alert(profileArr[i][0].yearsTillReitrement())
                    }
                }
            }
        } catch (error) {
            alert('Fejl: Du har ikke valgt en person!')
        }
    })
}

function newProfile() {
    let nameField = select('#name').elt.querySelector('input')
    let cityField = select('#city').elt.querySelector('input')
    let ageField = select('#age').elt.querySelector('input')
    if (profileArr.length <= 9) {
        let profile = new Person( nameField.value, Number(ageField.value), cityField.value )
        profile.createDisplay()
        profile.createOption(profileArr.length)
        profileArr.push([profile, profileArr.length])
    }

    else {
        alert('Du kan ikke opretter mere end 10 profiler!')
    }
}

