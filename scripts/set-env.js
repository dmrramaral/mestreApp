/**
 * set-env.js
 * Gera os arquivos de environment do Angular a partir de variáveis de ambiente.
 * Nunca armazene segredos nos arquivos de environment — use o arquivo .env (git-ignorado).
 *
 * Uso:  node scripts/set-env.js
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 1. Carrega .env manualmente (sem dependência extra)
// ---------------------------------------------------------------------------
function loadDotEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  Arquivo .env não encontrado. Copie .env.example para .env e preencha os valores.');
    return;
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key   = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

// ---------------------------------------------------------------------------
// 2. Lê as variáveis (com fallbacks seguros — nunca hardcode segredos aqui)
// ---------------------------------------------------------------------------
const googleClientId  = process.env.GOOGLE_CLIENT_ID   || '';
const backendUrlDev   = process.env.BACKEND_URL_DEV    || 'http://localhost:3333';
const backendUrlProd  = process.env.BACKEND_URL_PROD   || 'https://mestre-app-backend.vercel.app';

if (!googleClientId) {
  console.warn('⚠️  GOOGLE_CLIENT_ID não definido. O login com Google não funcionará.');
}

// ---------------------------------------------------------------------------
// 3. Template de arquivo de environment
// ---------------------------------------------------------------------------
function renderEnv(production, backendSyncUrl, clientId) {
  return (
    `// GERADO AUTOMATICAMENTE por scripts/set-env.js\n` +
    `// Não edite manualmente — defina as variáveis no arquivo .env\n` +
    `export const environment = {\n` +
    `  production: ${production},\n` +
    `  backendSyncUrl: '${backendSyncUrl}',\n` +
    `  googleClientId: '${clientId}'\n` +
    `};\n`
  );
}

// ---------------------------------------------------------------------------
// 4. Escreve os três arquivos de environment
// ---------------------------------------------------------------------------
const envDir = path.join(__dirname, '..', 'src', 'environments');

const files = {
  'environment.ts':             renderEnv(false, backendUrlDev,  googleClientId),
  'environment.development.ts': renderEnv(false, backendUrlDev,  googleClientId),
  'environment.production.ts':  renderEnv(true,  backendUrlProd, googleClientId),
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(envDir, filename), content, 'utf-8');
}

console.log('✅ Arquivos de environment gerados com sucesso.');
