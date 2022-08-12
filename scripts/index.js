import 'dotenv/config';
import fs from 'fs';
import cheerio from 'cheerio';
import getNotionData, { notion } from './getNotionData.js';
import notionBlocksToHtml from './notionBlocksToHtml.js';

const pages = await getNotionData();

const templateHtml = fs
    .readFileSync(new URL('../template.html', import.meta.url).pathname)
    .toString();

const $ = cheerio.load(templateHtml);
const screen = $('#app div.screen');

pages.forEach(({ page, ...props }) => {
    const article = $('<article />').append(notionBlocksToHtml(page));
    Object.entries(props).forEach(([key, val]) => {
        article.attr({ [`data-${key}`]: val });
    });
    screen.append(article);
});

const html = $.html();

fs.writeFileSync(new URL('../index.html', import.meta.url).pathname, html);
