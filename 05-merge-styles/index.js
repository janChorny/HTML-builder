const fs = require('fs');
const path = require('path');
const stylesFrom = path.join(__dirname,'styles');
const stylesTo = path.join(__dirname, 'project-dist', 'bundle.css');

fs.createWriteStream(stylesTo);
fs.readdir(stylesFrom, { withFileTypes: true }, (error, files) => {
	if (error) console.log(error);
	else {
		files.forEach(el => {
			if(el.isFile() && path.extname(el.name) === '.css'){
				let readStream = fs.createReadStream(path.join(stylesFrom, el.name));
				readStream.on('data', chunk =>{
					fs.appendFile(stylesTo, chunk, error => {
						if (error) console.log(error);
					});
				});
				}
			});
		}
});