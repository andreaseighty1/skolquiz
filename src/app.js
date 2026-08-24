/* ================================================================
   DATA & CONSTANTS
================================================================ */
const STORAGE_KEY = 'slattenskolan_v9_quiz';
const PREFS_KEY   = 'slattenskolan_v9_prefs';
const DEFAULT_QUIZ=[{"category":"🌊 Hav & vatten","clues":[{"value":100,"question":"Vad kallas vatten som finns i havet?","answer":"Saltvatten"},{"value":200,"question":"Vad heter jordens största hav?","answer":"Stilla havet"},{"value":300,"question":"Vad kallas fruset havsvatten?","answer":"Is / packis"},{"value":400,"question":"Vad heter det fenomen då havet stiger och sjunker under dygnet?","answer":"Tidvatten (ebb och flod)"},{"value":500,"question":"Vad kallas vatten som rinner under marken och kan hämtas ur en brunn?","answer":"Grundvatten"}]},{"category":"🐾 Djur & natur","clues":[{"value":100,"question":"Vad heter djuret som säger 'mu'?","answer":"Ko"},{"value":200,"question":"Vad kallas djur som bara äter växter?","answer":"Växtätare / herbivorer"},{"value":300,"question":"Vad heter Sveriges största kattdjur i vilt tillstånd?","answer":"Lodjur"},{"value":400,"question":"Vilket träd producerar ekollon?","answer":"Ek"},{"value":500,"question":"Vad kallas det när fåglar flyger till varmare länder inför vintern?","answer":"Fågelflyttning"}]},{"category":"🇸🇪 Sverige","clues":[{"value":100,"question":"Vad heter Sveriges huvudstad?","answer":"Stockholm"},{"value":200,"question":"Vad heter Sveriges näst största stad?","answer":"Göteborg"},{"value":300,"question":"Vad heter Sveriges största sjö till ytan?","answer":"Vänern"},{"value":400,"question":"Vad heter det urfolk som lever i norra Sverige och Sápmi?","answer":"Samerna"},{"value":500,"question":"Vilket år fick kvinnor rätt att rösta i svenska val för första gången?","answer":"1921"}]},{"category":"🎮 Film, spel & musik","clues":[{"value":100,"question":"Vad heter den gula figuren som äter prickar i en labyrint?","answer":"Pac-Man"},{"value":200,"question":"Vad heter den italienska rörmokaren i Nintendos spel?","answer":"Mario"},{"value":300,"question":"Vad heter prinsessan i Frost som har iskrafter?","answer":"Elsa"},{"value":400,"question":"Vad kallas ett instrument med svarta och vita tangenter som man spelar med händerna?","answer":"Piano"},{"value":500,"question":"Vilket land vann Eurovision Song Contest flest gånger totalt?","answer":"Irland (7 gånger)"}]},{"category":"🧠 Kluringar","clues":[{"value":100,"question":"Vad är det som går och går men aldrig kommer fram?","answer":"Klockan"},{"value":200,"question":"Hur många månader på ett år har 28 dagar?","answer":"Alla 12 månader"},{"value":300,"question":"Vad har många nycklar men kan ändå inte låsa upp en dörr?","answer":"Ett piano"},{"value":400,"question":"Vad går alltid upp men aldrig ner?","answer":"Din ålder"},{"value":500,"question":"Ju mer du tar bort, desto större blir det. Vad är det?","answer":"Ett hål"}]}]
const defaultEurovisionClue = DEFAULT_QUIZ[3]?.clues?.[4];
if (defaultEurovisionClue?.question === 'Vilket land vann Eurovision Song Contest flest gånger totalt?' && defaultEurovisionClue.answer === 'Irland (7 gånger)') {
  defaultEurovisionClue.answer = 'Irland och Sverige (7 vinster vardera)';
}

