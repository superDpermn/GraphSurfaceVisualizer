function generateXDirectionSlices(zFN, yStart, yEnd, sliceCount = 30) {
  const slices = [];
  const slicer = (yEnd - yStart) / sliceCount;
  for (let i = yStart; i <= yEnd; i += slicer) {
    const y = i; // Adjust the step size as needed
    const sliceFunction = (x) => zFN({ x, y });
    slices.push(sliceFunction);
  }
  return slices;
}

function generateYDirectionSlices(zFN, xStart, xEnd, sliceCount = 30) {
  const slices = [];
  const slicer = (xEnd - xStart) / sliceCount;
  for (let i = xStart; i <= xEnd; i += slicer) {
    const x = i; // Adjust the step size as needed
    const sliceFunction = (y) => zFN({ x, y });
    slices.push(sliceFunction);
  }
  return slices;
}

function compileMathExpression(expression) {
  try {
    const compiledFunction = math.compile(expression);
    return (variables) => {
      // Evaluate the compiled function with the provided variables
      return compiledFunction.evaluate(variables);
    };
  } catch (error) {
    console.error("Error compiling expression:", error.message);
    return (variables) => {
      return 0;
    };
  }
}

function parseMathExpression(expression) {}
