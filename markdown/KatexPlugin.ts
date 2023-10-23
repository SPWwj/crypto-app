import katex from 'katex';

const katexPlugin = {
  name: 'katexPlugin',
  initialize: async () => {
    // You can place any initialization logic here if needed.
  },
  process: (content: string) => {
    const regex = /\$\$([\s\S]*?)\$\$/g; // This pattern matches content between $$...$$

    return content.replace(regex, (match, equation) => {
      try {
        return katex.renderToString(equation, {
          throwOnError: false
        });
      } catch (e) {
        console.error(e);
        return match; // Return the original match if an error occurs
      }
    });

  }
};

export default katexPlugin;
