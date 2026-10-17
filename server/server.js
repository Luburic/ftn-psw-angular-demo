// Podaci žive u memoriji. Svako pokretanje ih vraća na početne.
const http = require('node:http');

const PORT = 3000;
// Veštačko kašnjenje, da bi se videlo stanje učitavanja.
const DELAY_MS = 500;

const quests = [
  { id: '1', title: 'Popij 8 čaša vode', goal: 8, progress: 3, xp: 50, requiredLevel: 1 },
  { id: '2', title: 'Prošetaj 5 km', goal: 5, progress: 4, xp: 100, requiredLevel: 1 },
  { id: '3', title: 'Pročitaj 3 poglavlja', goal: 3, progress: 0, xp: 50, requiredLevel: 1 },
  { id: '4', title: 'Nauči 5 novih reči', goal: 5, progress: 0, xp: 100, requiredLevel: 2 },
];

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function playerLevel() {
  const xp = quests.filter((q) => q.progress >= q.goal).reduce((sum, q) => sum + q.xp, 0);
  return Math.floor(xp / 100) + 1;
}

function send(res, status, body) {
  setTimeout(() => {
    res.writeHead(status, { 'Content-Type': 'application/json', ...CORS });
    res.end(JSON.stringify(body));
  }, DELAY_MS);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(JSON.parse(data)));
  });
}

async function handle(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  // '/api/quests/2/step' -> ['api', 'quests', '2', 'step']
  const [api, resource, id, action] = req.url.split('/').filter(Boolean);
  if (api !== 'api' || resource !== 'quests') {
    return send(res, 404, { message: 'Nepoznata adresa.' });
  }

  // GET /api/quests
  if (req.method === 'GET' && !id) {
    return send(res, 200, quests);
  }

  // POST /api/quests  { title, goal }
  if (req.method === 'POST' && !id) {
    const { title, goal } = await readBody(req);
    if (!title || !(goal >= 1)) {
      return send(res, 400, { message: 'Naziv i cilj su obavezni.' });
    }
    if (quests.some((q) => q.title === title)) {
      return send(res, 400, { message: 'Misija sa tim nazivom već postoji.' });
    }
    const quest = { id: String(quests.length + 1), title, goal, progress: 0, xp: 50, requiredLevel: 1 };
    quests.push(quest);
    return send(res, 201, quest);
  }

  const quest = quests.find((q) => q.id === id);
  if (!quest) {
    return send(res, 404, { message: 'Misija ne postoji.' });
  }

  // GET /api/quests/:id
  if (req.method === 'GET' && !action) {
    return send(res, 200, quest);
  }

  // POST /api/quests/:id/step
  if (req.method === 'POST' && action === 'step') {
    if (quest.progress >= quest.goal) {
      return send(res, 400, { message: 'Misija je već završena.' });
    }
    if (playerLevel() < quest.requiredLevel) {
      return send(res, 400, { message: `Misija se otključava na nivou ${quest.requiredLevel}.` });
    }
    quest.progress += 1;
    return send(res, 200, quest);
  }

  send(res, 404, { message: 'Nepoznata adresa.' });
}

http.createServer(handle).listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
