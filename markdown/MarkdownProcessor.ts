import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import attrs from 'markdown-it-attrs';
import uslug from 'uslug';
import emoji from 'markdown-it-emoji';

const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: true
})
  .use(anchor, {
    permalink: anchor.permalink.headerLink({ safariReaderFix: true })
  })
  .use(attrs)
  .use(toc, {
    level: [1, 2, 3],
    slugify: uslug,
    format: function (heading) {
      return heading;
    }
  })
  .use(emoji);

export const processMarkdown = async (markdown: string) => {
  try {

    let transformedMarkdown = md.render(markdown);

    const urlParts = window.location.href.split(/#\/(.+)/);
    const base = urlParts[0];
    const subpath = urlParts[1] ? urlParts[1].split('#')[0] : '';

    // A simple regex-based approach to update links within the generated HTML
    transformedMarkdown = transformedMarkdown.replace(/href="#/g, `href="${base}#/${subpath}#`);
    return transformedMarkdown;
  } catch (e) {
    console.error(e);
    return "";
  }
};