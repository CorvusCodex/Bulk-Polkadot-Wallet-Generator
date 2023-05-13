"use strict";

process.title = "Bulk Polkadot Wallet Generator by CorvusCodex";

//Creaded by: Corvus Codex
//Github: https://github.com/CorvusCodex/
//Licence : MIT License

//Support my work:
//BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3
//ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0
//Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex

// Importing required modules
const CoinKey = require('coinkey');
const ci = require('coininfo');
const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const { Keyring } = require('@polkadot/keyring');
const { randomAsU8a, cryptoWaitReady } = require('@polkadot/util-crypto');

// Creating a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let wallets = [];

// Prompting the user for the number of wallets to generate
rl.question("How many wallets do you want to generate? ", (numWallets) => {
    console.log(`User entered: ${numWallets}`);

    // Parsing the user input as an integer
    numWallets = parseInt(numWallets);

    // Generating the specified number of wallets
    (async () => {
        
        for (let i = 0; i < numWallets; i++) {
            // Wait for the main function to resolve before continuing with the next iteration
            await main();
            console.log(`Generating wallet ${i + 1} of ${numWallets}`);

            
    try {
        // Saving the generated wallets to a file using fs.writeFileSync
        fs.writeFileSync('./generated.txt', JSON.stringify(wallets, null, 4));
        console.log(`Saved generated wallets to generated.txt`);
    } catch (err) {
        console.error(`An error occurred while writing to the file: ${err.message}`);
    }

    // Closing the readline interface
    rl.close();
        }
    })();

    async function main() {
        // Wait for the WASM interface to be ready
        await cryptoWaitReady();
        // Create a new Keyring instance with the sr25519 key type
        const keyring = new Keyring({ type: 'sr25519' });
        // Generate a random seed using the randomAsU8a function
        const seed = randomAsU8a(32);
        // Add a new key pair to the keyring using the generated seed
        const pair = keyring.addFromSeed(seed);

        // Adding the generated wallet to the array
        wallets.push({
            private_key: seed.toString('hex'),
            public_address: pair.address
        });

        console.log(wallets);
    }

    console.log(`Generated ${numWallets} wallets`);

});
