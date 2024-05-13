class Teacher{
  name;
  age;
  #salary;

  constructor(name, age, salary){
    this.name = name;
    this.age = age;
    this.#salary = salary;

  }
// Encapsulation-use the # symbol to make private. only accesible from inside the class
// use getter and setter methods to ensure your code will not be broken by user


  getSalary(){
    return this.#salary;
  }

  setSalary(newSalary){
    if(newSalary <= 0){
      throw Error("Invalid salary, must be above 0.")
    }
    this.#salary = newSalary
  }
}

const teacher = new Teacher("Joe", 24, 65000);
teacher.setSalary(100);
console.log(teacher.getSalary());