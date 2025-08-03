

const fs = require('fs');
const path = require('path');

function loadInputs(filepath = path.join(__dirname, 'input_config.json')) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`Input file not found at ${filepath}`);
  }
  const rawData = fs.readFileSync(filepath);
  return JSON.parse(rawData);
}

module.exports = { loadInputs };
