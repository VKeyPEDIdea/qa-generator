import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  it('should render with passed text', () => {
    const title = 'Нажми меня!';
    const { getByText } = render(<Button title={title} />);
    const buttonElement = getByText(title);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call "onClick" function when click', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <Button title="Тестовая кнопка" onClick={onClickMock} />,
    );
    const buttonElement = getByText('Тестовая кнопка');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should render correctly', () => {
    const { container } = render(<Button title="Нажми меня!" />);
    expect(container).toMatchSnapshot();
  });
});