const THEMES = {
  ocean:    {bg1:"#060e1a",bg2:"#0b1828",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#eef6ff",muted:"#94afc8",accent:"#5eaeff",accent2:"#a78bfa"},
  forest:   {bg1:"#070f0a",bg2:"#0e2018",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#eefcf2",muted:"#9ec8ae",accent:"#4ade80",accent2:"#2dd4bf"},
  sunset:   {bg1:"#160c14",bg2:"#2e1422",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#fff1f2",muted:"#e8b4bc",accent:"#f87171",accent2:"#fbbf24"},
  purple:   {bg1:"#0e0a1c",bg2:"#1a0e33",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#f5f3ff",muted:"#b8aae8",accent:"#a78bfa",accent2:"#22d3ee"},
  midnight: {bg1:"#020408",bg2:"#060d18",panel:"rgba(255,255,255,.04)",panel2:"rgba(255,255,255,.07)",line:"rgba(255,255,255,.09)",text:"#e2eeff",muted:"#6a85a8",accent:"#3b82f6",accent2:"#818cf8"},
  rose:     {bg1:"#120810",bg2:"#22091a",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#fff0f6",muted:"#d49db0",accent:"#f472b6",accent2:"#fb923c"},
  arctic:   {bg1:"#060f18",bg2:"#0a1f2e",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.12)",text:"#e0f4ff",muted:"#80b4cc",accent:"#67e8f9",accent2:"#a5f3fc"},
  autumn:   {bg1:"#130c04",bg2:"#271808",panel:"rgba(255,255,255,.055)",panel2:"rgba(255,255,255,.09)",line:"rgba(255,255,255,.11)",text:"#fff8ee",muted:"#c8a87a",accent:"#fb923c",accent2:"#fbbf24"},
  neon:     {bg1:"#020c06",bg2:"#041a0c",panel:"rgba(255,255,255,.04)",panel2:"rgba(255,255,255,.08)",line:"rgba(0,255,100,.12)",text:"#efffee",muted:"#6db87e",accent:"#22c55e",accent2:"#84cc16"},
  light:    {bg1:"#edf4ff",bg2:"#dce8ff",panel:"rgba(255,255,255,.85)",panel2:"rgba(255,255,255,.97)",line:"rgba(10,20,50,.12)",text:"#0f172a",muted:"#4b6080",accent:"#2563eb",accent2:"#7c3aed"},
};

const OTDB_CATS = [
  {id:9,  sv:"Allmänbildning"},{id:10, sv:"Böcker"},{id:11, sv:"Film"},
  {id:12, sv:"Musik"},{id:14, sv:"TV"},{id:15, sv:"Datorspel"},
  {id:17, sv:"Vetenskap & natur"},{id:18, sv:"Datorer & teknik"},
  {id:19, sv:"Matematik"},{id:20, sv:"Mytologi"},
  {id:21, sv:"Sport"},{id:22, sv:"Geografi"},
  {id:23, sv:"Historia"},{id:25, sv:"Konst"},
  {id:27, sv:"Djur"},{id:28, sv:"Fordon"},
];

const TEAM_COLORS = ['#5eaeff','#a78bfa','#4ade80','#f87171','#fbbf24','#22d3ee','#fb923c','#86efac','#f0abfc','#67e8f9'];
const {
  POINTS: QUIZ_POINTS,
  cloneQuiz,
  isQuizComplete,
  normalizeQuiz,
  parseQuizText,
  sanitizeMediaUrl,
  totalClues,
} = SkolQuizCore;

/* ================================================================
   STATE
================================================================ */
let quizData = loadQuizData();
let pendingData = null;

const S = {
  teamCount: 3,
  teams: Array.from({length:10}, (_,i) => ({name:`Lag ${i+1}`, score:0})),
  used: new Set(),
  currentClue: null,
  revealed: false,
  answeredTeams: new Set(),
  correctTeams:  new Set(),
  buzzerTeam: null,
  captainIdx: 0,
  mode: 'all',        // 'all' | 'buzzer' | 'captain'
  timerMs: 25000,
  timer: {h:null, endAt:0, running:false},
  hideScores: false,
  scoresRevealed: false,
  musicOn: false,
  audioUnlocked: false,
  theme: 'ocean',
  dirty: false,
};

/* ================================================================
   DATA
================================================================ */
function loadQuizData() {
  try {
    const stored   = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = normalizeQuiz(JSON.parse(stored));
      // Migrate the old, now ambiguous Eurovision answer without touching custom questions.
      parsed.forEach(category => category.clues.forEach(clue => {
        if (clue.question === 'Vilket land vann Eurovision Song Contest flest gånger totalt?' && clue.answer === 'Irland (7 gånger)') {
          clue.answer = 'Irland och Sverige (7 vinster vardera)';
        }
      }));
      return parsed;
    }
  } catch(e) { console.warn('Kunde inte läsa sparat quiz:', e.message); }
  return normalizeQuiz(cloneQuiz(DEFAULT_QUIZ));
}
function persistQuiz(data) {
  const normalized = normalizeQuiz(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY)||'{}');
    if(p.teamCount) S.teamCount = Math.max(1,Math.min(10,+p.teamCount));
    if(p.teams) p.teams.forEach((t,i)=>{ if(S.teams[i]&&t.name) S.teams[i].name=t.name; });
    if(p.musicOn != null) S.musicOn = p.musicOn;
    if(p.vol != null) $('vol').value = p.vol;
    if(p.hideScores != null) S.hideScores = p.hideScores;
    if(p.theme) S.theme = p.theme;
    if(p.mode === 'all' || p.mode === 'buzzer') S.mode = p.mode;
    else if (p.mode === 'captain') S.mode = 'all';
    if(p.timerMs) S.timerMs = p.timerMs;
  } catch(e){}
}
function savePrefs() {
  localStorage.setItem(PREFS_KEY, JSON.stringify({
    teamCount:S.teamCount, teams:S.teams.map(t=>({name:t.name})),
    musicOn:S.musicOn, vol:$('vol').value,
    hideScores:S.hideScores, theme:S.theme,
    mode:S.mode, timerMs:S.timerMs
  }));
}

/* ================================================================
   UTILITIES
================================================================ */
const $ = id => document.getElementById(id);

function applyTheme() {
  const t = THEMES[S.theme]||THEMES.ocean;
  const s = document.documentElement.style;
  s.setProperty('--bg1',t.bg1); s.setProperty('--bg2',t.bg2);
  s.setProperty('--panel',t.panel); s.setProperty('--panel2',t.panel2);
  s.setProperty('--line',t.line); s.setProperty('--text',t.text);
  s.setProperty('--muted',t.muted); s.setProperty('--accent',t.accent);
  s.setProperty('--accent2',t.accent2);
}

function setTimer(s) {
  $('timerRange').value = s;
  updateTimerUI();
}
function updateTimerUI() {
  const v = +$('timerRange').value;
  S.timerMs = v * 1000;
  $('timerVal').textContent = v;
  $('timerLbl').textContent = `⏱ ${v} sek`;
  savePrefs();
}

function decodeHtml(s) {
  const t = document.createElement('textarea');
  t.innerHTML = s;
  return t.value;
}

/* ================================================================
   VIEWS / TABS
================================================================ */
function switchView(name) {
  document.querySelectorAll('.tab').forEach(t => {
    const active = t.dataset.v === name;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`));
}

/* ================================================================
   TEAMS
================================================================ */
function renderTeams() {
  const row = $('teamsRow');
  row.innerHTML = '';
  const hide = S.hideScores && !S.scoresRevealed;
  for (let i = 0; i < S.teamCount; i++) {
    const t = S.teams[i];
    const isCap = S.mode === 'captain' && i === S.captainIdx;
    const card = document.createElement('div');
    card.className = 'team-card' + (isCap ? ' cap-turn' : '');
    card.style.setProperty('--team-color', TEAM_COLORS[i]);
    card.innerHTML = `
      <div class="team-name">${esc(t.name)}${isCap?' 👑':''}</div>
      <div class="team-lbl">${hide ? '● DOLDA' : '● POÄNG'}</div>
      <div class="team-score" id="score-${i}" style="color:${TEAM_COLORS[i]};text-shadow:0 0 20px ${TEAM_COLORS[i]}">${hide ? '?' : t.score}</div>
    `;
    row.appendChild(card);
  }
}

function renderTeamInputs() {
  const g = $('teamNameGrid');
  g.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <label class="lbl" style="color:${TEAM_COLORS[i]}">Lag ${i+1}</label>
      <input class="inp" data-ti="${i}" value="${esc(S.teams[i].name)}" style="opacity:${i<S.teamCount?1:.35}">
    `;
    g.appendChild(wrap);
  }
  g.querySelectorAll('[data-ti]').forEach(inp => {
    inp.addEventListener('input', () => {
      const i = +inp.dataset.ti;
      S.teams[i].name = inp.value.trim() || `Lag ${i+1}`;
      renderTeams(); savePrefs();
    });
  });
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Returns the first emoji character(s) from a string, or a fallback
function getLeadingEmoji(str) {
  const m = String(str).match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+/u);
  return m ? m[0] : '📂';
}
// Returns the string with leading emoji(s) and whitespace stripped
function stripLeadingEmoji(str) {
  return String(str).replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+\s*/u, '');
}

/* ================================================================
   BOARD
================================================================ */
function renderBoard() {
  const board = $('board');
  board.innerHTML = '';
  const columnCount = quizData.length;
  board.style.gridTemplateColumns = `repeat(${columnCount}, minmax(140px, 1fr))`;
  board.style.minWidth = `${Math.max(140, columnCount * 148)}px`;
  quizData.forEach(cat => {
    const d = document.createElement('div');
    d.className = 'cat-hdr';
    d.setAttribute('role', 'columnheader');
    d.textContent = cat.category;
    board.appendChild(d);
  });
  for (let r = 0; r < QUIZ_POINTS.length; r++) {
    for (let c = 0; c < quizData.length; c++) {
      const clue = quizData[c].clues[r];
      const key = `${c}-${r}`;
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'cell' + (S.used.has(key) ? ' used' : '');
      d.disabled = S.used.has(key);
      d.setAttribute('aria-label', `${quizData[c].category}, ${clue.value} poäng${S.used.has(key) ? ', redan spelad' : ''}`);
      const badges = [];
      if (clue.image) badges.push('📷');
      if (clue.audio) badges.push('🔊');
      const badgeHtml = badges.length ? `<div class="cell-badge">${badges.map(b=>`<span>${b}</span>`).join('')}</div>` : '';
      d.innerHTML = S.used.has(key)
        ? `<span style="font-size:22px;opacity:.4;font-family:system-ui">✓</span>`
        : `<span>${clue.value}</span>${badgeHtml}`;
      if (!S.used.has(key)) d.addEventListener('click', () => openClue(c, r));
      d.style.animationDelay = `${(r * quizData.length + c) * 0.03}s`;
      if (!S.used.has(key)) d.style.animation = `cellPop .35s ease both`;
      board.appendChild(d);
    }
  }
  const modeNames = {all:'👥 Alla svarar', buzzer:'🔔 Buzzerläge', captain:'👑 Lagkapten'};
  $('modeLbl').textContent = 'Spelläge: ' + modeNames[S.mode];
  $('timerLbl').textContent = `⏱ ${S.timerMs/1000} sek`;
}

/* ================================================================
   OPEN CLUE / DIALOG
================================================================ */
function openClue(col, row) {
  const clue = quizData[col].clues[row];
  S.currentClue = {col, row, ...clue};
  S.revealed = false;
  S.answerShown = false;
  S.answeredTeams = new Set();
  S.correctTeams  = new Set();
  S.buzzerTeam = null;
  $('dlgQ').classList.remove('grading-mode');

  $('dlgCat').textContent = quizData[col].category;
  $('dlgPts').textContent = clue.value + ' p';
  $('dlgQuestion').textContent = clue.question;
  $('dlgAnswer').textContent = '✅ ' + clue.answer;
  $('dlgAnswer').classList.remove('show');
  $('dlgAnswer').style.display = '';
  $('markingArea').innerHTML = '';
  $('dlgStatus').style.display = 'none';

  // Visa bild om frågan har en
  if (clue.image) {
    $('dlgImg').src = clue.image;
    $('dlgImgWrap').style.display = 'block';
  } else {
    $('dlgImgWrap').style.display = 'none';
    $('dlgImg').src = '';
  }

  // Visa ljud om frågan har ett
  stopClueAudio();
  if (clue.audio) {
    $('dlgAudioWrap').style.display = 'block';
    const parsed = parseAudioUrl(clue.audio);
    if (parsed && parsed.type === 'spotify') {
      $('dlgSpotifyFrame').src = `https://open.spotify.com/embed/${parsed.kind}/${parsed.id}?utm_source=generator&theme=0`;
      $('dlgSpotifyWrap').style.display = 'block';
      $('dlgAudioPlayerWrap').style.display = 'none';
    } else {
      $('dlgAudioPlayer').src = clue.audio;
      $('dlgAudioPlayerWrap').style.display = 'block';
      $('dlgSpotifyWrap').style.display = 'none';
    }
    const isSpotify = parseAudioUrl(clue.audio)?.type === 'spotify';
    const startBtn = $('btnStartAudioTimer');
    startBtn.style.display = 'block';
    startBtn.textContent = isSpotify ? '⏱ Spelaren igång? Starta timer' : '▶ Spela & starta timer';
    startBtn._isSpotify = isSpotify;
  } else {
    $('dlgAudioWrap').style.display = 'none';
    $('dlgAudioPlayerWrap').style.display = 'none';
    $('dlgSpotifyWrap').style.display = 'none';
    $('btnStartAudioTimer').style.display = 'none';
  }

  const isBuzz = S.mode === 'buzzer';
  const isCap  = S.mode === 'captain';
  $('btnShowAnswer').textContent = isBuzz ? '✅ Bedöm svar' : '👁 Visa svar';

  $('buzzerArea').style.display  = isBuzz ? 'block' : 'none';
  $('captainArea').style.display = isCap  ? 'block' : 'none';

  if (isBuzz) renderBuzzGrid();
  if (isCap) $('captainName').textContent = S.teams[S.captainIdx].name;

  $('dlgQ').showModal();
  if (!clue.audio) startTimer();
  syncMusic();
}

/* BUZZER */
function renderBuzzGrid() {
  const grid = $('buzzerGrid');
  grid.innerHTML = '';
  for (let i = 0; i < S.teamCount; i++) {
    const btn = document.createElement('button');
    const alreadyAnswered = S.answeredTeams.has(i);
    btn.className = 'buzz-btn' + (S.buzzerTeam === i ? ' buzzed' : '');
    btn.textContent = (S.buzzerTeam === i ? '🔔 ' : alreadyAnswered ? '✓ ' : '') + S.teams[i].name;
    btn.style.borderColor = S.buzzerTeam === i ? TEAM_COLORS[i] : 'rgba(255,255,255,.15)';
    btn.style.setProperty('--team-color', TEAM_COLORS[i]);
    if (S.buzzerTeam === i) btn.style.boxShadow = `0 0 20px ${TEAM_COLORS[i]}55`;
    else btn.style.boxShadow = '';
    btn.disabled = alreadyAnswered || (S.buzzerTeam !== null && S.buzzerTeam !== i);
    btn.addEventListener('click', () => {
      S.buzzerTeam = i;
      renderBuzzGrid();
      showStatus(`${S.teams[i].name} svarar! Klicka "Bedöm svar" när du är redo.`);
    });
    grid.appendChild(btn);
  }
}

/* REVEAL */
function revealAnswer() {
  if (!S.currentClue) return;
  if (S.mode === 'buzzer' && S.buzzerTeam === null) {
    showStatus('⚠️ Välj vilket lag som buzzade in innan du bedömer svaret.');
    return;
  }
  if (S.mode === 'buzzer') {
    if (!S.revealed) {
      S.revealed = true;
      stopTimer();
      stopClueAudio();
      $('dlgQ').classList.add('grading-mode');
      $('buzzerArea').style.display = 'none';
      $('btnShowAnswer').textContent = '👁 Visa facit';
      showStatus('Markera om laget svarade rätt. Facit är fortfarande dolt för klassen.');
      renderMarking();
      syncMusic();
      return;
    }
    if (!S.answerShown) {
      S.answerShown = true;
      $('dlgAnswer').classList.add('show');
      $('btnShowAnswer').textContent = '👁 Facit visas';
      showStatus('Facit visas. Stäng frågan när ni är klara.');
      renderMarking();
      return;
    }
    return;
  }
  S.revealed = true;
  stopTimer();
  stopClueAudio();
  $('dlgQ').classList.add('grading-mode');
  $('dlgAnswer').classList.add('show');
  showStatus('Markera vilka lag som hade rätt:');
  renderMarking();
  syncMusic();
}

/* MARKING */
function renderMarking() {
  const area = $('markingArea');
  area.innerHTML = '';
  if (!S.revealed || !S.currentClue) return;

  const hide = S.hideScores && !S.scoresRevealed;
  let eligible = [];
  if (S.mode === 'buzzer')  eligible = S.buzzerTeam !== null ? [S.buzzerTeam] : [];
  else if (S.mode === 'captain') eligible = [S.captainIdx];
  else eligible = Array.from({length: S.teamCount}, (_,i) => i);

  eligible.forEach(i => {
    const t    = S.teams[i];
    const done = S.answeredTeams.has(i);
    const wasCorrect = S.correctTeams && S.correctTeams.has(i);
    const card = document.createElement('div');
    card.className = 'mark-card' + (done ? ' marked' : '');
    card.style.setProperty('--team-color', TEAM_COLORS[i]);
    card.style.borderTopColor = TEAM_COLORS[i];
    card.style.borderTopWidth = '3px';
    card.innerHTML = `
      <div class="mark-head">
        <div class="mark-name">${esc(t.name)}</div>
        <div class="mark-pts">${hide ? '—' : t.score + ' p'}</div>
      </div>
      <div class="row">
        ${done
          ? wasCorrect
            ? `<span class="small">✓ Rätt</span><span class="pts-gained">+${S.currentClue.value} p</span>`
            : '<span class="small">✗ Fel</span>'
          : `<button class="btn good sm" data-ri="${i}">✅ Rätt</button>
             <button class="btn bad sm" data-wi="${i}">❌ Fel</button>`
        }
      </div>
    `;
    area.appendChild(card);
  });

  // Buzzer: "give another team a chance"
  if (S.mode === 'buzzer' && S.answeredTeams.size > 0 && (!S.correctTeams || S.correctTeams.size === 0) && S.answeredTeams.size < S.teamCount && !S.answerShown) {
    const retry = document.createElement('button');
    retry.className = 'btn sm';
    retry.style.marginTop = '10px';
    retry.textContent = '🔔 Ge ett annat lag chansen';
    retry.addEventListener('click', () => {
      S.revealed = false;
      S.buzzerTeam = null;
      $('btnShowAnswer').textContent = '✅ Bedöm svar';
      renderBuzzGrid();
      renderMarking();
      $('buzzerArea').style.display = 'block';
      showStatus('Välj nästa lag som vill svara. Facit är fortfarande dolt.');
    });
    area.appendChild(retry);
  }

  // Listeners
  area.querySelectorAll('[data-ri]').forEach(b => {
    b.addEventListener('click', () => {
      const i = +b.dataset.ri;
      const prevScore = S.teams[i].score;
      S.teams[i].score += S.currentClue.value;
      S.answeredTeams.add(i);
      if (!S.correctTeams) S.correctTeams = new Set();
      S.correctTeams.add(i);
      renderTeams(); renderMarking();
      animateScore(i, prevScore, S.teams[i].score);
      checkAllDone();
    });
  });
  area.querySelectorAll('[data-wi]').forEach(b => {
    b.addEventListener('click', () => {
      S.answeredTeams.add(+b.dataset.wi);
      renderMarking(); checkAllDone();
    });
  });
}

function animateScore(teamIdx, from, to) {
  const el = document.getElementById(`score-${teamIdx}`);
  if (!el || from === to) return;
  if (S.hideScores && !S.scoresRevealed) {
    el.textContent = '?';
    return;
  }
  const dur = 600, steps = 20;
  const diff = to - from;
  let step = 0;
  const interval = setInterval(() => {
    step++;
    const eased = Math.round(from + diff * (1 - Math.pow(1 - step/steps, 3)));
    el.textContent = eased;
    if (step >= steps) { el.textContent = to; clearInterval(interval); }
  }, dur / steps);
}

function checkAllDone() {
  const n = S.mode === 'all' ? S.teamCount : 1;
  if (S.answeredTeams.size >= n) showStatus('✅ Klart! Stäng frågan för att gå vidare.');
}

function showStatus(msg) {
  const el = $('dlgStatus');
  el.textContent = msg;
  el.style.display = 'block';
}

/* CLOSE */
function closeDialog() {
  stopTimer();
  stopClueAudio();
  $('btnStartAudioTimer').style.display = 'none';
  $('btnShowAnswer').textContent = '👁 Visa svar';
  $('dlgQ').classList.remove('grading-mode');
  $('dlgQ').close();
  if (S.currentClue) {
    S.used.add(`${S.currentClue.col}-${S.currentClue.row}`);
    if (S.mode === 'captain') {
      S.captainIdx = (S.captainIdx + 1) % S.teamCount;
    }
    S.currentClue = null;
    renderBoard(); renderTeams(); checkWinner();

    // Blink på lag som hade rätt — nu när dialogen är stängd och korten syns
    if (S.correctTeams && S.correctTeams.size > 0) {
      S.correctTeams.forEach(i => {
        const teamCard = $('teamsRow').children[i];
        if (teamCard) {
          teamCard.classList.remove('flash-correct');
          void teamCard.offsetWidth; // force reflow
          teamCard.classList.add('flash-correct');
        }
      });
    }
  }
  syncMusic();
}

function checkWinner() {
  if (!isQuizComplete(S.used, quizData)) return;
  S.scoresRevealed = true;
  renderTeams();
  setTimeout(showWinnerReveal, 600); // kort paus efter sista frågan stängs
}

/* ================================================================
   AUDIO HELPERS
================================================================ */
function parseAudioUrl(url) {
  if (!url) return null;
  const sp = url.match(/open\.spotify\.com\/(track|playlist|album)\/([A-Za-z0-9]+)/);
  if (sp) return { type: 'spotify', kind: sp[1], id: sp[2] };
  return { type: 'audio', url };
}

function stopClueAudio() {
  try { const a = $('dlgAudioPlayer'); a.pause(); a.src = ''; } catch(e) {}
  try { $('dlgSpotifyFrame').src = ''; } catch(e) {}
}

/* ================================================================
   AUDIO SEARCH
================================================================ */
let AS = { ci: null, qi: null, url: null };

function openAudioSearch(ci, qi) {
  AS.ci = ci; AS.qi = qi;
  AS.url = quizData[ci].clues[qi].audio || null;
  $('audioSearchInput').value = '';
  $('audioResults').innerHTML = '<div style="text-align:center;padding:24px;color:var(--muted);font-size:13px">Skriv ett sökord och tryck Sök 🔍</div>';
  $('audioSearchStatus').textContent = '';
  $('spotifyUrlInput').value = '';
  $('spotifyPreviewWrap').style.display = 'none';
  $('audioManualUrl').value = AS.url && !AS.url.includes('spotify') ? AS.url : '';
  $('btnAudioConfirm').disabled = !AS.url;
  $('audioSelectedLabel').innerHTML = AS.url
    ? `<span class="img-badge">✅ ${AS.url.includes('spotify') ? 'Spotify-länk vald' : 'Ljud valt'}</span>`
    : '';
  if (AS.url && AS.url.includes('spotify')) {
    $('spotifyUrlInput').value = AS.url;
    showSpotifyPreview(AS.url);
  }
  $('dlgAudioSearch').showModal();
}

async function wikimediaAudioSearch(query) {
  $('audioSearchStatus').innerHTML = '<span class="spin"></span>Söker på Wikimedia Commons…';
  $('audioResults').innerHTML = '';
  $('btnAudioSearchSv').disabled = true;
  $('btnAudioSearchEn').disabled = true;
  try {
    const searchQ = encodeURIComponent('filetype:AUDIO ' + query);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${searchQ}&gsrlimit=30&prop=imageinfo&iiprop=url|size|mediatype|extmetadata&format=json&origin=*`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {})
      .filter(p => {
        const u = p.imageinfo?.[0]?.url || '';
        return /\.(mp3|ogg|wav|flac|oga|m4a)$/i.test(u);
      });
    if (!pages.length) {
      $('audioResults').innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted)">Inga ljudfiler hittades för "<em>${esc(query)}</em>".<br>Prova på engelska 🌐 eller ett annat sökord.</div>`;
      $('audioSearchStatus').textContent = '';
      return;
    }
    $('audioSearchStatus').textContent = `${pages.length} ljudfiler hittade`;
    $('audioResults').innerHTML = '';
    pages.slice(0, 20).forEach(page => {
      const info  = page.imageinfo[0];
      const fileUrl = info.url;
      const title = page.title.replace('File:', '').replace(/_/g, ' ');
      const desc = info.extmetadata?.ObjectName?.value || '';
      const row = document.createElement('div');
      row.className = 'audio-result' + (AS.url === fileUrl ? ' sel' : '');
      row.innerHTML = `
        <div class="audio-result-icon">🔊</div>
        <div class="audio-result-info">
          <div class="audio-result-name" title="${esc(title)}">${esc(title.length > 60 ? title.slice(0,60)+'…' : title)}</div>
          <div class="audio-result-meta">${fileUrl.split('.').pop().toUpperCase()}</div>
        </div>
        <div class="audio-mini-player">
          <button class="btn sm" data-preview="${esc(fileUrl)}" title="Spela upp">▶</button>
        </div>`;
      row.addEventListener('click', e => {
        if (e.target.closest('[data-preview]')) return;
        document.querySelectorAll('.audio-result').forEach(r => r.classList.remove('sel'));
        row.classList.add('sel');
        AS.url = fileUrl;
        $('btnAudioConfirm').disabled = false;
        $('audioSelectedLabel').innerHTML = `<span class="img-badge">✅ ${esc(title.slice(0,40))}${title.length>40?'…':''}</span>`;
      });
      row.querySelector('[data-preview]').addEventListener('click', e => {
        e.stopPropagation();
        const src = e.currentTarget.dataset.preview;
        // Toggle preview
        const existing = document.getElementById('audioPreviewEl');
        if (existing && existing.src === src) { existing.pause(); existing.remove(); e.currentTarget.textContent='▶'; return; }
        if (existing) { existing.pause(); existing.remove(); document.querySelectorAll('[data-preview]').forEach(b=>b.textContent='▶'); }
        const a = document.createElement('audio');
        a.id = 'audioPreviewEl'; a.src = src; a.autoplay = true;
        a.addEventListener('ended', () => { a.remove(); e.currentTarget.textContent='▶'; });
        document.body.appendChild(a);
        e.currentTarget.textContent = '⏹';
      });
      $('audioResults').appendChild(row);
    });
  } catch(err) {
    $('audioResults').innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted)">❌ Sökningen misslyckades.</div>`;
    $('audioSearchStatus').textContent = '';
  } finally {
    $('btnAudioSearchSv').disabled = false;
    $('btnAudioSearchEn').disabled = false;
  }
}

