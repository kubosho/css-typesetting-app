import * as React from 'react';

import { Editor } from './editor/editor';
import { Sidebar } from './sidebar/sidebar';

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Sidebar className="sidebar" />
        <Editor className="editor" />
      </div>
    );
  }
}
