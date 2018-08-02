import test from 'ava';
import { TreeImpl } from '../tree';
import { testTree } from './tree-data';

function createTree() {
  return new TreeImpl({ tree: testTree });
}

test('TreeImpl#getNode', t => {
  const tree = createTree();
  tree.initialize();

  t.is(tree.getNode(2).name, 'foo');
});
