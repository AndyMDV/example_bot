const { readdirSync } = require('node:fs');

module.exports = async (client) => {
    const events = readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for (const file of events) {
        const event = require(`../events/${file}`);
        if (event.name) client.events.set(event.name, event);
    }
    console.log(`Eventos cargados correctamente`);
}

//Esto carga los eventos del bot a la coleccion de eventos