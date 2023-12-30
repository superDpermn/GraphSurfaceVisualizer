const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const sqrt3 = Math.sqrt(3);
const sizeConstant = 40;
const ySquish = 1;

let rotAngle = 0;

function toIsometric(x, y, z) {
  return [((x - z) * sqrt3) / 2, y - (x + z) / 2];
}

function rotatePointAroundYAxis(point, theta = rotAngle) {
  // Rotation matrix for y-axis
  const newX = point[0] * Math.cos(theta) + point[2] * Math.sin(theta);
  const newY = point[1];
  const newZ = -point[0] * Math.sin(theta) + point[2] * Math.cos(theta);

  return [newX, newY, newZ];
}

function isometricRotated(point, theta) {
  let tempArr = rotatePointAroundYAxis(point, theta);
  return toIsometric(tempArr[0], tempArr[1], tempArr[2]);
}

function drawLine(point1, point2, color = "white", rotation = rotAngle) {
  let p1 = isometricRotated(point1, rotation);
  let p2 = isometricRotated(point2, rotation);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();

  ctx.moveTo(p1[0] + canvas.width / 2, canvas.height / 2 - p1[1]);
  ctx.lineTo(p2[0] + canvas.width / 2, canvas.height / 2 - p2[1]);

  ctx.stroke();
  ctx.closePath();
}

function drawAxis() {
  drawLine([-900, 0, 0], [900, 0, 0], "rgb(187, 0, 0)");
  drawLine(
    [0, -canvas.height / 2, 0],
    [0, canvas.height / 2, 0],
    "rgb(17, 201, 0)"
  );
  drawLine([0, 0, -900], [0, 0, 900], "rgb(0, 110, 255)");
}

function drawAxisLabels() {
  let tempCoord2;
  ctx.font = "15px Arial";
  ctx.fillStyle = "rgb(187, 0, 0)";
  for (let i = -10; i <= 10; i++) {
    if (i == 0) {
      continue;
    }
    let tempCoord = isometricRotated([i, 0.1, 0], rotAngle);
    ctx.fillText(
      i,
      tempCoord[0] * sizeConstant + canvas.width / 2,
      canvas.height / 2 - tempCoord[1] * sizeConstant
    );
  }

  ctx.fillStyle = "rgb(17, 201, 0)";
  for (let i = -7; i <= 7; i++) {
    if (i == 0) {
      continue;
    }
    let tempCoord = toIsometric(0.1, i, 0);
    ctx.fillText(
      i,
      tempCoord[0] * sizeConstant + canvas.width / 2,
      canvas.height / 2 - (tempCoord[1] * sizeConstant) / ySquish
    );
  }
  ctx.fillStyle = "rgb(0, 110, 255)";
  for (let i = -10; i <= 10; i++) {
    if (i == 0) {
      continue;
    }
    let tempCoord = isometricRotated([0, 0.1, i], rotAngle);
    ctx.fillText(
      i,
      tempCoord[0] * sizeConstant + canvas.width / 2,
      canvas.height / 2 - tempCoord[1] * sizeConstant
    );
  }
  ctx.font = "30px Arial";
  tempCoord2 = isometricRotated([11, 0.2, 0], rotAngle);
  ctx.fillStyle = "rgb(187, 0, 0)";
  ctx.fillText(
    "+Y",
    tempCoord2[0] * sizeConstant + canvas.width / 2,
    canvas.height / 2 - tempCoord2[1] * sizeConstant
  );
  tempCoord2 = isometricRotated([0.2, 8, 0], rotAngle);
  ctx.fillStyle = "rgb(17, 201, 0)";
  ctx.fillText(
    "+Z",
    tempCoord2[0] * sizeConstant + canvas.width / 2,
    canvas.height / 2 - (tempCoord2[1] * sizeConstant) / ySquish
  );
  tempCoord2 = isometricRotated([0, 0.2, 11], rotAngle);
  ctx.fillStyle = "rgb(0, 110, 255)";
  ctx.fillText(
    "+X",
    tempCoord2[0] * sizeConstant + canvas.width / 2,
    canvas.height / 2 - tempCoord2[1] * sizeConstant
  );
}

const rainbowColors = getRainbowColors(360);
const colorConst = 2;
let colorOffsetR = 200;
let colorOffsetG = 180;
let colorOffsetB = 100;

let colorIndex = 0;
function getNextColor() {
  if (colorIndex < rainbowColors.length) {
    return rainbowColors[colorIndex++];
  } else {
    colorIndex = 0;
    return rainbowColors[colorIndex++];
  }
}
function setColor(color) {
  colorOffsetR = color[0];
  colorOffsetG = color[1];
  colorOffsetB = color[2];
}

function drawParametric(fn1, fn2, fn3, tStart, tEnd) {
  if (tStart >= tEnd) {
    return false;
  }
  const slice = (tEnd - tStart) / 120;
  let currentPoint = [fn1(tStart), fn2(tStart), fn3(tStart)];
  for (let i = tStart + slice; i <= tEnd; i += slice) {
    let nextPoint = [fn1(i), fn2(i), fn3(i)];
    let currentColor =
      "rgba(" +
      Math.trunc(
        Math.min(Math.max(nextPoint[1] * colorConst + colorOffsetR, 20), 255)
      ) +
      "," +
      Math.trunc(
        Math.min(Math.max(nextPoint[1] * colorConst + colorOffsetG, 20), 255)
      ) +
      "," +
      Math.trunc(
        Math.min(Math.max(nextPoint[1] * colorConst + colorOffsetB, 20), 255)
      ) +
      ",0.9)";
    drawLine(currentPoint, nextPoint, currentColor);
    currentPoint = nextPoint;
  }
  return true;
}

class Graph {
  constructor(
    zFunc,
    xStart,
    xEnd,
    yStart,
    yEnd,
    xsliceCount = 10,
    ysliceCount = 10
  ) {
    this.zFunc = zFunc;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.yStart = yStart;
    this.yEnd = yEnd;
    this.xDir = generateXDirectionSlices(zFunc, xStart, xEnd, xsliceCount);
    this.yDir = generateYDirectionSlices(zFunc, yStart, yEnd, ysliceCount);
    this.slicerX = (xEnd - xStart) / xsliceCount;
    this.slicerY = (yEnd - yStart) / ysliceCount;
  }
  drawFN() {
    for (let i = 0; i < this.xDir.length; i++) {
      drawParametric(
        (t) => {
          return (this.xStart + this.slicerX * i) * sizeConstant;
        },
        (t) => {
          return (this.xDir[i](t) * sizeConstant) / ySquish;
        },
        (t) => {
          return t * sizeConstant;
        },
        this.yStart,
        this.yEnd
      );
    }
    for (let j = 0; j < this.yDir.length; j++) {
      drawParametric(
        (t) => {
          return t * sizeConstant;
        },
        (t) => {
          return (this.yDir[j](t) * sizeConstant) / ySquish;
        },
        (t) => {
          return (this.yStart + this.slicerY * j) * sizeConstant;
        },
        this.xStart,
        this.xEnd
      );
    }
  }
}
