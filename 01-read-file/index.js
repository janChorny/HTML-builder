const fs = require('fs');
const path = require('path');

const fileToRead = 'text.txt';
const filePath = path.join(__dirname, fileToRead);
const readStream = fs.createReadStream(filePath, 'utf-8');

let data = '';

readStream.on('data', (chunk) => data += chunk);
readStream.on('end', () => console.log(data));
readStream.on('error', (error) => console.log('Error', error.message));