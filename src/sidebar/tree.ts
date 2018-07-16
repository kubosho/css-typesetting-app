import { Maybe } from 'option-t/lib/Maybe/Maybe';
import { Nullable } from 'option-t/lib/Nullable/Nullable';
import { Undefinable } from 'option-t/lib/Undefinable/Undefinable';
import { unwrapOrFromMaybe } from 'option-t/lib/Maybe/unwrapOr';

interface Node {
  name?: string;
  children?: Node[];
}

interface Tree {
  initialize: () => void;
  getNode: (id: number) => Nullable<Node>;
}

type Index = {
  id: number;
  node: Node;
  children?: number[];
  parentId?: number;
};

type Indexes = {
  [id: number]: Index;
};

type Option = {
  tree?: Node;
};

export class TreeImpl implements Tree {
  private count: number;
  private indexes: Indexes;

  private tree: Node;

  constructor(option: Option = {}) {
    this.count = 1;
    this.indexes = {};

    this.tree = unwrapOrFromMaybe(option.tree, { children: [] });
  }

  initialize() {
    this.createIndexes();
  }

  getNode(id: number): Nullable<Node> {
    const index = this.getIndex(id);

    if (!index) {
      return null;
    }

    return index.node;
  }

  private createIndexes() {
    const startCount = this.count;
    const index = { id: startCount, node: this.tree };

    this.indexes[startCount] = index;
    this.count++;

    if (this.tree.children && this.tree.children.length >= 1) {
      this.walk(this.tree.children, index);
    }
  }

  private getIndex(id: number): Undefinable<Index> {
    return this.indexes[id];
  }

  private getIndexes(): Indexes {
    return this.indexes;
  }

  private walk(nodes: Node[], parentNode?: Index) {
    const children: number[] = [];

    nodes.forEach((node: Node) => {
      const index: Index = { id: this.count, node };

      if (!!parentNode) {
        index.parentId = parentNode.id;
      }

      this.indexes[this.count] = index;
      children.push(this.count);
      this.count++;

      if (node.children && node.children.length >= 1) {
        this.walk(node.children, index);
      }
    });

    parentNode.children = children;
  }

  private insert(node: Maybe<Node>, parentId: number, indexId: number): void {
    const parentNode = this.getNode(parentId);
    const parentIndex = this.getIndex(parentId);

    if (!parentNode.children) {
      return;
    }

    const index: Index = { id: this.count, node };
    index.parentId = parentId;

    parentNode.children.splice(indexId, 0, node);
    parentIndex.children.splice(indexId, 0, index.id);
  }
}
