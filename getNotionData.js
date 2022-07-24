import 'dotenv/config';
import fs from 'fs';
import { Client } from '@notionhq/client';

const auth = process.env.NOTION_SECRET_KEY;
const DB_ID = process.env.DB_ID;

export const notion = new Client({ auth });

async function populatePage(pageData) {
	const { results } = await notion.blocks.children.list({ block_id: pageData.id });
	return { ...pageData, page: results };
}

function extract(pageData) {
    const properties = Object.entries(pageData.properties).reduce((props, [key, prop]) => {
        const val = prop[prop.type];
        return {
            ...props,
            [key]: val?.[0]?.plain_text || val?.name || val,
        }
    }, {});

    return {
        ...properties,
        page: pageData.page
    }
}

async function queryDb() {
	const { results } = await notion.databases.query({
		database_id: DB_ID,
	});
	const populated = await Promise.all(results.map(populatePage));
    const extracted = populated.map(extract);
	fs.writeFileSync(
		new URL('./src/data/pages.json', import.meta.url).pathname,
		JSON.stringify(extracted, null, 2)
	);
}

queryDb();