import * as React from 'react';
import * as monaco from 'monaco-editor';
// @ts-ignore
import { default as classNames } from 'classnames';

type Props = {
  className?: string;
};

export class Editor extends React.Component<Props> {
  private editorContainerRef: React.RefObject<HTMLDivElement>;
  private editor: monaco.editor.IStandaloneCodeEditor;

  constructor(props: Props) {
    super(props);

    this.editorContainerRef = React.createRef();
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainerRef.current, {
      language: 'markdown',
      minimap: {
        enabled: false,
      },
    });
  }

  componentWillUnmount() {
    this.editor.dispose();
  }

  render() {
    const { className } = this.props;

    return <div className={classNames('editor', className)} ref={this.editorContainerRef} />;
  }
}
