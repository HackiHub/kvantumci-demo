// Offline scan fixture: importing the AI SDK never sends a model request.
const assert = require('node:assert/strict');
const { Anthropic } = require('@anthropic-ai/sdk');
const nacl = require('tweetnacl');
const config = require('../config/ai-config.json');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

assert.equal(typeof Anthropic, 'function');
const prompt = readFileSync(resolve(__dirname, '..', config.promptFile), 'utf8');
const message = Buffer.from(prompt);

// Ed25519 signing uses an ephemeral key pair; no private key is stored.
const keyPair = nacl.sign.keyPair();
const signature = nacl.sign.detached(message, keyPair.secretKey);
assert.ok(nacl.sign.detached.verify(message, signature, keyPair.publicKey));
assert.ok(!nacl.sign.detached.verify(Buffer.from('changed prompt'), signature, keyPair.publicKey));

console.log('BOM fixtures checked: AI SDK import, prompt, and Ed25519 signing. No API calls.');
