import React from 'react';
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import { html as html_beautify } from 'js-beautify';
import 'prismjs/themes/prism.css';  // Choose the theme you like
import { Row, Col } from 'antd';

const md = new MarkdownIt();
const addIdsToMarkdownHeaders = (markdown: string): string => {
  return markdown.replace(
    /^(#{1,6}) (.*$)/gim,
    (match, p1, p2) => {
      const id = p2.replace(/ /g, "-").toLowerCase();
      return `${p1} {#${id}} ${p2}`;
    }
  );
};

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {


  let renderedMarkdown = md.render(markdown);

  const beautifiedHTML = html_beautify(renderedMarkdown, { indent_size: 2 });
  
  const highlightedHTML = Prism.highlight(beautifiedHTML, Prism.languages.markup, 'markup');

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
        </Col>
        <Col span={12}>
          <pre className="language-markup"><code dangerouslySetInnerHTML={{ __html: highlightedHTML }} /></pre>
        </Col>
      </Row>
    </div>
  );
};

export default MarkdownRenderer;
