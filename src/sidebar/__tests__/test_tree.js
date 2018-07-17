import test from 'ava';
import { TreeImpl } from '../../../build/sidebar/tree';
import { testTree } from './tree-data';

function createTree() {
  return new TreeImpl({ tree: testTree });
}

test('TreeImpl: snapshot', t => {
  const tree = createTree();
  tree.initialize();

  t.snapshot(tree.getIndexes());
});

test('TreeImpl#getIndex', t => {
  const tree = createTree();
  tree.initialize();

  t.is(tree.getIndex(3).node.name, 'foo_dir');
});

test('TreeImpl#getNode', t => {
  const tree = createTree();
  tree.initialize();

  t.is(tree.getNode(2).name, 'foo');
});
