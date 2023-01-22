const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const logger = require('./../logger');

module.exports = async client => {

    (await pGlob(`${process.cwd()}/buttons/*.js`)).map(async btnFile => {
        const btn = require(btnFile);

        if(!btn.name) {
            return logger.warn(`Boutons non-déclenché: Aucun nom ! Fichier => ${btnFile}`);
        }
        client.buttons.set(btn.name, btn);
        logger.buttons(`Boutons chargé: ${btn.name}.js`);

    })

}