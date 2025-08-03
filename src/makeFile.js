const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const { dataQris } = require('../lib');
const makeString = require('./makeString');

// Conditionally require fs only in Node.js environment
let fs;
try {
  if (typeof window === 'undefined') {
    fs = require('fs');
  }
} catch (e) {
  // fs not available in browser, which is expected
}

// Browser-specific QR generation (simpler, no template)
const generateBrowserQR = async (qris, { nominal, taxtype, fee }) => {
    const qrisModified = makeString(qris, { nominal, taxtype, fee });
    
    // Generate QR code as data URL for browsers
    const qrDataURL = await QRCode.toDataURL(qrisModified, { 
        margin: 2, 
        scale: 10,
        type: 'image/png',
        width: 512
    });
    
    return qrDataURL; // Return data URL directly for browsers
};

const makeFile = async (qris, { nominal, base64 = false, taxtype = 'p', fee = '0', path = '', templatePath = 'assets/template.png' } = {}) => {
    try {
        // Check if we're in a browser environment
        const isBrowser = typeof window !== 'undefined';
        
        if (isBrowser && !base64) {
            throw new Error('File writing is not supported in browser environment. Use base64: true option instead.');
        }
        
        if (isBrowser) {
            // For browser environments, provide a simpler QR-only version
            return await generateBrowserQR(qris, { nominal, taxtype, fee });
        }

        const qrisModified = makeString(qris, { nominal, taxtype, fee });

        let data = dataQris(qris);
        let text = data.merchantName;

        // Generate QR code based on environment
        let qr;
        if (isBrowser) {
            // Browser: use dataURL approach
            const qrDataURL = await QRCode.toDataURL(qrisModified, { 
                margin: 2, 
                scale: 10,
                type: 'image/png'
            });
            qr = await Jimp.read(qrDataURL);
        } else {
            // Node.js: use buffer approach
            const qrBuffer = await QRCode.toBuffer(qrisModified, { 
                margin: 2, 
                scale: 10,
                type: 'png'
            });
            qr = await Jimp.read(qrBuffer);
        }
        const image = await Jimp.read(templatePath);

        const w = image.bitmap.width;
        const h = image.bitmap.height;

        const jimp = require('jimp');
        
        // Load fonts with fallback for browser environments
        let fontTitle, fontMid, fontSmall;
        try {
            const titleFontPath = text.length > 18 ? 'assets/font/BebasNeueSedang/BebasNeue-Regular.ttf.fnt' : 'assets/font/BebasNeue/BebasNeue-Regular.ttf.fnt';
            const midFontPath = text.length > 28 ? 'assets/font/RobotoSedang/Roboto-Regular.ttf.fnt' : 'assets/font/RobotoBesar/Roboto-Regular.ttf.fnt';
            
            fontTitle = await jimp.loadFont(titleFontPath);
            fontMid = await jimp.loadFont(midFontPath);
            fontSmall = await jimp.loadFont('assets/font/RobotoKecil/Roboto-Regular.ttf.fnt');
        } catch (fontError) {
            // Fallback to default fonts if custom fonts can't be loaded
            console.warn('Custom fonts not available, using default fonts');
            try {
                fontTitle = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
                fontMid = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);
                fontSmall = await jimp.loadFont(jimp.FONT_SANS_12_BLACK);
            } catch (defaultFontError) {
                throw new Error('Unable to load fonts. Make sure jimp is properly installed and fonts are available.');
            }
        }
        
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
module.exports.default = makeFile;
