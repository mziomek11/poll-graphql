import React from 'react';
import { render } from '@testing-library/react';

import Loadable from './Loadable';

describe('LoadableButton componenet', () => {
  test('render children', () => {
    const comp = (
      <Loadable loading={false}>
        <p data-testid="par" />
      </Loadable>
    );
    const { getByTestId } = render(comp);

    const paragraph = getByTestId('par');
    expect(paragraph).toBeDefined();
  });

  test('render progress when loading', () => {
    const comp = <Loadable loading={true} />;
    const { container } = render(comp);

    expect(
      container.querySelector('.MuiCircularProgress-root')?.innerHTML
    ).toBeDefined();
  });

  test('NOT render progress when NOT loading', () => {
    const comp = <Loadable loading={false} />;
    const { container } = render(comp);

    expect(
      container.querySelector('.MuiCircularProgress-root')?.innerHTML
    ).not.toBeDefined();
  });
});
