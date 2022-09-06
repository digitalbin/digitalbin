const htmlTagMap = {
    heading_1: 'h1',
    heading_2: 'h2',
    heading_3: 'h3',
    paragraph: 'p',
};

const annotationsMap = {
    bold: 'b',
    italic: 'i',
    strikethrough: 's',
    underline: 'u',
    code: 'code',
};

export default function notionBlocksToHtml(blocks) {
    const htmls = blocks.map((block) => {
        const topLevelElement = htmlTagMap[block.type];
        const textContent = block[block.type]?.rich_text?.map(
            ({ plain_text, annotations, href }) => {
                const annotated = Object.entries(annotations)
                    .filter(
                        ([annotation, value]) =>
                            value && annotationsMap[annotation],
                    )
                    .map(([annotation]) => annotationsMap[annotation]);
                const text = href
                    ? `<a href="${href}" target="_blank">${plain_text}</a>`
                    : plain_text;
                return annotated.reduce(
                    (html, elm) => `<${elm}>${html}</${elm}>`,
                    text,
                );
            },
        );
        if (!textContent.length) return null;
        if (topLevelElement) {
            return `<${topLevelElement}>${textContent.join(
                '',
            )}</${topLevelElement}>`;
        }
        return textContent.join('');
    });
    return htmls.join('');
}
