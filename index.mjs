import * as makeFileModule from './src/makeFile.js';
import * as makeStringModule from './src/makeString.js';

const makeFile = makeFileModule.default || makeFileModule;
const makeString = makeStringModule.default || makeStringModule;

export { makeFile, makeString };
export default { makeFile, makeString };