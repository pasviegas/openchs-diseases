var compiler = require("lispljsp");
var glob = require("glob");
var fs = require("fs");

if (!fs.existsSync("./lib")) fs.mkdirSync("./lib");

function outputFileName(fileName) { 
	return fileName.replace(".lisp", ".json").replace("src", "lib");
}

glob("./src/**/*.lisp", {}, function (er, files) {
	files.forEach(function (file) {
		fs.writeFileSync(outputFileName(file) ,JSON.stringify({
			algorithm: compiler(fs.readFileSync(file, "utf8"))
		}, null, 2));
	})
})
