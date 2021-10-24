const { Client } = require('whatsapp-web.js');
const check_image = require('./scripts/check_image');

let groups = {};
const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
    first_run();
});

client.on('message', async message => {
    if (message.hasMedia) {
        // Download the media to check the images
        const media = await message.downloadMedia();
        if (media) {
            let harmful = await check_image(media.data);
            if (harmful) {
                // TODO Send message to the admin if the chat
            }
        }
    }
});

client.initialize().then();

async function first_run() {
    // TODO get all groups and users, start with 0 messages, check if someone send too mush messages
}