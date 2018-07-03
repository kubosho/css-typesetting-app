import * as React from 'react';
// @ts-ignore
import { default as classNames } from 'classnames';

type Props = {
  className?: string;
};

export class Sidebar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { className } = this.props;

    return <aside className={classNames('sidebar', className)} />;
  }
}
