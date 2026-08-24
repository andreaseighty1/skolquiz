const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('indexen laddar separata lokala CSS- och JavaScript-filer', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<\/head>\s*<body>/i);
  assert.match(html, /<link rel="stylesheet" href="src\/styles\.css">/);
  assert.match(html, /<script src="src\/quiz-core\.js"><\/script>/);
  assert.match(html, /<script src="src\/app\.js"><\/script>/);
  assert.ok(fs.existsSync(path.join(root, 'src', 'styles.css')));
  assert.ok(fs.existsSync(path.join(root, 'src', 'quiz-core.js')));
  assert.ok(fs.existsSync(path.join(root, 'src', 'app.js')));
});

test('indexen innehåller inte längre inbäddad CSS, JavaScript eller händelsekod', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.doesNotMatch(html, /<style(?:\s|>)/i);
  assert.doesNotMatch(html, /<script>/i);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
});

test('dynamiska vyer förgenereras inte dubbelt i indexen', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.match(html, /<div class="teams-row" id="teamsRow"><\/div>/);
  assert.match(html, /<div id="editorAccordion"><\/div>/);
  assert.doesNotMatch(html, /<div class="emoji-popup" id="emojiPopup">/);
});
