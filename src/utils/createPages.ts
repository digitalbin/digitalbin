import pages from '../../data/pages.json';
import notionBlocksToHtml from './notionBlocksToHtml';

const actualPages = pages.filter(({ page }) => page.length);
const app = document.querySelector('#app');

export default function createPages() {
    actualPages.forEach(({ page, slug }) => {
        const article = document.createElement('article');
        article.classList.add('hidden');
        article.id = slug;
        article.innerHTML = notionBlocksToHtml(page);
        app?.appendChild(article);
    });
}
