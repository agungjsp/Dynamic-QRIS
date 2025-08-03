# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2025-08-03

### Fixed
- **Vite Browser Compatibility**: Resolved "Module 'fs' has been externalized for browser compatibility" error
- **ESM/CommonJS Interop**: Fixed module export/import compatibility between CommonJS and ES modules
- **Node.js Module Aliasing**: Properly configured Vite to handle Node.js built-in modules (fs, path, crypto, stream, util) in browser environments

### Added
- **Vite Configuration**: Added comprehensive `vite.config.js` for optimal browser and Node.js compatibility
- **Development Environment**: Added Vite dev server support with proper module resolution
- **Browser Test Page**: Created `index.html` for testing browser functionality
- **Build Process**: Enhanced build pipeline with proper CommonJS to ESM transformation

### Changed
- **Conditional Module Loading**: Made `fs` module loading conditional based on environment (browser vs Node.js)
- **Enhanced Export System**: Added dual export support for both CommonJS and ESM compatibility
- **Development Dependencies**: Added Vite, buffer polyfill, and Rollup CommonJS plugin as dev dependencies

### Technical Improvements
- Implemented proper browser/Node.js environment detection
- Enhanced module resolution for mixed module systems
- Improved error handling for browser-specific limitations
- Optimized build output for modern web applications

## [1.0.6] - 2024-12-19

### Fixed
- **Base64 Data URL Issue**: Fixed duplicate data URL prefix in base64 output that was causing image loading errors
- Improved documentation for base64 return format to prevent misuse
- Added clear comments about data URL format in base64 mode

### Changed
- Enhanced error messages and documentation for base64 usage
- Better code comments explaining the returned data URL format

## [1.0.5] - 2024-12-18

### Added
- Enhanced browser compatibility
- Security updates and dependency improvements
- Better error handling

## Previous Versions

### [1.0.4] and earlier
- Core QRIS functionality
- Template-based QR code generation
- Base64 and file output options
- Fee calculation support
- Browser and Node.js compatibility 