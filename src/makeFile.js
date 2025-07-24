const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const { dataQris } = require('../lib');
const makeString = require('./makeString');
const fs = require('fs');

const makeFile = async (qris, { nominal, base64 = false, taxtype = 'p', fee = '0', path = '', templatePath = 'assets/template.png' } = {}) => {
    try {
        // Check if we're in a browser environment
        const isBrowser = typeof window !== 'undefined';
        
        if (isBrowser && !base64) {
            throw new Error('File writing is not supported in browser environment. Use base64: true option instead.');
        }

        const qrisModified = makeString(qris, { nominal, taxtype, fee });

        // Generate QR code as buffer instead of file for browser compatibility
        const qrBuffer = await QRCode.toBuffer(qrisModified, { 
            margin: 2, 
            scale: 10,
            type: 'png'
        });

        let data = dataQris(qris);
        let text = data.merchantName;

        const qr = await Jimp.read(qrBuffer);
        const image = await Jimp.read(templatePath);

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
            return base64Image;
        } else {
            await image.write(path);
            return path;
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = makeFile;
