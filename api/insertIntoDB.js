var faker = require('faker');
var fs = require('fs');

var database = { users: [] };

for (var i = 1; i <= 100; i++) {
    database.users.push({
        id: i,
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.commerce.userName,
        password: faker.commerce.password,
    });
}

var json = JSON.stringify(database);
fs.writeFile('api/database.json', json, 'utf8', (err) => {
    if (err) { console.error(err); return; };
    console.log("database.json created");

});