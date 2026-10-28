import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const uri = "https://rickandmortyapi.com/api/character/"

function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

async function main() {
    const rl = readline.createInterface({ input, output });
    const id = Number(await rl.question("Insert character ID (1 - 826): "));
    if (isNaN(id) || id < 1 || id > 826) {
        console.log("Error: invalid character ID");
    } else {
        const characterResponse = await fetch(uri + id);
        const character = await characterResponse.json();

        const episodeResponse = character["episode"][getRandInt(character["episode"].length)];
        const episode = await (await fetch(episodeResponse)).json();

        let characterName = character["name"];
        let episodeName = episode["name"];

        console.log("Character: " + characterName);
        console.log("Random episode they're in: " + episodeName);
    }
}

main().catch(console.error);