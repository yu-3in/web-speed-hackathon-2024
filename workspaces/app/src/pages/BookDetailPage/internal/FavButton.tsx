import styled from 'styled-components';

import { Color, Space } from '../../../foundation/styles/variables';

const _Button = styled.button<{ $outlined: boolean }>`
  border-radius: 50%;
  background-color: ${({ $outlined }) => ($outlined ? `${Color.MONO_0}` : `${Color.SubFavorite}`)};
  border: none;
  padding: ${Space * 1}px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  enabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & JSX.IntrinsicElements['button'];

export const FavButton: React.FC<Props> = ({ enabled, onClick }) => {
  return (
    <_Button
      $outlined={!enabled}
      aria-label={enabled ? 'お気に入りを解除する' : 'お気に入りに追加する'}
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        className="svg-icon"
        data-testid="FavoriteBorderIcon"
        focusable="false"
        style={{
          color: enabled ? Color.Favorite : Color.MONO_40,
          height: '24px',
          width: '24px',
        }}
        viewBox="0 0 24 24"
      >
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path>
      </svg>
    </_Button>
  );
};
