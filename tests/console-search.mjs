// Eval for the ⌘K console search. Zero dependencies: node tests/console-search.mjs
// It runs the page's real matcher (the block between `search:start` and
// `search:end` in index.html) against queries a visitor would actually type.
// Exits non-zero if quality drops, so run it after changing any command.
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const block = html.slice(html.indexOf('/* search:start'), html.indexOf('/* search:end */'));
if (!block) throw new Error('search markers not found in index.html');
const rankCommands = new Function(block + '\nreturn rankCommands;')();

const cmdsSrc = html.slice(html.indexOf('const CMDS = ['), html.indexOf('/* search:start'));
const CMDS = [...cmdsSrc.matchAll(/\{ n: '([^']*)',\s*h: '([^']*)',\s*k: '([^']*)'/g)]
    .map(([, n, h, k]) => ({ n, h, k }));
if (CMDS.length < 10) throw new Error(`only parsed ${CMDS.length} commands`);

// [what a visitor types, the command they mean]
const QUERIES = [
    ['resume', 'resume'], ['cv', 'resume'], ['pdf', 'resume'], ['download', 'resume'], ['résumé', 'resume'], ['open resume', 'resume'],
    ['contact', 'contact'], ['hire', 'contact'], ['contact me', 'contact'], ['get in touch', 'contact'],
    ['email', 'email'], ['e-mail', 'email'], ['mail', 'email'], ['email me', 'email'],
    ['phone', 'phone'], ['call', 'phone'],
    ['experience', 'experience'], ['work', 'experience'], ['jobs', 'experience'], ['career', 'experience'],
    ['skills', 'skills'], ['stack', 'skills'], ['tech', 'skills'], ['ai', 'skills'],
    ['education', 'education'], ['certs', 'education'], ['degree', 'education'],
    ['about', 'about'], ['about me', 'about'], ['bio', 'about'],
    ['linkedin', 'linkedin'], ['github', 'github'], ['code', 'source'], ['source code', 'source'],
    ['help', 'help'], ['?', 'help'], ['commands', 'help'],
    ['resme', 'resume'], ['linkdin', 'linkedin'], ['experiance', 'experience'], ['githb', 'github'],
    ['home', 'top'], ['top', 'top'], ['deploy', 'deploy'],
    // Added after a held-out pass (these exposed filler words, split words, employer names)
    ['resumee', 'resume'], ['curriculum vitae', 'resume'], ['download cv', 'resume'], ['contct', 'contact'], ['reach out', 'contact'],
    ['email address', 'email'], ['send email', 'email'], ['phone number', 'phone'], ['work history', 'experience'], ['ushur', 'experience'],
    ['roles', 'experience'], ['skill', 'skills'], ['agentic', 'skills'], ['certifications', 'education'], ['school', 'education'],
    ['linked in', 'linkedin'], ['git hub', 'github'], ['projects', 'github'], ['repo', 'source'], ['start', 'top'],
    ['copy', 'copy email'], ['who are you', 'whoami'],
];
// Things the site doesn't have. Returning anything here is a false positive.
const NO_MATCH = ['twitter', 'instagram', 'blog', 'pricing', 'salary', 'weather'];

let top1 = 0, found = 0;
const misses = [], falsePos = [];
for (const [q, want] of QUERIES) {
    const got = rankCommands(CMDS, q).map(c => c.n);
    if (got[0] === want) top1++; else misses.push(`"${q}" -> ${got.slice(0, 3).join(', ') || 'nothing'} (wanted ${want})`);
    if (got.includes(want)) found++;
}
for (const q of NO_MATCH) {
    const got = rankCommands(CMDS, q).map(c => c.n);
    if (got.length) falsePos.push(`"${q}" -> ${got.join(', ')}`);
}

const pct = n => (100 * n / QUERIES.length).toFixed(0) + '%';
console.log(`commands: ${CMDS.length}   queries: ${QUERIES.length}   no-match probes: ${NO_MATCH.length}`);
console.log(`top-1 accuracy: ${top1}/${QUERIES.length} (${pct(top1)})`);
console.log(`recall:         ${found}/${QUERIES.length} (${pct(found)})`);
console.log(`false positives: ${falsePos.length}/${NO_MATCH.length}`);
if (misses.length) console.log('misses:\n  ' + misses.join('\n  '));
if (falsePos.length) console.log('false positives:\n  ' + falsePos.join('\n  '));

const ok = top1 / QUERIES.length >= 0.95 && found === QUERIES.length && falsePos.length === 0;
console.log(ok ? 'PASS' : 'FAIL (needs top-1 >= 95%, full recall, zero false positives)');
process.exit(ok ? 0 : 1);