function showSpotifyPreview(url) {
  const parsed = parseAudioUrl(url);
  if (!parsed || parsed.type !== 'spotify') return;
  $('spotifyPreviewFrame').src = `https://open.spotify.com/embed/${parsed.kind}/${parsed.id}?utm_source=generator&theme=0`;
  $('spotifyPreviewWrap').style.display = 'block';
  AS.url = url;
  $('btnAudioConfirm').disabled = false;
  $('audioSelectedLabel').innerHTML = '<span class="img-badge">✅ Spotify-länk vald</span>';
}

function applyAudioToClue(url) {
  const { ci, qi } = AS;
  try {
    url = sanitizeMediaUrl(url, 'Ljudlänken');
  } catch (e) {
    alert(e.message);
    return;
  }
  quizData[ci].clues[qi].audio = url;
  const lbl = document.querySelector(`[data-albl="${ci}-${qi}"]`);
  const row = lbl ? lbl.closest('.audio-editor-row') : null;
  if (lbl) lbl.textContent = url
    ? (url.includes('spotify') ? '🎵 Spotify-länk tillagd' : '🔊 Ljud tillagd')
    : 'Inget ljud';
  if (row) row.querySelector('span:first-child').textContent = url ? '🔊' : '🔇';
  // Stop any preview
  const prev = document.getElementById('audioPreviewEl');
  if (prev) { prev.pause(); prev.remove(); }
  markDirty();
  renderBoard();
  $('dlgAudioSearch').close();
}

