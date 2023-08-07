/* eslint-disable guard-for-in */
import xml2js from 'xml2js';

import { ISSMLParserContract } from '../shared/interfaces';

const parseAttributes = (attributes:any) => {
  const parsedAttributes: Record<string, any> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in attributes) {
    parsedAttributes[key] = attributes[key];
  }
  return parsedAttributes;
};

const parseNode = (node: any): Record<string, any> => {
  if (Array.isArray(node)) {
    return node.map(parseNode);
  }

  if (typeof node === 'object') {
    const parsedNode = {} as Record<string, any>;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in node) {
      if (key === '$') {
        parsedNode.attributes = parseAttributes(node[key]);
      } else {
        parsedNode[key] = parseNode(node[key]);
      }
    }
    return parsedNode;
  }

  return node;
};

const SSMLParser = (): ISSMLParserContract => ({
  parseSSML: async (ssml: string) => {
    const parser = new xml2js.Parser({ explicitArray: true });

    const result = await parser.parseStringPromise(ssml);
    const parsedSSML = parseNode(result.speak);

    return parsedSSML;
  },
});

export default SSMLParser;
