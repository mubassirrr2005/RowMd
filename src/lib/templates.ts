export type TemplateType = "github" | "docs" | "resume" | "ebook";

export const templates = {
  github: {
    name: "GitHub README",
    styles: `
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.5; color: #1f2328; padding: 40px; }
      h1, h2, h3 { border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; margin-top: 24px; margin-bottom: 16px; font-weight: 600; }
      code { background-color: rgba(175,184,193,0.2); padding: 0.2em 0.4em; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace; font-size: 85%; }
      pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
      pre code { background-color: transparent; padding: 0; }
      blockquote { border-left: 0.25em solid #d0d7de; color: #636c76; padding: 0 1em; margin: 0; }
      table { border-collapse: collapse; width: 100%; margin: 16px 0; }
      table th, table td { border: 1px solid #d0d7de; padding: 6px 13px; }
      table tr:nth-child(2n) { background-color: #f6f8fa; }
    `
  },
  docs: {
    name: "Technical Documentation",
    styles: `
      body { font-family: "Inter", sans-serif; line-height: 1.6; color: #334155; padding: 60px; }
      h1 { color: #0f172a; font-size: 2.5em; margin-bottom: 0.5em; }
      h2 { color: #1e293b; font-size: 1.8em; margin-top: 1.5em; border-left: 4px solid #3b82f6; padding-left: 0.5em; }
      pre { background-color: #1e293b; color: #f8fafc; padding: 1.5em; border-radius: 0.75rem; }
      .hljs-keyword { color: #93c5fd; }
      .hljs-string { color: #86efac; }
    `
  },
  resume: {
    name: "Resume Template",
    styles: `
      body { font-family: "Georgia", serif; line-height: 1.4; color: #000; padding: 50px; }
      h1 { text-align: center; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #000; padding-bottom: 10px; }
      h2 { font-size: 1.2em; border-bottom: 1px solid #ccc; margin-top: 1.5em; }
      ul { padding-left: 20px; }
    `
  },
  ebook: {
    name: "Ebook Template",
    styles: `
      body { font-family: "Merriweather", serif; line-height: 1.8; color: #2d3748; padding: 80px; font-size: 18px; }
      h1 { font-size: 3em; text-align: center; margin-bottom: 2em; page-break-after: always; display: flex; align-items: center; justify-content: center; height: 80vh; }
      h2 { page-break-before: always; font-size: 2em; color: #4a5568; }
    `
  }
};

export const getTemplateHtml = (content: string, templateType: TemplateType = "github", title: string = "Document") => {
  const template = templates[templateType] || templates.github;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          ${template.styles}
          @media print {
            body { padding: 0; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};
