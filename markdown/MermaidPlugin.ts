import mermaid from 'mermaid';

const mermaidPlugin = {
  name: 'mermaidPlugin',
  initialize: async (options = { startOnLoad: true }) => {
    mermaid.initialize(options);
  },
  process: async (content: string, decodeHtml: (html: string) => string) => {
    const mermaidCodeBlocks = content.match(/<code class="language-mermaid">([\s\S]*?)<\/code>/g);
    if (!mermaidCodeBlocks) return content;

    for (const block of mermaidCodeBlocks) {
      const mermaidCodeMatch = block.match(/<code class="language-mermaid">([\s\S]*?)<\/code>/);
      if (mermaidCodeMatch && mermaidCodeMatch[1]) {
        let mermaidCode = decodeHtml(mermaidCodeMatch[1]);
        try {
          const svg = await mermaid.render('graphDiv', mermaidCode.trim());
          content = content.replace(block, svg.svg);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return content;
  }
};

export default mermaidPlugin;
