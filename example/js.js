// Utility function: calculates factorial recursively
const factorial = (n) => {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

// Class with constructor and method
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

// Usage
const alice = new Person('Alice', 30)
alice.greet()

// Arrow function with destructuring and default params
const sayHello = ({ name = 'Guest' } = {}) => console.log(`Hello, ${name}!`)

sayHello()
sayHello({ name: 'Bob' })