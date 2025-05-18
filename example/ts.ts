enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

type Point = {
  x: number
  y: number
}

interface Shape {
  color: Color
  getArea(): number
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number, public color: Color) {}

  getArea(): number {
    return this.width * this.height
  }
}

const rect: Shape = new Rectangle(10, 20, Color.Blue)

console.log(`Area: ${rect.getArea()}, Color: ${rect.color}`)