import test from 'ava';
import { convertToHtml } from '../markdown-to-html-converter';

const markDown = `
## Header 1

Text

* list1
* list2
`;

test('convertToHtml()', t => {
  const html = convertToHtml(markDown);
  t.snapshot(html);
});
