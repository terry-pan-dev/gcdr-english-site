import { Node, mergeAttributes } from '@tiptap/core';

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

export type CalloutType = 'insight' | 'warning' | 'tip';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      /**
       * Set a callout block
       */
      setCallout: (attributes?: { type?: CalloutType }) => ReturnType;
      /**
       * Toggle a callout block
       */
      toggleCallout: (attributes?: { type?: CalloutType }) => ReturnType;
    };
  }
}

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',
  
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
      type: {
        default: 'insight',
        parseHTML: element => element.getAttribute('data-type') || 'insight',
        renderHTML: attributes => {
          return {
            'data-type': attributes.type,
          };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-component="callout"]',
      },
    ];
  },
  
  renderHTML({ node, HTMLAttributes }) {
    const type = node.attrs.type as CalloutType;
    
    const icons: Record<CalloutType, string> = {
      insight: '💡',
      warning: '⚠️',
      tip: '💭',
    };
    
    const icon = icons[type] || icons.insight;
    
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-component': 'callout',
        'class': 'my-6 py-3 px-4 rounded-lg border-l-4',
        'style': 'border-color: #c9a050; background-color: rgba(201, 160, 80, 0.1);'
      }),
      [
        'div',
        { class: 'flex items-start gap-4' },
        [
          'span',
          {
            class: 'text-2xl flex-shrink-0',
            style: 'color: #c9a050;'
          },
          icon
        ],
        [
          'div',
          { class: 'prose prose-stone prose-p:my-0 prose-p:leading-relaxed flex-1' },
          0, // content slot
        ]
      ]
    ];
  },
  
  addCommands() {
    return {
      setCallout: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      toggleCallout: attributes => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes);
      },
    };
  },
});

