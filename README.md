
# QRIS Dinamis

Convert static QRIS (Quick Response Code Indonesian Standard) to dynamic QRIS with payment amounts.

[![npm version](https://img.shields.io/npm/v/@agungjsp/qris-dinamis.svg)](https://www.npmjs.com/package/@agungjsp/qris-dinamis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-0%20vulnerabilities-brightgreen.svg)](#security)

## Features

- ✅ Convert static QRIS to dynamic QRIS with embedded amounts
- ✅ Generate QR code images with customizable templates
- ✅ Support for both CommonJS and ES Modules
- ✅ Base64 output option for web applications
- ✅ Fee calculation (percentage or fixed amount)
- ✅ Custom output paths
- ✅ Zero security vulnerabilities
- ✅ Built-in CRC16 validation

## Installation

```bash
npm i @agungjsp/qris-dinamis
```

> **Note:** This is an improved fork of the original `qris-dinamis` package with security fixes and ES Module support.

## Import Module

```javascript
// CommonJS
const qrisDinamis = require('@agungjsp/qris-dinamis');

// ES Modules (both syntaxes supported)
import qrisDinamis from '@agungjsp/qris-dinamis';
import { makeString, makeFile } from '@agungjsp/qris-dinamis';
```

## Usage

### Generate Dynamic QRIS String

```javascript
const qris = '00020101021126570011ID1234567890123456789012340303UMI51440014ID.CO.QRIS.WWW0215ID20232108123456780303UMI520454995802ID5914MERCHANT NAME6007Jakarta61051234662070703A016304ABCD';
const result = qrisDinamis.makeString(qris, { nominal: '5000' });
console.log(result); // Returns modified QRIS string with embedded amount
```

### Generate QR Code Image

```javascript
const qris = '00020101021126570011ID1234567890123456789012340303UMI51440014ID.CO.QRIS.WWW0215ID20232108123456780303UMI520454995802ID5914MERCHANT NAME6007Jakarta61051234662070703A016304ABCD';

// Basic usage - saves to output/ directory
const result = await qrisDinamis.makeFile(qris, { nominal: '5000' });

// Base64 output for web applications  
const base64 = await qrisDinamis.makeFile(qris, { 
  nominal: '5000', 
  base64: true 
});

// Custom output path
const result = await qrisDinamis.makeFile(qris, { 
  nominal: '5000', 
  path: 'custom/path/qris.jpg' 
});

// With fee calculation
const result = await qrisDinamis.makeFile(qris, { 
  nominal: '5000',
  fee: '500',
  taxtype: 'r' // 'r' for rupiah, 'p' for percent
});
```

## API Reference

### `makeString(qris, options)`

Converts static QRIS string to dynamic QRIS string.

**Parameters:**

| Param     | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| `qris`    | string | ✅       | -       | Static QRIS string |
| `nominal` | string | ✅       | -       | Payment amount |
| `taxtype` | string | ❌       | `'p'`   | Tax type: `'r'` (rupiah) or `'p'` (percent) |
| `fee`     | string | ❌       | `'0'`   | Fee amount |

**Returns:** `string` - Dynamic QRIS string

### `makeFile(qris, options)`

Generates QR code image from dynamic QRIS.

**Parameters:**

| Param     | Type    | Required | Default | Description |
|-----------|---------|----------|---------|-------------|
| `qris`    | string  | ✅       | -       | Static QRIS string |
| `nominal` | string  | ✅       | -       | Payment amount |
| `base64`  | boolean | ❌       | `false` | Return base64 string instead of file |
| `path`    | string  | ❌       | auto    | Custom output path |
| `taxtype` | string  | ❌       | `'p'`   | Tax type: `'r'` (rupiah) or `'p'` (percent) |
| `fee`     | string  | ❌       | `'0'`   | Fee amount |

**Returns:** `Promise<string>` - File path or base64 string

## Error Handling

```javascript
try {
  const result = qrisDinamis.makeString(qris, { nominal: '5000' });
} catch (error) {
  if (error.message.includes('required')) {
    console.log('Missing required parameter');
  }
}

try {
  const result = await qrisDinamis.makeFile(qris, { nominal: '5000' });
} catch (error) {
  console.log('File generation failed:', error.message);
}
```

## Requirements

- Node.js >= 12.0.0
- The `output/` directory will be created automatically if it doesn't exist

## What's New

🚀 **Latest improvements** include security fixes, ES Module support, and enhanced error handling. 

👉 **See full changelog**: [GitHub Releases](https://github.com/agungjsp/Dynamic-QRIS/releases)

## Security

This package has **zero security vulnerabilities** and uses the latest secure versions of all dependencies.

## License

MIT © [Rachma Azis](https://razisek.com)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/agungjsp/Dynamic-QRIS/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/agungjsp/Dynamic-QRIS/discussions)
- 📧 **Original author**: [razisek.com](https://razisek.com)
- 🔧 **Fork maintainer**: [@agungjsp](https://github.com/agungjsp)