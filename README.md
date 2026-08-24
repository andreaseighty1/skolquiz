# SkolQUIZ

SkolQUIZ är ett Jeopardy-inspirerat quiz för klassrummet. Appen är statisk och kan köras direkt via GitHub Pages.

## Struktur

- `index.html` innehåller gränssnittet och spellogiken.
- `src/quiz-core.js` innehåller testbar validering och normalisering av quizdata.
- `tests/quiz-core.test.js` testar importformat, URL-säkerhet och kategoriregler.
- `*.mp3` är lokal bakgrunds- och timermusik.

## Lokal körning

Öppna `index.html` direkt eller starta en enkel lokal webbserver i projektmappen.

## Tester

```sh
npm test
```

Inga externa npm-paket krävs.
