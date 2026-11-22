// Generates the images used by README.md (the GitHub profile readme):
// the animated terminal header and one VHS tape spine per project in /content.
// Run with: npm run readme
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import opentype from 'opentype.js';

const root = new URL('..', import.meta.url);
const out = new URL('.github/readme/', root);
mkdirSync(out, { recursive: true });

const INK = '#111827';
const PAPER = '#f9fafb';

/* ---------- header ---------- */
const loadingScreen = readFileSync(new URL('src/components/LoadingScreen.ts', root), 'utf-8');
const letters = [...loadingScreen.matchAll(/<path class="letter" d="([^"]+)"/g)].map((m) => m[1]);
const cursor = loadingScreen.match(/<path class="cursor" d="([^"]+)"/)[1];
const STEP = 0.08;

const header = (color) => `<svg viewBox="-20 -20 1651 343" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="digitalbin: the analogue catalogue">
<style>
path{fill:${color}}
.l{opacity:0;animation:type .01s linear forwards}
.c{animation:blink 1s steps(2,start) infinite}
@keyframes type{to{opacity:1}}
@keyframes blink{to{visibility:hidden}}
@media (prefers-reduced-motion:reduce){.l{animation:none;opacity:1}.c{animation:none}}
</style>
${letters.map((d, i) => `<path class="l" style="animation-delay:${(0.4 + i * STEP).toFixed(2)}s" d="${d}"/>`).join('\n')}
<path class="c" d="${cursor}"/>
</svg>
`;
writeFileSync(new URL('header-light.svg', out), header(INK));
writeFileSync(new URL('header-dark.svg', out), header(PAPER));

/* ---------- tapes ---------- */
const fonts = ['permanentmarker', 'rocksalt', 'waitingforthesunrise'].map((name) => {
    const buf = readFileSync(new URL(`public/fonts/${name}.woff`, root));
    return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
});

const W = 640, H = 76, TAPE_W = 540, STICKER_W = 350, STICKER_H = 46;
// same idea as the pile on the site: every tape sits a bit off from the others
const offsets = [58, 14, 86, 36, 70, 0, 100, 46];

const tape = (name, index) => {
    const x = offsets[index % offsets.length];
    const font = fonts[index % fonts.length];
    const sx = x + (TAPE_W - STICKER_W) / 2, sy = (H - STICKER_H) / 2;

    let size = 30;
    let box = font.getPath(name, 0, 0, size).getBoundingBox();
    const fit = Math.min((STICKER_W - 40) / (box.x2 - box.x1), (STICKER_H - 12) / (box.y2 - box.y1), 1);
    size *= fit;
    box = font.getPath(name, 0, 0, size).getBoundingBox();
    const tx = sx + STICKER_W / 2 - (box.x1 + box.x2) / 2;
    const ty = H / 2 - (box.y1 + box.y2) / 2;
    const text = font.getPath(name, tx, ty, size).toPathData(1);

    const ridges = [18, 30, 42].flatMap((d) => [x + d, x + TAPE_W - d])
        .map((rx) => `<path d="M${rx} 14V${H - 14}" stroke="${PAPER}" stroke-opacity=".35" stroke-width="3"/>`).join('');

    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">
<rect x="${x + 1.5}" y="3" width="${TAPE_W - 3}" height="${H - 6}" rx="5" fill="${INK}" stroke="${PAPER}" stroke-opacity=".5" stroke-width="1.5"/>
${ridges}
<rect x="${sx}" y="${sy}" width="${STICKER_W}" height="${STICKER_H}" fill="#fff"/>
<path d="${text}" fill="${INK}"/>
</svg>
`;
};

const contentDir = new URL('content/', root);
const projects = readdirSync(contentDir).filter((f) => f.endsWith('.md')).sort()
    .map((file) => {
        const raw = readFileSync(new URL(file, contentDir), 'utf-8');
        const meta = Object.fromEntries([...raw.split('---')[1].matchAll(/^(\w+):\s*(.+)$/gm)].map((m) => [m[1], m[2].trim()]));
        const links = [...raw.matchAll(/\]\((https?:[^)]+)\)/g)];
        return { ...meta, slug: file.replace(/^\d+-|\.md$/g, ''), url: links.at(-1)?.[1] };
    })
    .filter((p) => p.label === 'project' && p.url);

projects.forEach((p, i) => writeFileSync(new URL(`tape-${p.slug}.svg`, out), tape(p.name, i)));

console.log('Tapes for README.md:\n');
console.log(projects.map((p) => `  <a href="${p.url}"><img src=".github/readme/tape-${p.slug}.svg" alt="${p.name}" width="480"></a><br>`).join('\n'));
