import { Node, mergeAttributes } from '@tiptap/core';

export interface QuoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    quote: {
      /**
       * Set a quote block
       */
      setQuote: (attributes?: { author?: string }) => ReturnType;
      /**
       * Toggle a quote block
       */
      toggleQuote: (attributes?: { author?: string }) => ReturnType;
    };
  }
}

export const Quote = Node.create<QuoteOptions>({
  name: 'quote',
  
  group: 'block',
  
  content: 'inline*',
  
  defining: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  
  addAttributes() {
    return {
      author: {
        default: null,
        parseHTML: element => element.getAttribute('data-author'),
        renderHTML: attributes => {
          if (!attributes.author) {
            return {};
          }
          return {
            'data-author': attributes.author,
          };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-component="quote"]',
      },
    ];
  },
  
  renderHTML({ node, HTMLAttributes }) {
    const author = node.attrs.author;
    
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-component': 'quote',
        'class': 'my-8 py-4 px-6 rounded-lg border-l-4 not-italic',
        'style': 'border-color: #c9a050; background-color: rgba(201, 160, 80, 0.04);'
      }),
      [
        'div',
        {},
        [
          'p',
          {
            class: 'text-xl leading-relaxed italic mb-0',
            style: 'color: #1c1917;'
          },
          0, // content slot
        ],
        ...(author ? [
          [
            'cite',
            {
              class: 'block mt-4 text-sm not-italic font-medium',
              style: 'color: #c9a050;'
            },
            `— ${author}`
          ]
        ] : [])
      ]
    ];
  },
  
  addCommands() {
    return {
      setQuote: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      toggleQuote: attributes => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes);
      },
    };
  },
});

