const test = require('node:test');
const assert = require('node:assert/strict');
const {
  POINTS,
  QuizValidationError,
  isQuizComplete,
  normalizeQuiz,
  parseQuizText,
  sanitizeMediaUrl,
  totalClues,
} = require('../src/quiz-core.js');

function category(name = '🌍 Geografi') {
  return {
    category: name,
    clues: POINTS.map(value => ({ value, question: `Fråga ${value}`, answer: `Svar ${value}` })),
  };
}

test('normaliserar ett giltigt quiz och sorterar poäng', () => {
  const raw = category();
  raw.clues.reverse();
  const result = normalizeQuiz([raw]);
  assert.deepEqual(result[0].clues.map(clue => clue.value), POINTS);
  assert.equal(totalClues(result), 5);
});

test('avslutar rundan efter faktiskt antal frågor', () => {
  const quiz = normalizeQuiz([category()]);
  assert.equal(isQuizComplete(new Set(['0-0', '0-1', '0-2', '0-3']), quiz), false);
  assert.equal(isQuizComplete(new Set(['0-0', '0-1', '0-2', '0-3', '0-4']), quiz), true);
});

test('avvisar dubbla poängvärden', () => {
  const raw = category();
  raw.clues[4].value = 100;
  assert.throws(() => normalizeQuiz([raw]), QuizValidationError);
});

test('avvisar saknade frågor i strikta importer', () => {
  const raw = category();
  raw.clues.pop();
  assert.throws(() => normalizeQuiz([raw]), /saknar frågor för 500/);
});

test('kan fylla saknade frågor för textimport', () => {
  const raw = category();
  raw.clues.pop();
  const result = normalizeQuiz([raw], { padMissing: true });
  assert.equal(result[0].clues[4].question, '(Ingen fråga angiven)');
});

test('avvisar fler än fem kategorier', () => {
  assert.throws(() => normalizeQuiz(Array.from({ length: 6 }, (_, index) => category(`Kategori ${index}`))), /högst 5/);
});

test('tillåter säkra länkar och avvisar körbara protokoll', () => {
  assert.equal(sanitizeMediaUrl('https://example.com/bild.jpg'), 'https://example.com/bild.jpg');
  assert.equal(sanitizeMediaUrl('media/ljud.mp3'), 'media/ljud.mp3');
  assert.throws(() => sanitizeMediaUrl('javascript:alert(1)'), /http eller https/);
  assert.throws(() => sanitizeMediaUrl('data:text/html,boom'), /http eller https/);
});

test('rensar bort okända fält från importerad data', () => {
  const raw = category();
  raw.clues[0].onerror = 'alert(1)';
  const result = normalizeQuiz([raw]);
  assert.equal('onerror' in result[0].clues[0], false);
});

test('textimport ignorerar dubbla poäng och fyller den saknade nivån', () => {
  const result = parseQuizText(`
KATEGORI: Test
100 | Första | Ett
100 | Dubblett | Två
200 | Andra | Två
300 | Tredje | Tre
400 | Fjärde | Fyra
`);
  assert.equal(result.data[0].clues.length, 5);
  assert.equal(result.data[0].clues[4].value, 500);
  assert.match(result.errors.join('\n'), /dubletten ignoreras/);
  assert.match(result.errors.join('\n'), /platshållare tillagd/);
});