/* ================================================================
   WINNER REVEAL
================================================================ */
let confettiAnim = null;

function showWinnerReveal() {
  const vis = S.teams.slice(0, S.teamCount);
  const sorted = [...vis].map((t,i)=>({...t,idx:i})).sort((a,b)=>b.score-a.score);

  // Build podium (max 3)
  const podium = $('podiumWrap');
  podium.innerHTML = '';

  // Order for display: 3rd (left), 1st (center), 2nd (right)
  const places = sorted.slice(0, Math.min(3, S.teamCount));
  const displayOrder = places.length === 1
    ? [places[0]]
    : places.length === 2
    ? [places[1], places[0]]
    : [places[2], places[0], places[1]];

  const medals = ['🥇','🥈','🥉'];
  const blockClass = ['p1','p2','p3'];

  // Map display order to real place index
  const placeOf = item => places.findIndex(p => p === item);

  displayOrder.forEach(team => {
    const place = placeOf(team); // 0=1st, 1=2nd, 2=3rd
    const item = document.createElement('div');
    item.className = 'podium-item';
    item.dataset.place = place;
    item.innerHTML = `
      <div class="podium-team-name" style="color:${TEAM_COLORS[team.idx]}">${esc(team.name)}</div>
      <div class="podium-score" style="font-family:'Fredoka',system-ui,sans-serif;font-size:clamp(13px,1.6vw,18px);font-weight:600">${team.score} p</div>
      <div class="podium-block ${blockClass[place]}">${medals[place]}</div>`;
    podium.appendChild(item);
  });

  // Title
  const isTie = sorted.length > 1 && sorted[0].score === sorted[1].score;
  $('winnerTitleWrap').classList.remove('show');
  $('winnerHeadline').textContent = isTie ? 'Oavgjort! 🤝' : `${sorted[0].name} vinner!`;
  $('winnerSubline').style.fontFamily = "'Fredoka',system-ui,sans-serif";
  $('winnerSubline').textContent = isTie
    ? `${sorted.filter(t=>t.score===sorted[0].score).map(t=>t.name).join(' & ')} delar ledarplatsen`
    : `${sorted[0].score} poäng – grattis!`;
  $('winnerTrophyIcon').textContent = isTie ? '🤝' : '🏆';

  $('dlgWinner').showModal();

  // Resize canvas
  const canvas = $('confettiCanvas');
  canvas.width = $('dlgWinner').offsetWidth || window.innerWidth;
  canvas.height = $('dlgWinner').offsetHeight || window.innerHeight;

  // Reveal sequence: 3rd after 0.5s, 2nd after 1.5s, 1st after 2.8s + title + confetti
  const items = podium.querySelectorAll('.podium-item');

  // Sort items by place descending (3rd first)
  const byPlace = [...items].sort((a,b) => +b.dataset.place - +a.dataset.place);

  byPlace.forEach((item, i) => {
    const delays = places.length === 1 ? [500] : places.length === 2 ? [500, 1600] : [500, 1600, 2900];
    setTimeout(() => {
      item.classList.add('show');
      if (+item.dataset.place === 0) {
        // First place reveal
        setTimeout(() => {
          $('winnerTitleWrap').classList.add('show');
          playFanfare();
          startConfetti(canvas, TEAM_COLORS[sorted[0].idx]);
        }, 300);
      }
    }, delays[i]);
  });
}

function playFanfare() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // C-E-G-C fanfare
    const seq = [
      [523.25, 0,    0.18],
      [659.25, 0.18, 0.18],
      [783.99, 0.36, 0.18],
      [1046.5, 0.54, 0.55],
      [783.99, 0.54, 0.55],
      [1046.5, 1.1,  0.7],
    ];
    seq.forEach(([freq, start, dur]) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const t0 = ctx.currentTime + start;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.22, t0 + 0.04);
      gain.gain.linearRampToValueAtTime(0.18, t0 + dur * 0.7);
      gain.gain.linearRampToValueAtTime(0, t0 + dur);
      osc.start(t0); osc.stop(t0 + dur + 0.05);
    });
  } catch(e) {}
}

