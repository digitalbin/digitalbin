import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import { readdirSync, readFileSync, copyFileSync } from 'fs';
import { marked } from 'marked';

const contentDir = resolve(__dirname, 'content');

const escapeAttr = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/**
 * Each file in /content becomes one <article> (= one VHS tape).
 * Files are ordered by filename, the frontmatter (`key: value` lines)
 * ends up as data-attributes and the body is regular markdown.
 */
function renderContent() {
    return readdirSync(contentDir)
        .filter((file) => file.endsWith('.md'))
        .sort()
        .map((file, order) => {
            const raw = readFileSync(resolve(contentDir, file), 'utf-8');
            const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
            if (!match) throw new Error(`${file} is missing frontmatter`);
            const [, frontmatter, body] = match;

            const attrs = frontmatter
                .split(/\r?\n/)
                .filter((line) => line.trim())
                .map((line) => {
                    const [key, ...rest] = line.split(':');
                    return `data-${key.trim()}="${escapeAttr(rest.join(':').trim())}"`;
                });
            if (!attrs.some((attr) => attr.startsWith('data-name=')))
                throw new Error(`${file} needs a "name" in its frontmatter`);

            const html = (marked.parse(body) as string)
                .replace(/<a href="http/g, '<a target="_blank" rel="noopener" href="http')
                // TypeIt walks childNodes, so no whitespace between blocks
                .replace(/>\s*\n\s*</g, '><')
                // marked wraps custom elements (<contact-form>) in a paragraph
                .replace(/<p>(<([a-z]+-[a-z-]+)[^>]*><\/\2>)<\/p>/g, '$1')
                .trim();

            return `<article ${attrs.join(' ')} data-order="${order}">${html}</article>`;
        })
        .join('');
}

function markdownContent(): Plugin {
    return {
        name: 'markdown-content',
        transformIndexHtml: (html) => html.replace('<!--content-->', renderContent()),
        configureServer(server) {
            server.watcher.add(contentDir);
            server.watcher.on('all', (_event, file) => {
                if (file.startsWith(contentDir)) server.ws.send({ type: 'full-reload' });
            });
        },
        // GitHub Pages serves 404.html for unknown paths, which lets
        // deep links like /viaplay boot the app and route client side.
        closeBundle() {
            const dist = resolve(__dirname, 'dist');
            copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
        },
    };
}

export default defineConfig({
    plugins: [markdownContent()],
    assetsInclude: ['**/*.glb'],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                minimal: resolve(__dirname, 'minimal.html'),
            },
        },
    },
});
