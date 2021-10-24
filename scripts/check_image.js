const tf = require('@tensorflow/tfjs-node')
tf.enableProdMode()
const nsfw = require('nsfwjs')
const axios = require("axios");

const check_image = async function check_image(base64_image, link) {
    let buffer_image;
    if (link) {
        buffer_image = await axios.get(link, {
            responseType: 'arraybuffer',
        });
        buffer_image = buffer_image.data;
    }
    else {
        buffer_image = Buffer.from(base64_image, 'base64');
    }
    const model = await nsfw.load()
    const image = await tf.node.decodeImage(buffer_image, 3)
    const predictions = await model.classify(image)
    image.dispose()
    let flag = false
    for (let option of predictions) {
        if (["Hentai", "Porn", "Sexy"].includes(option.className)) {
            if (option.probability > 0.7) {
                return option;
            }
        }
    }
    if (!flag) {
        return false;
    }
}


module.exports = check_image;