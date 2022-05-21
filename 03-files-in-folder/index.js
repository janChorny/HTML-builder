const fs = require('fs');
const path = require('path');
const filesPath = path.join(__dirname,'secret-folder');

fs.readdir(filesPath, { withFileTypes: true }, (error, files) =>{
	if(error) console.log(error);
	else {
		files.forEach(el =>{
			if(el.isFile()){
				const filePath = `${filesPath}/${el.name}`;
				const fileName = path.parse(filePath).name;
				const fileExtension = path.extname(filePath).slice(1);
				fs.stat(filePath, (error, stats) =>{
					if (error) console.log(error);
					const fileSize = ((stats.size)/1024).toFixed(3);
					console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
				});
			}
		});
	}
});