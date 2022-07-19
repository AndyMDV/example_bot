const { readdirSync } = require('node:fs');
const { events } = require('..');

module.exports = async (client) => {
    const event = readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for (const file of event) {
        const eventFile = require(`../events/${file}`);
        if (eventFile.name) {
            events.set(eventFile.name, eventFile);
        } else {
            continue;
        }
    }
    console.log(`Eventos cargados correctamente`);
}

//te pasare esto actualizado para que puedas guiarte