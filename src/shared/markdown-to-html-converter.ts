import * as showdown from 'showdown';

function createConverter() {
  return new showdown.Converter();
}

export function convertToHtml(markdown: string): string {
  const converter = createConverter();
  return converter.makeHtml(markdown);
}
