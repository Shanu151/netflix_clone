export const convertHtmlToCustomFormat = (html: string) => {
    // Create a DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Replace <a> tags with the desired format
    doc.querySelectorAll('a').forEach(anchor => {
        const name = anchor.textContent;
        const href = new URL(anchor.href);
        const username = href.pathname.split('/')[2].split('?')[0];

        const replacement = `@@@<${name}>///<${username}>@@@`;
        anchor.replaceWith(replacement);
    });

    // Replace closing </p> tags with <br>
    let result = doc.body.innerHTML.replace(/<\/p>/g, '<br>');
    result = result.replaceAll('<p>', '')

    return result;
}