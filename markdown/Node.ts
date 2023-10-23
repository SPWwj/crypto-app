import cheerio from 'cheerio';

/*
 * A TextElement is a simple node that does not need complex processing.
 */
export type TextElement = DomElement;

/*
 * MbNode (MarkBindNode) is an element that can be operated on by cheerio and our own node processing
 * methods. It must have a name (used to identify what kind of node it is), attributes (possibly empty),
 * and children nodes (possibly empty). This type allows us to assert that these attributes exist.
 */
export type MbNode = TextElement & cheerio.Element & {
  name: string,
  attribs: Record<string, any>,
  children: NodeOrText[],
};

/*
 * NodeOrText is used before a node can be casted to either TextElement or MbNode.
 */
export type NodeOrText = TextElement | MbNode;

/**
 * Utility function for converting HTML string to a node or text element.
 */
export function parseHTML(html: string) {
  const node = cheerio.parseHTML(html);
  return node as unknown as NodeOrText[];
}


export interface DomElement {
  attribs?: { [s: string]: string } | undefined;
  children?: DomElement[] | undefined;
  data?: any;
  name?: string | undefined;
  next?: DomElement | undefined;
  parent?: DomElement | undefined;
  prev?: DomElement | undefined;
  type?: string | undefined;
}

export function convertBackToHtml(nodes: NodeOrText[]): string {
  const $ = cheerio.load('<body></body>'); // initialize Cheerio with an empty body tag

  const body = $('body'); // get a reference to the body

  nodes.forEach((node) => {
    // If the node is a MbNode, reconstruct its HTML representation
    if ('name' in node) {
      const element = $(`<${node.name}>`);
      for (const attr in node.attribs) {
        element.attr(attr, node.attribs[attr]);
      }

      if (node.children) { // check if children are defined before recursive call
        element.append(convertBackToHtml(node.children));
      }

      body.append(element); // append the element to the body
    }
    // If the node is a TextElement, simply add its data
    else if ('data' in node) {
      body.append(node.data); // append the data to the body
    }
  });

  return $.html(); // returns the HTML string
}
