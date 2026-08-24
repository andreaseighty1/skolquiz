const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('indexens inbäddade spellogik har giltig JavaScript-syntax', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const start = html.lastIndexOf('<script>');
  const end = html.lastIndexOf('</script>');
  assert.ok(start >= 0 && end > start, 'Kunde inte hitta den inbäddade spellogiken');
  assert.doesNotThrow(() => new Function(html.slice(start + '<script>'.length, end)));
});
