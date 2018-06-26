import { Editor as DraftJsEditor, EditorState as DraftJsEditorState } from 'draft-js';
import * as React from 'react';
import { prismDecorator } from './prismDecorator';

type State = {
  editorState: DraftJsEditorState;
};

export class Editor extends React.Component {
  public state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      editorState: DraftJsEditorState.createEmpty(prismDecorator),
    };

    this.onChange = this.onChange.bind(this);
  }

  private onChange(editorState: any) {
    this.setState({ editorState });
  }

  public render() {
    return <DraftJsEditor editorState={this.state.editorState} onChange={this.onChange} />;
  }
}
