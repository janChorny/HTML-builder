const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

const fileToRightIn = 'text.txt';
const filePath = path.join(__dirname, fileToRightIn);
const writeInStream = fs.createWriteStream(filePath);

const greetingMessage = `Hello, write something here!\n`;
const goodbyeMessage = `\nYour entered message is saved in ${fileToRightIn}. Goodbye!`;

console.log(greetingMessage);

stdin.on('data', data => {
	if (data.toString().trim() === 'exit'){
		process.exit();
	}
	writeInStream.write(data);
});

process.on('exit', ()=>{
	console.log(goodbyeMessage);
});

process.on('SIGINT', ()=>{
	process.exit();
});


