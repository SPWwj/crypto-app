import katexPlugin from "./KatexPlugin";
import listPlugin from "./ListPlugin";
import mermaidPlugin from "./MermaidPlugin";
function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
const processingPipeline = [
  mermaidPlugin,
  katexPlugin,
  listPlugin,
];

export const processMarkdownContent = async (markdown: string, processMarkdown: (content: string) => Promise<string>) => {
  let result = markdown;
  result = await processMarkdown(result);

  for (const processFunction of processingPipeline) {
    
    await processFunction.initialize();
    result = await processFunction.process(result, decodeHtml);
  }

  return result;
};
