import * as React from 'react';

import { Editor } from '../editor/editor';
import { Sidebar } from '../sidebar/sidebar';

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Editor />
      </React.Fragment>
    );
  }
}
