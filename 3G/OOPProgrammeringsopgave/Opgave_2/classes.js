class Alien {
  constructor(name, age, country) {
    this.name = name
    this.age = age 
    this.country = country
  }

  introduce(alien = true) {
    if (alien) {
      sendDialogue(this.name, this.age, this.country, `Hello from ${this.name}, ${this.age} years old AND I am an ALIEN from ${this.country}`)
    }
    else {
      sendDialogue(this.name, this.age, this.country, `Hello from ${this.name}, ${this.age} years old`)
    }
  }
}

class Human extends Alien{
  constructor(name, age, nof, country){
    super(name, age, country)
    this.nof = nof
  }

  introduce() {
    super.introduce(false)
    sendDialogue(this.name, this.age, this.country, `You can find me in ${this.country}`)
  }

  brag() {
    this.nofMSG = `I am superior because I have `
    for(let i=1;i<this.nof;i++) {
      this.nofMSG += `${str(i)}, `
    }
    this.nofMSG += `${str(i)} many fingers!`
    sendDialogue(this.name, this.age, this.country, this.nofMSG)
  }
}