function startConfetti(canvas, winnerColor) {
  if (confettiAnim) cancelAnimationFrame(confettiAnim);
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const colors = [winnerColor, '#fbbf24', '#f87171', '#34d399', '#a78bfa', '#5eaeff', '#fb923c', '#ffffff'];
  const pieces = Array.from({length: 140}, () => ({
    x: Math.random() * W,
    y: Math.random() * -H,
    w: 8 + Math.random() * 10,
    h: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.15,
    opacity: 0.85 + Math.random() * 0.15,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    // After 8 seconds slow down & fade
    if (frame > 480) pieces.forEach(p => { p.vy *= 0.997; p.opacity *= 0.998; });
    if (frame < 900) confettiAnim = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, W, H);
  }
  draw();
}

function stopWinnerReveal() {
  if (confettiAnim) { cancelAnimationFrame(confettiAnim); confettiAnim = null; }
  const canvas = $('confettiCanvas');
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  $('dlgWinner').close();
}

/* ================================================================
   TIMER
================================================================ */
function startTimer() {
  stopTimer();
  S.timer.running = true;
  S.timer.endAt = Date.now() + S.timerMs;
  tickTimer();
  S.timer.h = setInterval(tickTimer, 100);
}
function stopTimer() {
  S.timer.running = false;
  if (S.timer.h) { clearInterval(S.timer.h); S.timer.h = null; }
  syncMusic();
}
function tickTimer() {
  const left = Math.max(0, S.timer.endAt - Date.now());
  $('timerFill').style.transform = `scaleX(${left/S.timerMs})`;
  $('timerLeft').textContent = left > 0 ? `${Math.ceil(left/1000)} sek kvar` : 'Tiden är slut!';
  if (left <= 0) stopTimer();
}

/* ================================================================
   NEW ROUND
================================================================ */
function resetRoundState() {
  if ($('dlgWinner') && $('dlgWinner').open) stopWinnerReveal();
  if ($('dlgQ').open) $('dlgQ').close();
  stopTimer();
  stopClueAudio();
  S.used = new Set();
  S.scoresRevealed = false;
  S.captainIdx = 0;
  S.teams.forEach(t => { t.score = 0; });
  S.currentClue = null;
  S.revealed = false;
  S.answeredTeams = new Set();
  S.correctTeams = new Set();
  S.buzzerTeam = null;
  renderTeams(); renderBoard();
}

function newRound() {
  if (!confirm('Starta ny omgång? Poäng och tavla återställs.')) return;
  resetRoundState();
}

/* ================================================================
   MUSIC
================================================================ */
function setMusicStatus(msg) { $('musicStatus').textContent = msg; }

async function syncMusic() {
  const bg = $('bgMusic'), tm = $('tensionMusic');
  if (!S.musicOn) {
    try { bg.pause(); } catch(e){}
    try { tm.pause(); } catch(e){}
    $('btnMusic').textContent = '🎵 Musik OFF';
    return;
  }
  $('btnMusic').textContent = '🎵 Musik ON';
  if (S.timer.running && $('dlgQ').open) {
    try { bg.pause(); } catch(e){}
    try { tm.currentTime = 0; await tm.play(); setMusicStatus('⏱ Timer-musik'); } catch(e) { setMusicStatus('(musikfil saknas)'); }
  } else {
    try { tm.pause(); } catch(e){}
    try { await bg.play(); setMusicStatus('♪ Spelar'); } catch(e) { setMusicStatus('Klicka Musik för att starta'); }
  }
}
async function unlockAudio() {
  try {
    const bg = $('bgMusic');
    bg.muted = true; await bg.play(); bg.pause(); bg.currentTime = 0; bg.muted = false;
    S.audioUnlocked = true;
    if (S.musicOn) await syncMusic();
  } catch(e) { $('bgMusic').muted = false; }
}
function applyVol() {
  const v = +$('vol').value / 100;
  $('bgMusic').volume = v; $('tensionMusic').volume = v;
  savePrefs();
}

/* ================================================================
   EDITOR
================================================================ */
function renderEditor() {
  const wrap = $('editorAccordion');
  const EMOJIS = [
    '🌊','🐾','🇸🇪','🎮','🧠','🔢','🌍','🏛','🔬','🎨',
    '📚','⚽','🎵','🚀','🦁','🌿','🍎','🏆','💡','🗺',
    '🎭','🌸','🦋','🏔','🍕','🎯','🔭','🦕','🌈','🐳',
    '🏰','🎪','🌙','⭐','🦊','🐧','🐢','🦉','🌺','🍂',
    '🏄','🎸','🎹','🎺','🥁','🎲','🃏','🎠','🎡','🎢',
  ];

  wrap.innerHTML = '';

  // Reuse one shared popup so re-rendering the editor cannot duplicate IDs or listeners.
  let popup = document.getElementById('emojiPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'emoji-popup';
    popup.id = 'emojiPopup';
    popup.dataset.runtime = 'true';
    document.body.appendChild(popup);
  }
  popup.replaceChildren();
  EMOJIS.forEach(em => {
    const b = document.createElement('button');
    b.className = 'emoji-btn';
    b.textContent = em;
    b.type = 'button';
    popup.appendChild(b);
  });
  quizData.forEach((cat, ci) => {
    const block = document.createElement('div');
    block.className = 'cat-block open';
    block.innerHTML = `
      <div class="cat-head">
        <div class="row" style="flex:1;gap:8px;min-width:0">
          <div class="cat-num">${ci+1}</div>
          <button type="button" class="cat-emoji-trigger" data-emoji-ci="${ci}" title="Välj emoji">${getLeadingEmoji(cat.category)}</button>
          <input class="cat-name-inp" data-cn="${ci}" value="${esc(stripLeadingEmoji(cat.category))}" placeholder="Kategorinamn…">
        </div>
        <span class="cat-chevron">▲</span>
      </div>
      <div class="cat-body">
        ${cat.clues.map((cl,qi) => `
          <div class="q-row">
            <div class="q-pts">${esc(cl.value)}</div>
            <div>
              <label class="lbl">Fråga</label>
              <textarea data-q="${ci}-${qi}" rows="2">${esc(cl.question)}</textarea>
              <div class="img-editor-row">
                <img class="img-editor-thumb" data-ethumb="${ci}-${qi}" src="${esc(cl.image||'')}" alt="" style="display:${cl.image?'block':'none'}">
                <span class="img-editor-lbl" data-elbl="${ci}-${qi}">${cl.image?'📷 Bild tillagd':'Ingen bild'}</span>
                <button type="button" class="btn sm primary" data-imgsearch="${ci}-${qi}">🔍 Sök bild</button>
              </div>
              <div class="audio-editor-row">
                <span style="font-size:18px;flex-shrink:0">${cl.audio ? '🔊' : '🔇'}</span>
                <span class="audio-editor-lbl" data-albl="${ci}-${qi}">${cl.audio ? (cl.audio.includes('spotify') ? '🎵 Spotify-länk tillagd' : '🔊 Ljud tillagd') : 'Inget ljud'}</span>
                <button type="button" class="btn sm warn" data-audiosearch="${ci}-${qi}">🔊 Lägg till ljud</button>
              </div>
            </div>
            <div>
              <label class="lbl">Svar</label>
              <input class="inp" type="text" data-a="${ci}-${qi}" value="${esc(cl.answer)}">
            </div>
          </div>
        `).join('')}
      </div>
    `;
    wrap.appendChild(block);

    block.querySelector('.cat-head').addEventListener('click', e => {
      if (e.target.classList.contains('cat-name-inp')) return;
      if (e.target.classList.contains('cat-emoji-trigger')) return;
      block.classList.toggle('open');
      const chevron = block.querySelector('.cat-chevron');
      const isOpen = block.classList.contains('open');
      chevron.textContent = isOpen ? '▲' : '▼';
      chevron.setAttribute('aria-expanded', String(isOpen));
      chevron.setAttribute('aria-label', isOpen ? 'Fäll ihop kategori' : 'Fäll ut kategori');
    });

    // Emoji picker trigger
    const emojiTrigger = block.querySelector(`[data-emoji-ci="${ci}"]`);
    emojiTrigger.addEventListener('click', e => {
      e.stopPropagation();
      const rect = emojiTrigger.getBoundingClientRect();
      popup.style.top  = (rect.bottom + window.scrollY + 6) + 'px';
      popup.style.left = Math.max(8, rect.left + window.scrollX) + 'px';
      popup.classList.toggle('open');
      // Wire up pick for this category
      popup._ci = ci;
    });
  });

  // Single delegated handler for emoji picks
  popup.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ci = popup._ci;
      if (ci == null) return;
      const inp = wrap.querySelector(`[data-cn="${ci}"]`);
      const trigger = wrap.querySelector(`[data-emoji-ci="${ci}"]`);
      if (!inp || !trigger) return;
      trigger.textContent = btn.textContent;
      quizData[ci].category = btn.textContent + ' ' + inp.value.trim();
      renderBoard();
      markDirty();
      popup.classList.remove('open');
    });
  });

  wrap.querySelectorAll('[data-cn]').forEach(inp => {
    inp.addEventListener('input', () => {
      const ci = +inp.dataset.cn;
      const trigger = wrap.querySelector(`[data-emoji-ci="${ci}"]`);
      const emoji = trigger ? trigger.textContent.trim() : '';
      quizData[ci].category = (emoji ? emoji + ' ' : '') + inp.value;
      renderBoard();
      markDirty();
    });
  });
  wrap.querySelectorAll('[data-q]').forEach(ta => {
    ta.addEventListener('input', () => {
      const [c,q] = ta.dataset.q.split('-').map(Number);
      quizData[c].clues[q].question = ta.value;
      markDirty();
    });
  });
  wrap.querySelectorAll('[data-a]').forEach(inp => {
    inp.addEventListener('input', () => {
      const [c,q] = inp.dataset.a.split('-').map(Number);
      quizData[c].clues[q].answer = inp.value;
      markDirty();
    });
  });

  // Bild-sökning per fråga
  wrap.querySelectorAll('[data-imgsearch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [ci,qi] = btn.dataset.imgsearch.split('-').map(Number);
      openImgSearch(ci, qi);
    });
  });

  // Ljud-sökning per fråga
  wrap.querySelectorAll('[data-audiosearch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [ci,qi] = btn.dataset.audiosearch.split('-').map(Number);
      openAudioSearch(ci, qi);
    });
  });
}

function markDirty() {
  S.dirty = true;
  setBadge('unsaved','● Osparade ändringar');
}
function setBadge(cls, txt) {
  const b = $('editorBadge');
  b.className = `status-badge ${cls}`;
  b.textContent = txt;
}

