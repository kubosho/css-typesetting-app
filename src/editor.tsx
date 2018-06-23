import * as React from 'react';
import {
  Editor as DraftJsEditor,
  EditorState as DraftJsEditorState,
} from 'draft-js';

type State = {
  editorState: DraftJsEditorState;
};

export class Editor extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      editorState: DraftJsEditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState: any) {
    this.setState({ editorState });
  }

  render() {
    return (
      <DraftJsEditor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}
