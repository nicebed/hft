import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ExampleForm } from '@app/widgets/example-form';
import { ComposedApp } from '@app/app/app';

describe('test ui', () => {
  it('must render form', async () => {
    render(<ExampleForm />, { wrapper: () => <ComposedApp /> });
  });
});