function saveEditor() {
  try {
    quizData = persistQuiz(quizData);
    S.dirty = false;
    setBadge('saved','✅ Sparat!');
    renderEditor(); renderBoard();
  } catch (e) {
    setBadge('unsaved', '⚠️ Kontrollera frågorna');
    alert('Quizet kunde inte sparas:\n\n' + e.message);
  }
}

async function saveJson() {
  try {
    quizData = normalizeQuiz(quizData);
    const dateStr = new Date().toISOString().slice(0,10);
    const payload = JSON.stringify({ version: 1, saved: new Date().toISOString(), quiz: quizData }, null, 2);
    const blob = new Blob([payload], {type: 'application/json'});

    // Försök med native "Spara som"-dialog (Chrome/Edge)
    if (window.showSaveFilePicker) {
      try {
        const fh = await window.showSaveFilePicker({
          suggestedName: 'quiz_' + dateStr + '.quiz',
          types: [{ description: 'Quiz-fil', accept: { 'application/json': ['.quiz'] } }],
        });
        const ws = await fh.createWritable();
        await ws.write(blob);
        await ws.close();
        setBadge('saved', '⬇️ Quiz-fil sparad!');
        S.dirty = false;
        return;
      } catch(e) {
        if (e.name === 'AbortError') return; // Användaren avbröt dialogen
        // Annars: fall through till vanlig nedladdning
      }
    }

    // Fallback: vanlig nedladdning (Firefox, Safari)
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href = url;
    a.download = 'quiz_' + dateStr + '.quiz';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    setBadge('saved', '⬇️ Quiz-fil sparad!');
    S.dirty = false;
  } catch(e) { alert('Kunde inte spara filen: ' + e.message); }
}

async function loadJsonFile(file) {
  try {
    const text    = await file.text();
    const payload = JSON.parse(text);
    const data    = normalizeQuiz(Array.isArray(payload) ? payload : payload.quiz);
    if (!confirm('Ladda in "' + file.name + '"?\n\nDetta ersätter de nuvarande frågorna.')) return;
    quizData = persistQuiz(data);
    S.dirty = false;
    renderEditor(); resetRoundState();
    setBadge('saved', '📂 Laddad: ' + file.name);
  } catch(e) { alert('Kunde inte läsa filen: ' + e.message); }
}

function resetEditor() {
  if (!confirm('Återställ alla frågor till standardfrågorna?')) return;
  quizData = persistQuiz(cloneQuiz(DEFAULT_QUIZ));
  renderEditor(); resetRoundState();
  setBadge('saved','✅ Återställt');
  S.dirty = false;
}

/* ================================================================
   AI GENERATION
================================================================ */
async function generateAI() {
  const topic  = $('aiTopic').value.trim();
  const level  = $('aiLevel').value;
  const apiKey = $('apiKey').value.trim();

  if (!topic)  { $('aiStatus').textContent = '⚠️ Ange ett ämne.'; return; }
  if (!apiKey) { $('aiStatus').textContent = '⚠️ Ange din API-nyckel.'; return; }

  $('btnGenAI').disabled = true;
  $('aiStatus').innerHTML = '<span class="spin"></span>Genererar quiz på svenska…';
  $('aiPreviewWrap').style.display = 'none';

  const prompt = `Skapa ett Jeopardy-quiz på svenska för ${level}.
Ämne: "${topic}"

Krav:
- Exakt 5 kategorier, varje kategori har 5 frågor
- Poängvärden: 100, 200, 300, 400, 500 (stigande svårighetsgrad)
- Frågorna ska vara tydliga, roliga och lämpliga för ${level}
- Börja gärna kategorinamnen med en passande emoji

Svara ENBART med giltig JSON, inget annat, inga kommentarer, inga backticks:
[{"category":"...","clues":[{"value":100,"question":"...","answer":"..."},...]},...]`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': apiKey,
        'anthropic-version':'2023-06-01',
        'anthropic-dangerous-direct-browser-access':'true',
      },
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens: 3000,
        messages:[{role:'user',content:prompt}]
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const text = data.content?.find(c=>c.type==='text')?.text || '';
    const m = text.match(/\[[\s\S]*\]/);
    if (!m) throw new Error('Oväntat svar från AI. Prova igen.');
    const gen = JSON.parse(m[0]);
    pendingData = normalizeQuiz(gen);
    renderPreview('ai', pendingData);
    $('aiStatus').textContent = `✅ Quiz genererat med ${pendingData.length} kategorier!`;
    $('aiPreviewWrap').style.display = 'block';
  } catch(e) {
    $('aiStatus').textContent = `❌ ${e.message}`;
  } finally {
    $('btnGenAI').disabled = false;
  }
}

/* ================================================================
   AI SECTION UNLOCK
================================================================ */
function unlockAiSection() {
  const overlay = document.querySelector('.fetch-card div[style*="z-index:10"]');
  if (overlay) overlay.remove();
}

/* ================================================================
   FILE IMPORT
================================================================ */
function dragOver(e) {
  e.preventDefault();
  $('dropZone').style.borderColor = 'var(--accent)';
  $('dropZone').style.background  = 'rgba(94,174,255,.06)';
}
function dragLeave(e) {
  $('dropZone').style.borderColor = '';
  $('dropZone').style.background  = '';
}
function dropFile(e) {
  e.preventDefault();
  dragLeave(e);
  const file = e.dataTransfer.files[0];
  if (file) handleImportFile(file);
}

$('fileInput').addEventListener('change', () => {
  if ($('fileInput').files[0]) handleImportFile($('fileInput').files[0]);
});
$('dropZone').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    $('fileInput').click();
  }
});

async function handleImportFile(file) {
  $('importStatus').textContent = '⏳ Läser fil…';
  $('importPreviewWrap').style.display = 'none';
  $('importErrors').textContent = '';

  try {
    let text = '';
    if (file.name.endsWith('.docx')) {
      if (typeof mammoth === 'undefined') throw new Error('Mammoth.js laddades inte — kontrollera internetanslutningen.');
      const buf = await file.arrayBuffer();
      const res = await mammoth.extractRawText({arrayBuffer: buf});
      text = res.value;
    } else {
      text = await file.text();
    }

    const {data, errors} = parseImportText(text);

    if (data.length === 0) {
      $('importStatus').textContent = '❌ Hittade inga kategorier. Kontrollera att filen följer mallen.';
      if (errors.length) $('importErrors').innerHTML = errors.map(e=>`⚠️ ${esc(e)}`).join('<br>');
      return;
    }

    pendingData = data;
    renderPreview('import', data);
    $('importPreviewWrap').style.display = 'block';
    $('importStatus').textContent = `✅ Hittade ${data.length} kategorier med ${data.reduce((s,c)=>s+c.clues.length,0)} frågor!`;
    if (errors.length) $('importErrors').innerHTML = '<strong>Varningar:</strong><br>' + errors.map(e=>`⚠️ ${esc(e)}`).join('<br>');

  } catch(e) {
    $('importStatus').textContent = '❌ ' + e.message;
  }
}

function parseImportText(raw) {
  return parseQuizText(raw);
}

// Download template
$('btnDownloadTemplate').addEventListener('click', () => {
  const tmpl = `# Quiz-mall för SkolQUIZ
# Rader som börjar med # ignoreras.
# Format: poäng | Frågan | Svaret
# Poängvärden: 100, 200, 300, 400, 500 (en per rad)
# Du kan ha 1–5 kategorier (en per kolumn på spelplanen).

KATEGORI: 🌍 Geografi
100 | Vad heter Sveriges huvudstad? | Stockholm
200 | Vilket hav gränsar till Sverige i öster? | Östersjön
300 | Hur heter Sveriges längsta flod? | Klarälven
400 | I vilket landskap ligger Kiruna? | Lappland
500 | Vad heter Nordens högsta berg? | Galdhøpiggen (Norge)

KATEGORI: 🔢 Matematik
100 | Vad är 8 × 7? | 56
200 | Vad är roten ur 144? | 12
300 | Hur många grader är det i en triangels alla vinklar tillsammans? | 180 grader
400 | Vad kallas ett tal som bara är delbart med sig självt och 1? | Primtal
500 | Vad är pi avrundat till två decimaler? | 3,14

KATEGORI: 🐾 Djur & natur
100 | Vilket djur säger "mu"? | Ko
200 | Vad kallas djur som bara äter växter? | Växtätare
300 | Vad heter Sveriges största kattdjur i vilt tillstånd? | Lodjur
400 | Vilket träd producerar ekollon? | Ek
500 | Vad kallas det när fåglar flyger söderut inför vintern? | Fågelflyttning

# Lägg till fler kategorier här på samma sätt...
`;
  const blob = new Blob([tmpl], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download='quiz_mall.txt';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
});

$('btnLoadImport').addEventListener('click', () => loadPending('import'));
$('btnDiscardImport').addEventListener('click', () => {
  $('importPreviewWrap').style.display = 'none';
  $('importStatus').textContent = '';
  pendingData = null;
  $('fileInput').value = '';
});

/* ================================================================
   OPEN TRIVIA DB
================================================================ */
function populateOtdb() {
  const defaults = [9,22,23,17,21];
  for (let i = 1; i <= 5; i++) {
    const sel = $(`oc${i}`);
    OTDB_CATS.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.sv;
      if (cat.id === defaults[i-1]) opt.selected = true;
      sel.appendChild(opt);
    });
  }
}

