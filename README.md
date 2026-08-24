# SkolQUIZ

SkolQUIZ är ett Jeopardy-inspirerat quiz för klassrummet. Appen är statisk och kan köras direkt via GitHub Pages.

## Struktur

- `index.html` innehåller sidans semantiska struktur.
- `src/styles.css` innehåller all layout och visuell design.
- `src/app.js` innehåller gränssnitts- och spellogiken.
- `src/quiz-core.js` innehåller testbar validering och normalisering av quizdata.
- `tests/` testar importformat, URL-säkerhet, kategoriregler och att filuppdelningen består.
- `*.mp3` är lokal bakgrunds- och timermusik.

## Lokal körning

Starta en enkel lokal webbserver i projektmappen, exempelvis:

```sh
npx serve .
```

Appen använder separata lokala resurser och bör därför köras via HTTP i stället för att öppnas som en ensam fil.

## Tester

```sh
npm test
```

För syntaxkontroll och alla tester:

```sh
npm run check
```

Inga externa npm-paket krävs.
