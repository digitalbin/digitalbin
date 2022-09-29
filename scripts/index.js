import 'dotenv/config';
import fs from 'fs';
import cheerio from 'cheerio';
import getNotionData, { notion } from './getNotionData.js';
import notionBlocksToHtml from './notionBlocksToHtml.js';

const pages = await getNotionData();

let html = fs
    .readFileSync(new URL('../index.html', import.meta.url).pathname)
    .toString();

const $ = cheerio.load(html);
const screen = $('#app div.screen');

const articleElements = pages.map(({ page, ...props }) => {
    const article = $('<article />').append(notionBlocksToHtml(page));
    Object.entries(props).forEach(([key, val]) => {
        article.attr({ [`data-${key}`]: val });
    });
    return article;
});

screen.html(articleElements.join(''));

let minHtml = fs
    .readFileSync(new URL('../minimal.html', import.meta.url).pathname)
    .toString();
const _$ = cheerio.load(minHtml);
_$('body').html(articleElements.join(''));

html = $.html();
minHtml = _$.html();

fs.writeFileSync(new URL('../index.html', import.meta.url).pathname, html);
fs.writeFileSync(new URL('../minimal.html', import.meta.url).pathname, minHtml);
