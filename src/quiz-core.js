(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.SkolQuizCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const POINTS = Object.freeze([100, 200, 300, 400, 500]);
  const MAX_CATEGORIES = 5;
  const MAX_TEXT_LENGTH = 2000;

  class QuizValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'QuizValidationError';
    }
  }

  function requiredText(value, label) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new QuizValidationError(`${label} måste vara text.`);
    }
    const text = String(value).trim();
    if (!text) throw new QuizValidationError(`${label} får inte vara tom.`);
    if (text.length > MAX_TEXT_LENGTH) {
      throw new QuizValidationError(`${label} är för lång (max ${MAX_TEXT_LENGTH} tecken).`);
    }
    return text;
  }

  function sanitizeMediaUrl(value, label = 'Medialänk') {
    if (value == null || value === '') return '';
    if (typeof value !== 'string') throw new QuizValidationError(`${label} måste vara en URL.`);

    const text = value.trim();
    if (!text) return '';
    if (/^[\u0000-\u001f\u007f]/.test(text) || text.startsWith('//')) {
      throw new QuizValidationError(`${label} har ett ogiltigt format.`);
    }

    let parsed;
    try {
      parsed = new URL(text, 'https://skolquiz.local/');
    } catch (_) {
      throw new QuizValidationError(`${label} är inte en giltig URL.`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
      throw new QuizValidationError(`${label} måste använda http eller https utan inloggningsuppgifter.`);
    }
    return text;
  }

  function parseQuizText(raw) {
    if (typeof raw !== 'string') throw new QuizValidationError('Importfilen måste innehålla text.');
    const categories = [];
    const errors = [];
    let current = null;

    const finishCategory = () => {
      if (!current) return;
      if (current.clues.length < POINTS.length) {
        errors.push(`Kategori ”${current.category}”: Bara ${current.clues.length} frågor — 5 krävs`);
      }
      categories.push(current);
    };

    raw.split(/\r?\n/).forEach((sourceLine, index) => {
      const line = sourceLine.trim();
      if (!line || line.startsWith('#')) return;
      if (/^kategori\s*:/i.test(line)) {
        finishCategory();
        current = { category: line.replace(/^kategori\s*:/i, '').trim(), clues: [] };
        if (!current.category) errors.push(`Rad ${index + 1}: Kategorin saknar namn`);
        return;
      }
      if (!current || !line.includes('|')) return;

      const parts = line.split('|').map(part => part.trim());
      if (parts.length < 3) {
        errors.push(`Rad ${index + 1}: Fel format — behöver ”poäng | fråga | svar”`);
        return;
      }
      const value = Number.parseInt(parts[0], 10);
      if (!POINTS.includes(value)) {
        errors.push(`Rad ${index + 1}: Ogiltigt poängvärde ”${parts[0]}”`);
        return;
      }
      if (current.clues.some(clue => clue.value === value)) {
        errors.push(`Rad ${index + 1}: Kategori ”${current.category}” har redan en ${value}p-fråga — dubletten ignoreras`);
        return;
      }
      const question = parts[1];
      const answer = parts.slice(2).join('|').trim();
      if (!question || !answer) {
        errors.push(`Rad ${index + 1}: Fråga och svar får inte vara tomma`);
        return;
      }
      current.clues.push({ value, question, answer });
    });
    finishCategory();

    if (categories.length > MAX_CATEGORIES) {
      errors.push(`Filen innehåller ${categories.length} kategorier — bara de första ${MAX_CATEGORIES} används`);
    }
    if (categories.length === 0) return { data: [], errors };

    const selected = categories.slice(0, MAX_CATEGORIES);
    selected.forEach(category => {
      const existing = new Set(category.clues.map(clue => clue.value));
      POINTS.forEach(value => {
        if (!existing.has(value)) {
          errors.push(`Kategori ”${category.category}”: Saknar ${value}p-fråga — platshållare tillagd`);
        }
      });
    });
    return { data: normalizeQuiz(selected, { padMissing: true }), errors };
  }

  function normalizeQuiz(input, options = {}) {
    const { padMissing = false } = options;
    if (!Array.isArray(input) || input.length === 0) {
      throw new QuizValidationError('Quizet måste innehålla minst en kategori.');
    }
    if (input.length > MAX_CATEGORIES) {
      throw new QuizValidationError(`Quizet får innehålla högst ${MAX_CATEGORIES} kategorier.`);
    }

    return input.map((rawCategory, categoryIndex) => {
      if (!rawCategory || typeof rawCategory !== 'object' || Array.isArray(rawCategory)) {
        throw new QuizValidationError(`Kategori ${categoryIndex + 1} har fel format.`);
      }
      const category = requiredText(rawCategory.category, `Kategori ${categoryIndex + 1}`);
      if (!Array.isArray(rawCategory.clues)) {
        throw new QuizValidationError(`Kategorin ”${category}” saknar frågor.`);
      }

      const byValue = new Map();
      rawCategory.clues.forEach((rawClue, clueIndex) => {
        if (!rawClue || typeof rawClue !== 'object' || Array.isArray(rawClue)) {
          throw new QuizValidationError(`Fråga ${clueIndex + 1} i ”${category}” har fel format.`);
        }
        const value = Number(rawClue.value);
        if (!POINTS.includes(value)) {
          throw new QuizValidationError(`”${category}” har ett ogiltigt poängvärde: ${rawClue.value}.`);
        }
        if (byValue.has(value)) {
          throw new QuizValidationError(`”${category}” har fler än en ${value}-poängsfråga.`);
        }
        byValue.set(value, {
          value,
          question: requiredText(rawClue.question, `${value}-poängsfrågan i ”${category}”`),
          answer: requiredText(rawClue.answer, `Svaret på ${value}-poängsfrågan i ”${category}”`),
          image: sanitizeMediaUrl(rawClue.image, `Bildlänken i ”${category}”`),
          audio: sanitizeMediaUrl(rawClue.audio, `Ljudlänken i ”${category}”`),
        });
      });

      if (padMissing) {
        POINTS.forEach(value => {
          if (!byValue.has(value)) {
            byValue.set(value, { value, question: '(Ingen fråga angiven)', answer: '—', image: '', audio: '' });
          }
        });
      }
      const missing = POINTS.filter(value => !byValue.has(value));
      if (missing.length) {
        throw new QuizValidationError(`”${category}” saknar frågor för ${missing.join(', ')} poäng.`);
      }

      return { category, clues: POINTS.map(value => byValue.get(value)) };
    });
  }

  function totalClues(quiz) {
    return Array.isArray(quiz)
      ? quiz.reduce((sum, category) => sum + (Array.isArray(category.clues) ? category.clues.length : 0), 0)
      : 0;
  }

  function isQuizComplete(used, quiz) {
    const usedCount = used instanceof Set ? used.size : Number(used);
    const target = totalClues(quiz);
    return Number.isFinite(usedCount) && target > 0 && usedCount >= target;
  }

  function cloneQuiz(quiz) {
    return JSON.parse(JSON.stringify(quiz));
  }

  return Object.freeze({
    MAX_CATEGORIES,
    POINTS,
    QuizValidationError,
    cloneQuiz,
    isQuizComplete,
    normalizeQuiz,
    parseQuizText,
    sanitizeMediaUrl,
    totalClues,
  });
});