async function fetchOtdb() {
  const diff   = $('otdbDiff').value;
  const catIds = [1,2,3,4,5].map(i => +$(`oc${i}`).value);

  $('btnFetchOtdb').disabled = true;
  $('otdbPreviewWrap').style.display = 'none';

  const setStatus = msg => $('otdbStatus').innerHTML = msg;

  // Räknar ner och visar en snygg nedräkning mellan anrop
  const wait = async (secs, label) => {
    for (let s = secs; s > 0; s--) {
      setStatus(`<span class="spin"></span>${label} — väntar ${s}s (API tillåter max 1 anrop/5s)…`);
      await new Promise(r => setTimeout(r, 1000));
    }
  };

  // base64-avkodning — renare än HTML-entities
  const b64decode = str => {
    try { return decodeURIComponent(escape(atob(str))); }
    catch(e) { return decodeHtml(str); } // fallback
  };

  const RESPONSE_MSGS = {
    1: 'Inte tillräckligt med frågor för den svårighetsgraden i den kategorin — prova "Lätt" eller "Medel", eller välj en annan kategori.',
    2: 'Ogiltigt API-anrop — kontakta utvecklaren.',
    3: 'Session-token hittades inte — prova igen.',
    4: 'Alla frågor i kategorin är tillfälligt slut — token återställs automatiskt, prova igen.',
    5: 'Rate limit: för många anrop. Vänta 10 sekunder och prova igen.',
  };

  try {
    // Steg 1: Hämta session-token
    setStatus('<span class="spin"></span>Hämtar session-token…');
    let token = '';
    try {
      const tr = await fetch('https://opentdb.com/api_token.php?command=request');
      const td = await tr.json();
      if (td.response_code === 0) token = td.token;
    } catch(e) { /* fortsätt utan token */ }

    // Vänta 5s efter token-anropet innan första fråge-anropet
    await wait(5, 'Token hämtad');

    // Steg 2: Hämta frågor per kategori
    const result = [];

    for (let ci = 0; ci < catIds.length; ci++) {
      const id   = catIds[ci];
      const name = OTDB_CATS.find(c=>c.id===id)?.sv || `Kategori ${ci+1}`;
      setStatus(`<span class="spin"></span>Hämtar kategori ${ci+1}/5: ${name}…`);

      // Använd base64-kodning för renare text (undviker HTML-entities)
      const url = `https://opentdb.com/api.php?amount=5&category=${id}&difficulty=${diff}&type=multiple&encode=base64${token?'&token='+token:''}`;
      const res  = await fetch(url);

      if (res.status === 429) {
        // Explicit rate-limit — vänta 10s och prova om
        await wait(10, '429 Rate limit');
        const res2  = await fetch(url);
        if (!res2.ok) throw new Error(`Nätverksfel efter retry (HTTP ${res2.status}).`);
        var data = await res2.json();
      } else {
        if (!res.ok) throw new Error(`Nätverksfel (HTTP ${res.status}).`);
        var data = await res.json();
      }

      // Kod 4 = token tom → återställ token och prova en gång till
      if (data.response_code === 4 && token) {
        setStatus('<span class="spin"></span>Token tömd — återställer…');
        try {
          const rr = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
          const rd = await rr.json();
          if (rd.response_code === 0) token = rd.token;
        } catch(e) {}
        await wait(5, 'Token återställd');
        const res3 = await fetch(url.replace(/&token=[^&]+/, `&token=${token}`));
        data = await res3.json();
      }

      if (data.response_code !== 0) {
        const msg = RESPONSE_MSGS[data.response_code] || `Okänt fel (kod ${data.response_code}).`;
        throw new Error(`Kategori "${name}": ${msg}`);
      }
      if (!data.results?.length) throw new Error(`Inga frågor returnerades för "${name}".`);

      const pts = [100,200,300,400,500];
      result.push({
        category: name,
        clues: data.results.slice(0,5).map((q,i) => ({
          value: pts[i],
          question: b64decode(q.question),
          answer:   b64decode(q.correct_answer)
        }))
      });

      // Vänta 5s mellan varje kategori-anrop (API-krav)
      if (ci < 4) await wait(5, `Kategori ${ci+1} klar`);
    }

    pendingData = result;
    renderPreview('otdb', pendingData);
    setStatus('✅ 25 frågor hämtade!');
    $('otdbPreviewWrap').style.display = 'block';

  } catch(e) {
    setStatus(`❌ ${e.message}`);
  } finally {
    $('btnFetchOtdb').disabled = false;
  }
}

/* ================================================================
   PREVIEW & LOAD
================================================================ */
function renderPreview(type, data) {
  const el = $(type === 'ai' ? 'aiPreviewContent' : type === 'import' ? 'importPreviewContent' : 'otdbPreviewContent');
  el.innerHTML = '';
  data.forEach(cat => {
    const div = document.createElement('div');
    const catName = document.createElement('div');
    catName.className = 'prev-cat-name';
    catName.textContent = cat.category;
    div.appendChild(catName);
    cat.clues.forEach(cl => {
      const q = document.createElement('div');
      q.className = 'prev-q';
      q.innerHTML = `<span class="prev-pts">${cl.value}p</span>${esc(cl.question)}<div class="prev-ans">→ ${esc(cl.answer)}</div>`;
      div.appendChild(q);
    });
    el.appendChild(div);
  });
}

function loadPending(type) {
  if (!pendingData) return;
  let normalized;
  try {
    normalized = normalizeQuiz(pendingData);
  } catch (e) {
    alert('Frågorna kunde inte laddas:\n\n' + e.message);
    return;
  }
  if (!confirm('Ersätta nuvarande frågor med de importerade?')) return;
  quizData = persistQuiz(normalized);
  renderEditor(); resetRoundState();
  S.dirty = false;
  pendingData = null;
  if (type === 'ai') {
    $('aiPreviewWrap').style.display = 'none';
    $('aiStatus').textContent = '✅ Inladdat! Redigera i fliken "Redigera frågor".';
  } else if (type === 'import') {
    $('importPreviewWrap').style.display = 'none';
    $('importStatus').textContent = '✅ Inladdat!';
    $('fileInput').value = '';
  } else {
    $('otdbPreviewWrap').style.display = 'none';
    $('otdbStatus').textContent = '✅ Inladdat!';
  }
  switchView('edit');
  setBadge('saved','✅ Nya frågor laddade');
}

/* ================================================================
   MODE PICKER
================================================================ */
function syncModePicker() {
  document.querySelectorAll('.mode-card').forEach(c => {
    const selected = c.dataset.mode === S.mode;
    c.classList.toggle('sel', selected);
    if (c.tagName === 'BUTTON') c.setAttribute('aria-pressed', String(selected));
  });
}

/* ================================================================
   IMAGE SEARCH – WIKIMEDIA COMMONS
================================================================ */
let IS = { ci: null, qi: null, url: null }; // image search state

function openImgSearch(ci, qi) {
  IS.ci = ci; IS.qi = qi;
  IS.url = quizData[ci].clues[qi].image || null;
  $('imgSearchInput').value = '';
  $('imgGrid').innerHTML = '<div class="img-empty">Skriv ett sökord och tryck Sök 🔍</div>';
  $('imgSearchStatus').textContent = '';
  $('imgManualUrl').value = IS.url || '';
  $('imgMiniPrev').style.display = IS.url ? 'block' : 'none';
  if (IS.url) $('imgMiniPrev').src = IS.url;
  $('btnImgConfirm').disabled = !IS.url;
  $('imgSelectedLabel').innerHTML = IS.url ? '<span class="img-badge">✅ Bild vald</span>' : '';
  $('dlgImgSearch').showModal();
}

