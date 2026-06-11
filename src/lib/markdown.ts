import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

// Import highlight.js styles (this would typically be in globals.css or component)
// but we'll handle it via injecting into the preview iframe or container.

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

export const renderMarkdown = (content: string) => {
  return md.render(content);
};
