//Select Canvas in HTML File
const canvas = document.querySelector('canvas')

//Be able to draw on canvas
const c = canvas.getContext('2d')

//Set initial canvas width and height to match the browser width and height
canvas.width = innerWidth
canvas.height = innerHeight



//**Variables**//


//Half way in width and height of browser screen
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

//Array of colours to choose from
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']



//**Utility Functions**//


//Produce a random number between the 2 numbers enetered
randomIntFromRange = (min,max) => {
  return Math.floor(Math.random() * (max -min +1) + min);
}

//Returns a colour from the colour array selection
randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
}



//**Event Listeners**//


//Connects the mousemovement the mouse object above
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

//Resizing the browser window
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  //reset animation on resize
  init()
})



//**Objects**//


//Class Constructor that gives instruction on the build, position and movement of each particle
class Particle {
  constructor(x, y, radius, color) {

    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2 //Math.random() places each particle in location of the circle; Math.PI * 2 allows the particles to display 360 degrees of the circle
    this.velocity = 0.07 //Speed of particles
    this.distanceFromCenter = randomIntFromRange(50, 200) //Range of particles from the center. Between the two intergers on the radius of the circle
    this.lastMouse = {
      x: x,
      y: y
    }

    //*Function to update the location of particle
    this.update = () => {

      const lastPoint = {
        x: this.x,
        y: this.y
      }

      this.radians += this.velocity //by adding the velocity to the radians, we add circular movement

      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05 //smoothes over the movement of the particles on the x-axis
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05 //smoothes over the movement of the particles on the y-axis

      this.x = this.lastMouse.x + Math.cos(this.radians)
        * this.distanceFromCenter //Particle displays of the x-axis
      this.y = this.lastMouse.y + (Math.sin(this.radians))
        * this.distanceFromCenter //Particle displays on the y-axis
      //Both instructs the particles to produce a 2d circle. If one is missing, it shows a line
      
      
      this.draw(lastPoint)
    }

    //Function to draw particle
    this.draw = lastPoint => {
      c.beginPath()
      c.strokeStyle = this.color
      c.lineWidth = this.radius
      c.moveTo(lastPoint.x, lastPoint.y)
      c.lineTo(this.x, this.y)
      c.stroke()
      c.closePath()
    }

  }
}


//**Implementation**//


//Array to place particles in
let particles = []

//Function to start movement of particles
init = () => {

  particles = []//state an empty array at the start of the function to clear screen if the resize is triggered

  //Indicates the number of particles wanted on the screen
  for (let i = 0; i < 80; i++) {
    
    const radius = (Math.random() * 2) + 1; //sets a random width for the particle ranging between 1-2px width 
    particles.push(new Particle(
      canvas.width/2, 
      canvas.height/2, 
      radius, 
      randomColor(colors)))
  }
}

//Function to animate
animate = () => {
  
  requestAnimationFrame(animate)
  
  c.fillStyle = "rgba(255, 255, 255, 0.05)"// the lower the ocapity, the longer the particle tail
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update();
  })
}

init()
animate()
