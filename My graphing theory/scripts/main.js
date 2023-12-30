//your code here

let G2 = new Graph(
  (x, y) => {
    return 0;
  },
  -5,
  5,
  -5,
  5,
  10,
  10
);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (userGenerated) {
    G2.drawFN();
  } else {
  }

  drawAxis();
  drawAxisLabels();
  if (rotAngle < 2 * Math.PI) {
    rotAngle += 0.0015;
  } else {
    rotAngle = 0;
  }
  setColor(getNextColor());

  requestAnimationFrame(animate);
}

animate();
