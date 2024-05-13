const personPrototype = {
  greet(){
    console.log(this.name);
  }
}

const tim = Object.create(personPrototype);
tim.name = 'Timothy';
tim.greet();

const proto = Object.getPrototypeOf(tim);
const proto2 = Object.getPrototypeOf(proto);

console.log(Object.getPrototypeOf(proto2));