async function wikimediaSearch(query) {
  $('imgSearchStatus').innerHTML = '<span class="spin"></span>Söker på Wikimedia Commons…';
  $('imgGrid').innerHTML = '';
  $('btnImgSearchSv').disabled = true;
  $('btnImgSearchEn').disabled = true;
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=20&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json&origin=*`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {}).filter(p => p.imageinfo?.[0]?.thumburl);
    if (!pages.length) {
      $('imgGrid').innerHTML = `<div class="img-empty">Inga bilder för "<em>${esc(query)}</em>".<br>Prova annat sökord eller sök på engelska 🌐</div>`;
      $('imgSearchStatus').textContent = '';
      return;
    }
    $('imgGrid').innerHTML = '';
    $('imgSearchStatus').textContent = `${pages.length} bilder hittade`;
    pages.slice(0,16).forEach(page => {
      const info  = page.imageinfo[0];
      const thumb = info.thumburl;
      const full  = info.url;
      const title = page.title.replace('File:','').replace(/_/g,' ');
      const card  = document.createElement('div');
      card.className = 'img-thumb' + (IS.url === full ? ' sel' : '');
      card.innerHTML = `<img src="${esc(thumb)}" alt="${esc(title)}" loading="lazy"><div class="img-thumb-title">${esc(title)}</div>`;
      card.addEventListener('click', () => {
        document.querySelectorAll('.img-thumb').forEach(c => c.classList.remove('sel'));
        card.classList.add('sel');
        IS.url = full;
        $('imgSelectedLabel').innerHTML = `<span class="img-badge">✅ ${esc(title.slice(0,40))}${title.length>40?'…':''}</span>`;
        $('btnImgConfirm').disabled = false;
      });
      $('imgGrid').appendChild(card);
    });
  } catch(e) {
    $('imgGrid').innerHTML = `<div class="img-empty">❌ Sökningen misslyckades — kontrollera internetanslutningen.</div>`;
    $('imgSearchStatus').textContent = '';
  } finally {
    $('btnImgSearchSv').disabled = false;
    $('btnImgSearchEn').disabled = false;
  }
}

function applyImgToClue(url) {
  const {ci, qi} = IS;
  try {
    url = sanitizeMediaUrl(url, 'Bildlänken');
  } catch (e) {
    alert(e.message);
    return;
  }
  quizData[ci].clues[qi].image = url;
  // Update editor row
  const thumb = document.querySelector(`[data-ethumb="${ci}-${qi}"]`);
  const lbl   = document.querySelector(`[data-elbl="${ci}-${qi}"]`);
  if (thumb) { thumb.src = url||''; thumb.style.display = url?'block':'none'; }
  if (lbl)   { lbl.textContent = url ? '📷 Bild tillagd' : 'Ingen bild'; }
  markDirty();
  renderBoard();
  $('dlgImgSearch').close();
}

// Audio search event listeners
$('btnAudioSearchSv').addEventListener('click', () => {
  const q = $('audioSearchInput').value.trim(); if(q) wikimediaAudioSearch(q);
});
$('btnAudioSearchEn').addEventListener('click', () => {
  const q = $('audioSearchInput').value.trim(); if(q) wikimediaAudioSearch(q);
});
$('audioSearchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('btnAudioSearchSv').click(); }
});
$('btnSpotifyPreview').addEventListener('click', () => {
  const url = $('spotifyUrlInput').value.trim();
  if (!url) return;
  if (!url.includes('spotify.com')) { alert('Det verkar inte vara en Spotify-länk. Kontrollera att du kopierade hela länken.'); return; }
  showSpotifyPreview(url);
});
// Aktivera "Välj"-knappen direkt när en giltig Spotify-länk klistras in
$('spotifyUrlInput').addEventListener('input', () => {
  const url = $('spotifyUrlInput').value.trim();
  if (url.includes('open.spotify.com')) {
    AS.url = url;
    $('btnAudioConfirm').disabled = false;
    $('audioSelectedLabel').innerHTML = '<span class="img-badge">✅ Spotify-länk redo – klicka Välj eller Förhandsgranska</span>';
  }
});
$('spotifyUrlInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('btnSpotifyPreview').click(); }
});
$('audioManualUrl').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('btnAudioManualUse').click(); }
});
$('btnAudioManualUse').addEventListener('click', () => {
  const url = $('audioManualUrl').value.trim();
  if (url) { AS.url = url; $('btnAudioConfirm').disabled = false; $('audioSelectedLabel').innerHTML = '<span class="img-badge">✅ URL tillagd</span>'; }
});
$('btnAudioConfirm').addEventListener('click', () => { if (AS.url) applyAudioToClue(AS.url); });
$('btnAudioRemove').addEventListener('click', () => { AS.url = null; applyAudioToClue(''); });
$('btnCloseAudioSearch').addEventListener('click', () => {
  const prev = document.getElementById('audioPreviewEl');
  if (prev) { prev.pause(); prev.remove(); }
  $('dlgAudioSearch').close();
});

// Starta timer-knapp (ljud-frågor)
$('btnStartAudioTimer').addEventListener('click', () => {
  const btn = $('btnStartAudioTimer');
  btn.style.display = 'none';
  if (!btn._isSpotify) {
    $('dlgAudioPlayer').play().catch(() => {});
  }
  startTimer();
  syncMusic();
});

// Winner reveal event listeners
$('btnWinnerNewRound').addEventListener('click', () => { stopWinnerReveal(); newRound(); });
$('btnWinnerClose').addEventListener('click', () => { stopWinnerReveal(); });

// Image search event listeners
$('btnImgSearchSv').addEventListener('click', () => {
  const q = $('imgSearchInput').value.trim(); if(q) wikimediaSearch(q);
});
$('btnImgSearchEn').addEventListener('click', () => {
  const q = $('imgSearchInput').value.trim(); if(q) wikimediaSearch(q);
});
$('imgSearchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); $('btnImgSearchSv').click(); }
});
$('imgManualUrl').addEventListener('input', () => {
  const url = $('imgManualUrl').value.trim();
  IS.url = url || null;
  $('imgMiniPrev').src = url||''; $('imgMiniPrev').style.display = url?'block':'none';
  $('btnImgConfirm').disabled = !url;
  $('imgSelectedLabel').innerHTML = url ? '<span class="img-badge">✅ URL tillagd</span>' : '';
});
$('btnImgManualUse').addEventListener('click', () => {
  const url = $('imgManualUrl').value.trim(); if(url) applyImgToClue(url);
});
$('btnImgConfirm').addEventListener('click', () => { if(IS.url) applyImgToClue(IS.url); });
$('btnImgRemove').addEventListener('click', () => { IS.url=null; applyImgToClue(''); });
$('btnCloseImgSearch').addEventListener('click', () => $('dlgImgSearch').close());

/* ================================================================
   EVENT LISTENERS
================================================================ */
// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchView(tab.dataset.v));
});

$('btnUnlockAi').addEventListener('click', unlockAiSection);
$('dropZone').addEventListener('click', () => $('fileInput').click());
$('dropZone').addEventListener('dragover', dragOver);
$('dropZone').addEventListener('dragleave', dragLeave);
$('dropZone').addEventListener('drop', dropFile);
document.querySelectorAll('.timer-preset').forEach(button => {
  button.addEventListener('click', () => setTimer(Number(button.dataset.seconds)));
});
$('dlgImg').addEventListener('error', () => {
  $('dlgImgWrap').style.display = 'none';
});

// Game
$('btnClose').addEventListener('click', closeDialog);
$('btnShowAnswer').addEventListener('click', revealAnswer);
$('dlgQ').addEventListener('close', () => { stopTimer(); stopClueAudio(); syncMusic(); });
$('btnNewRoundWinner').addEventListener('click', newRound);

// Instructions / Manual
$('btnHelp').addEventListener('click', () => $('dlgInstructions').showModal());
$('btnInstructions').addEventListener('click', () => $('dlgInstructions').showModal());
$('btnCloseInstr').addEventListener('click', () => $('dlgInstructions').close());
$('btnNewRoundGame').addEventListener('click', newRound);

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === ' ' && $('dlgQ').open) {
    e.preventDefault();
    if (!S.revealed) revealAnswer();
  }
  if (e.key === 'Escape' && $('dlgQ').open) {
    closeDialog();
  }
});

// Editor
$('btnSaveEditor').addEventListener('click', saveEditor);
$('btnSaveJson').addEventListener('click', saveJson);
$('btnLoadJson').addEventListener('change', function() {
  if (this.files[0]) { loadJsonFile(this.files[0]); this.value = ''; }
});
$('btnResetEditor').addEventListener('click', resetEditor);

// Fetch - AI
$('btnGenAI').addEventListener('click', generateAI);
$('btnLoadAI').addEventListener('click', () => loadPending('ai'));
$('btnDiscardAI').addEventListener('click', () => {
  $('aiPreviewWrap').style.display = 'none'; pendingData = null;
});

// Fetch - OTDB
$('btnFetchOtdb').addEventListener('click', fetchOtdb);
$('btnLoadOtdb').addEventListener('click', () => loadPending('otdb'));
$('btnDiscardOtdb').addEventListener('click', () => {
  $('otdbPreviewWrap').style.display = 'none'; pendingData = null;
});

// Settings
$('btnNewRound').addEventListener('click', newRound);
$('teamCount').addEventListener('change', () => {
  S.teamCount = +$('teamCount').value;
  renderTeams(); renderTeamInputs(); renderBoard(); savePrefs();
});
$('themeSelect').addEventListener('change', () => {
  S.theme = $('themeSelect').value; applyTheme(); savePrefs();
});
$('hideScores').addEventListener('change', () => {
  S.hideScores = $('hideScores').checked;
  S.scoresRevealed = false; renderTeams(); savePrefs();
});
$('timerRange').addEventListener('input', updateTimerUI);

// Mode picker
document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    S.mode = card.dataset.mode;
    S.captainIdx = 0;
    syncModePicker();
    renderTeams(); renderBoard(); savePrefs();
  });
});

// Music
$('btnMusic').addEventListener('click', async () => {
  S.musicOn = !S.musicOn; savePrefs();
  if (!S.audioUnlocked && S.musicOn) await unlockAudio();
  else await syncMusic();
});
$('vol').addEventListener('input', applyVol);

// Fullscreen
$('btnFullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  else document.exitFullscreen();
});

// Audio unlock on first tap
document.addEventListener('pointerdown', () => {
  if (!S.audioUnlocked) unlockAudio();
}, {once:true});

// One global outside-click handler for the shared emoji picker.
document.addEventListener('pointerdown', e => {
  const popup = document.querySelector('#emojiPopup[data-runtime="true"]');
  if (popup && !popup.contains(e.target) && !e.target.classList.contains('cat-emoji-trigger')) {
    popup.classList.remove('open');
  }
});

// Unsaved warning
window.addEventListener('beforeunload', e => {
  if (S.dirty) { e.preventDefault(); e.returnValue = ''; }
});

/* ================================================================
   INIT
================================================================ */
loadPrefs();
applyTheme();

// Sync UI with loaded prefs
$('teamCount').value = String(S.teamCount);
$('themeSelect').value = S.theme;
$('hideScores').checked = S.hideScores;
$('timerRange').value = String(S.timerMs / 1000);
$('timerVal').textContent = S.timerMs / 1000;
$('timerLbl').textContent = `⏱ ${S.timerMs/1000} sek`;
syncModePicker();

renderTeamInputs();
renderTeams();
renderBoard();
renderEditor();
populateOtdb();
applyVol();
syncMusic();
