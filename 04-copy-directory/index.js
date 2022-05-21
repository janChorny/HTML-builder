const fs = require('fs');
const path = require('path');
const copyFrom = path.join(__dirname, 'files');
const copyTo = path.join(__dirname,'files-copy');

function copyDir (copyFrom, copyTo) {
	fs.mkdir(copyTo, { recursive: true }, error => {
		if (error) console.log(error);
	});

	fs.readdir(copyFrom, {withFileTypes: true}, (error, files) =>{
		if (error) console.log(error);
		else {
			files.forEach(el => {
					fs.copyFile(path.join(copyFrom, el.name), path.join(copyTo, el.name), error =>{
						if (error) console.log(error);
					});
			});
		}
	});
};

copyDir(copyFrom, copyTo);