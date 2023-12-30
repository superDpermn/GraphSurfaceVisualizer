function getRainbowColors(count) {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const currentHue = (i * hueStep) % 360;
    const rgbColor = hsvToRgb(currentHue, 0.2, 0.6);
    colors.push(rgbColor);
  }

  return colors;
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r, g, b;
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

// Example usage:
// const colorCount = 6; // Adjust as needed

// const rainbowColors = getRainbowColors(colorCount);
// console.log(rainbowColors);
