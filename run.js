const { resolve } = require('path');
const fs = require('fs');

const [ , , filepath] = process.argv;
const absPath = resolve(process.cwd(), filepath);
const file = absPath.substring(absPath.lastIndexOf('\\') + 1);
const save = absPath.substr(0, absPath.lastIndexOf("\\"));
const name = file.substr(0, file.lastIndexOf("."));

let obj = JSON.parse(fs.readFileSync(absPath, 'utf8'));

let i = 0;
obj.fixture.forEach(e => {
	if (e.key.includes(":")) {
		let split = e.key.split(":");
		let value = obj.fixture[i]["value"]

		obj.fixture[i]["level"] = split[0];
		obj.fixture[i]["type"] = split[1];
		obj.fixture[i]["name"] = value;
		delete obj.fixture[i]["key"];
		delete obj.fixture[i]["value"];
	}
	if (e.key === "Scale") {
		obj.fixture[i]["interiorScale"] = e.value;
		delete obj.fixture[i]["key"];
		delete obj.fixture[i]["value"];
	}
	i++;
});

let furn = obj.furniture;
delete obj.furniture;
obj.interiorFurniture = furn;

let data = JSON.stringify(obj, null, 2);
fs.writeFile(save + "\\" + name + '-updated.json', data, (err) => {
	if (err) throw err;
	console.log('New file saved at ' + save + "\\" + name + "-updated.json");
});
