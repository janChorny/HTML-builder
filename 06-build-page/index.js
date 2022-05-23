const fs = require('fs');
const path = require('path');
const stylesFrom = path.join(__dirname, 'styles');
const stylesTo = path.join(__dirname, 'project-dist', 'styles.css');
const copyFrom = path.join(__dirname, 'assets');
const copyTo = path.join(__dirname, 'project-dist');
const htmlTemplate = 'template.html';
const pathToTemplate = path.join(__dirname, htmlTemplate);
const pathToHtml = path.join(copyTo, 'index.html');
const pathToComponents = path.join(__dirname, 'components');


//create dir
fs.mkdir(copyTo, { recursive: true }, error => {
		if (error) console.log(error);
 });

//copy template html and rewrite it
fs.copyFile(pathToTemplate, pathToHtml, error => {
		if (error) console.log(error);
	});

//rewrite template html
async function createFinalHtml() {
	let finalHtml = await fs.promises.readFile(pathToTemplate, 'utf-8', error => {
		if (error) console.log(error);
	});
	const htmlComponents = await fs.promises.readdir(pathToComponents, { withFileTypes: true }, error => {
			if (error) console.log(error);
	});
	for (let element of htmlComponents) {
		if (element.isFile() && path.extname(element.name) === '.html') {
			let contentToInsert = await fs.promises.readFile(path.join(pathToComponents, element.name), 'utf-8', error => {
					if (error) console.log(error);
				});
			let contentToReplace = `{{${path.parse(element.name).name}}}`;
			finalHtml = finalHtml.replace(contentToReplace, contentToInsert);
			await fs.promises.writeFile(pathToHtml, finalHtml, error => {
				if (error) console.log(error);
			});
		}
	}
}
createFinalHtml();

//copy directories
function copyDir(copyFrom, copyTo) {
	fs.mkdir(copyTo, { recursive: true }, error => {
		if (error) console.log(error);
	});

	fs.readdir(copyFrom, { withFileTypes: true }, (error, files) => {
		if (error) console.log(error);
		else {
			files.forEach(el => {
				if (el.isFile()) {
					fs.copyFile(path.join(copyFrom, el.name), path.join(copyTo, el.name), error => {
						if (error) console.log(error);
					});
				} else {
					copyDir(path.join(copyFrom, el.name), path.join(copyTo, el.name));
				}
			});
		}
	});
};
copyDir(copyFrom, copyTo);

//add styles
fs.createWriteStream(stylesTo);
fs.readdir(stylesFrom, { withFileTypes: true }, (error, files) => {
	if (error) console.log(error);
	else {
		files.forEach(el => {
			if (el.isFile() && path.extname(el.name) === '.css') {
				let readStream = fs.createReadStream(path.join(stylesFrom, el.name));
				readStream.on('data', chunk => {
					fs.appendFile(stylesTo, chunk, error => {
						if (error) console.log(error);
					});
				});
			}
		});
	}
});

