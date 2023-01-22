const chalk = require('chalk');
const dayjs = require('dayjs');

const format = "{tstamp} {tag} {text}\n";

function write(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `> ${tag} <`;
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(timestamp))
        .replace("{tag}", chalk[bgTagColor][tagColor](logTag))
        .replace("{text}", chalk.white(content));

    stream.write(item);
}

function error(content) { write(content, 'white', 'bgRed', 'ERROR', true); }
function warn(content) { write(content, 'white', 'bgYellow', 'WARN', false); }
function typo(content) { write(content, 'white', 'bgCyan', 'TYPO', true); }
function command(content) { write(content, 'white', 'bgMagenta', 'COMMAND', false); }
function buttons(content) { write(content, 'white', 'bgYellow', 'BUTTON', false); }
function event(content) { write(content, 'white', 'bgBlue', 'EVENT', false); }
function interaction(content) { write(content, 'white', 'bgCyanBright', 'INTERACTION', false); }
function client(content) { write(content, 'white', 'bgGreen', 'CLIENT', false); }

module.exports = { error, warn, typo, command, event, client, buttons, interaction }