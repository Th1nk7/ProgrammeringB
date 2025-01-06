class Alien {
  constructor(name, age, country) {
    this.name = name
    this.age = age 
    this.country = country
  }

  introduce(alien = true) {
    sendDialogue(this.name, this.age, this.country, `Hello from ${this.name}, ${this.age} years old AND I am an ALIEN living in ${this.country}`)
  }

  speak(n) {
    let msg = ""
    for(let i=0;i<n;i++) {
      msg += random(alienLetters)
    }
    sendDialogue(this.name, this.age, this.country, msg)
  }
}

class Human extends Alien{
  constructor(name, age, nof, country){
    super(name, age, country)
    this.nof = nof
  }

  introduce() {
    sendDialogue(this.name, this.age, this.country, `Hello from ${this.name}, ${this.age} years old. You can find me in ${this.country}`)
  }

  brag() {
    this.nofMSG = `I am superior because I have `
    for(let i=1;i<this.nof;i++) {
      this.nofMSG += `${str(i)}, `
    }
    this.nofMSG += `${str(this.nof)} many fingers!`
    sendDialogue(this.name, this.age, this.country, this.nofMSG)
  }
}