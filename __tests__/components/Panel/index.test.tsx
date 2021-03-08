// eslint-disable-next-line no-unused-vars
import React, { FC } from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Panel from '../../../src/components/Panel';

interface IDedecpProps {
  datetime: number;
}

const Dedecp: FC<IDedecpProps> = ({ datetime }) => (
  <p>
    <span>{datetime}</span>
    dede
  </p>
);
Date.now = jest.fn(() => 1614773272790);

describe('UI快照-panel组件', () => {
  test('renders correctly', () => {
    const wrapper = render(
      <Panel title="dedede">
        <Dedecp datetime={Date.now()} />
      </Panel>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
