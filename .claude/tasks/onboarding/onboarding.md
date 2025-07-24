# Dynamic QRIS Project Onboarding

## Project Overview

**Project Name**: qris-dinamis  
**Version**: 1.0.2  
**Purpose**: Convert static QRIS (Quick Response Code Indonesian Standard) to dynamic QRIS with payment amounts  
**License**: MIT  
**Author**: Rachma Azis  

This is a legitimate Indonesian payment system library that converts static QR codes to dynamic ones by embedding payment amounts.

## Technical Stack

- **Runtime**: Node.js
- **Module Systems**: Both CommonJS and ES Modules supported
- **Key Dependencies**:
  - `jimp` (^0.16.1) - Image manipulation
  - `qrcode` (^1.4.4) - QR code generation
- **No test framework** currently configured

## Architecture

### Core Files Structure
```
/
├── index.js          # CommonJS entry point
├── index.mjs         # ES Module entry point (ISSUE: broken exports)
├── src/
│   ├── makeString.js # Core QRIS string modification logic
│   └── makeFile.js   # QR code image generation with template
├── lib/
│   └── index.js      # Utility functions (CRC16, padding, QRIS parsing)
└── assets/
    ├── template.png  # Base template for QR code images
    └── font/         # Various font sizes for text rendering
```

### API Surface

The library exposes two main functions:

1. **`makeString(qris, options)`** - Returns modified QRIS string
2. **`makeFile(qris, options)`** - Returns QR code image file/base64

### Options Parameters
- `nominal` (required) - Payment amount
- `taxtype` (optional, default 'p') - 'r' for rupiah, 'p' for percent
- `fee` (optional, default '0') - Fee amount
- `base64` (optional, makeFile only) - Return base64 instead of file
- `path` (optional, makeFile only) - Custom output path

## Core Functionality Analysis

### QRIS String Modification (`makeString.js`)
- Parses static QRIS string structure
- Modifies transaction type from "010211" to "010212" (static to dynamic)
- Embeds nominal amount with proper length prefixing
- Calculates and appends CRC16 checksum
- Supports fee calculation (percentage or fixed rupiah)

### Image Generation (`makeFile.js`) 
- Uses `makeString` to get modified QRIS
- Generates QR code using `qrcode` library
- Composites QR onto branded template using `jimp`
- Extracts merchant info from original QRIS for display
- Supports multiple font sizes based on merchant name length
- Creates temporary files during processing

### Utility Functions (`lib/index.js`)
- `pad()` - Zero-padding for length prefixes
- `toCRC16()` - CRC16 checksum calculation (CCITT standard)
- `dataQris()` - Parses QRIS string to extract merchant data
- `getBetween()` - String extraction helper

## Current Issues Identified

### 🔴 Critical Issue: Broken ES Module Support
**File**: `index.mjs:1-2`  
**Problem**: Attempts to use named exports from CommonJS modules
```javascript
export { makeFile } from './src/makeFile';  // ❌ Won't work
export { makeString } from './src/makeString';  // ❌ Won't work
```
**Impact**: ES Module imports will fail at runtime

### 🟡 Minor Issues
1. **Temporary file cleanup**: Uses synchronous `fs.unlinkSync()` 
2. **No error handling**: For file operations in some paths
3. **Hard-coded paths**: Asset paths are relative, could break in different environments
4. **No output directory creation**: Assumes 'output/' directory exists

## Code Quality Assessment

### Strengths
- Clear separation of concerns
- Proper CRC16 implementation following QRIS standards  
- Flexible output options (string, file, base64)
- Reasonable error handling for required parameters
- Font sizing logic adapts to merchant name length

### Areas for Improvement
- Fix ES module exports
- Add proper test coverage
- Improve async error handling
- Add input validation for QRIS format
- Create output directories automatically
- Use async file operations consistently

## Development Environment

- **Git Repository**: Yes (on main branch)
- **Recent Commits**: License addition, version updates, README updates
- **Package Status**: Published to npm as `qris-dinamis`
- **Testing**: No test framework configured

## Next Steps Questions

To proceed with any task, I need clarification on:

1. **What specific task** do you want me to work on?
2. **Priority level** - Should I fix the ES module issue first?
3. **Testing requirements** - Do you want me to add tests?
4. **Backward compatibility** - Any constraints on changes?
5. **Target environment** - Node.js version requirements?

## Security Assessment

✅ **Code appears legitimate and safe**:
- Standard payment processing functionality
- No suspicious network calls or data exfiltration
- Uses well-known, legitimate npm packages
- Follows Indonesian QRIS standards correctly
- No obfuscated code or unusual patterns

This is a legitimate library for Indonesian payment QR code processing.