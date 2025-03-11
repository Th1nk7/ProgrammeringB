# p5-ball-project

This project is a simple p5.js application that allows users to spawn and drag balls around the canvas. Each ball is affected by realistic physics, including gravity and collision with the ground.

## Project Structure

- **src/Ball.js**: Contains the `Ball` class, which represents a ball object with properties for position, velocity, and diameter. It includes methods for updating the ball's position based on physics, rendering the ball on the canvas, and checking for collisions with the ground.

- **src/sketch.js**: The main entry point for the p5.js application. This file sets up the canvas, handles mouse events for spawning and dragging balls, and contains the draw loop that updates and renders all balls on the canvas.

- **index.html**: The HTML document that includes the p5.js library and the main JavaScript files, setting up the environment for running the p5.js sketch.

## How to Run the Project

1. Ensure you have a web server running (you can use live-server or any other local server).
2. Open `index.html` in your web browser.
3. Right-click on the canvas to spawn a new ball.
4. Click and hold the left mouse button to drag the ball around the canvas.

## Features

- Spawn multiple balls by right-clicking on the canvas.
- Drag and move balls around by holding the left mouse button.
- Realistic physics simulation for each ball, including gravity and ground collision.