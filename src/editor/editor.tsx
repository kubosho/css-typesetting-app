import * as monaco from 'monaco-editor';
import * as React from 'react';

export class Editor extends React.Component {
  private editorContainerRef: React.RefObject<HTMLDivElement>;
  private editor: monaco.editor.IStandaloneCodeEditor;

  constructor(props: any) {
    super(props);

    this.editorContainerRef = React.createRef();
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainerRef.current);
  }

  componentWillUnmount() {
    this.editor.dispose();
  }

  render() {
    return <div className="editor" ref={this.editorContainerRef} />;
  }
}
