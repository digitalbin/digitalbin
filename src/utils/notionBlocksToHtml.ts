const htmlTagMap: { [key: string]: any } = {
    heading_1: 'h1',
    heading_2: 'h2',
    heading_3: 'h3',
    paragraph: 'p',
};

function getText(textObj: any) {
    return {
        text: textObj?.rich_text?.[0]?.plain_text,
        url: textObj?.rich_text?.[0]?.text?.link?.url,
    };
}

export default function notionBlocksToHtml(blocks: any, asArray = false) {
    const htmls = blocks
        .map((block: { type: string; [key: string]: any }) => {
            const { type } = block;
            const { text, url } = getText(block[type]);
            const htmlTag = htmlTagMap?.[type];
            
            if (!text || !htmlTag) return '';
            const anchor = url && `<a href="${url}" target="_blank">${text}</a>`;
            
            return `<${htmlTag}>${anchor || text}</${htmlTag}>`;
        });
        if (asArray) return htmls;
        return htmls.join('');
}
