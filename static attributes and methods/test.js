class Person {
  name;
  static numberOfPeople = 0;

  constructor(name){
    this.name = name;
    Person.numberOfPeople++;
  }

  static getNumberOfPeople(){
    return this.numberOfPeople;
  }
}

const p = new Person("tim");
const p2 = new Person("joe");
console.log(Person.numberOfPeople);