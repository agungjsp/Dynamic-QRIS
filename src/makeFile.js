const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const { dataQris } = require('../lib');
const makeString = require('./makeString');
const fs = require('fs');

const makeFile = async (qris, { nominal, base64 = false, taxtype = 'p', fee = '0', path = '' } = {}) => {
    try {
        const qrisModified = makeString(qris, { nominal, taxtype, fee });

        await QRCode.toFile('tmp.png', qrisModified, { margin: 2, scale: 10 });

        let data = dataQris(qris);
        let text = data.merchantName;

        const qr = await Jimp.read('tmp.png');
        const image = await Jimp.read('assets/template.png');

        const w = image.bitmap.width;
        const h = image.bitmap.height;

        const jimp = require('jimp');
        const fontTitle = await jimp.loadFont(text.length > 18 ? 'assets/font/BebasNeueSedang/BebasNeue-Regular.ttf.fnt' : 'assets/font/BebasNeue/BebasNeue-Regular.ttf.fnt');
        const fontMid = await jimp.loadFont(text.length > 28 ? 'assets/font/RobotoSedang/Roboto-Regular.ttf.fnt' : 'assets/font/RobotoBesar/Roboto-Regular.ttf.fnt');
        const fontSmall = await jimp.loadFont('assets/font/RobotoKecil/Roboto-Regular.ttf.fnt');
        
        image
            .composite(qr, Math.floor(w / 4 - 30), Math.floor(h / 4 + 68))
            .print({
                font: fontTitle,
                x: Math.floor(w / 5 - 30),
                y: Math.floor(h / 5 + 68 + (text.length > 28 ? -180 : -210)),
                text: text
            })
            .print({
                font: fontMid,
                x: Math.floor(w / 5 - 30),
                y: Math.floor(h / 5 + 68 + (text.length > 28 ? 20 : -45)),
                text: `NMID : ${data.nmid}`
            })
            .print({
                font: fontMid,
                x: Math.floor(w / 5 - 30),
                y: Math.floor(h / 5 + 68 + (text.length > 28 ? 110 : 90)),
                text: data.id
            })
            .print({
                font: fontSmall,
                x: Math.floor(w / 20),
                y: 1205,
                text: `Dicetak oleh: ${data.nns}`
            });

        if (!path) {
            path = `output/${text}-${Date.now()}.jpg`;
        }

        if (base64) {
            const base64Image = await image.getBase64('image/jpeg');
            fs.unlinkSync('tmp.png');
            return base64Image;
        } else {
            await image.write(path);
            fs.unlinkSync('tmp.png');
            return path;
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = makeFile;
