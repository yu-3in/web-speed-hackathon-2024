import styled from 'styled-components';

import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled.div`
  width: calc(100% + ${Space * 4}px);
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  margin-top: -${Space * 2}px;
  position: relative;
`;

const _SearchLink = styled(Link)`
  position: absolute;
  right: ${Space * 1}px;
  top: 0;
  padding: ${Space * 1}px ${Space * 2}px;
  border: 2px solid ${Color.MONO_A};
  border-radius: ${Radius.X_LARGE};
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
`;

const _ImageWrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  max-height: 576px;
`;

export const CoverSection: React.FC = () => {
  return (
    <_Wrapper>
      <_ImageWrapper>
        <_Image
          alt="Cyber TOON"
          sizes="(max-width: 1024px) 100vw, 1024px"
          src="/assets/hero-1024.webp"
          srcSet={[
            '/assets/hero-256.webp 256w',
            '/assets/hero-384.webp 384w',
            '/assets/hero-512.webp 512w',
            '/assets/hero-768.webp 768w',
            '/assets/hero-1024.webp 1024w',
          ].join(',')}
        />
      </_ImageWrapper>
      <_SearchLink to="/search">
        <svg
          aria-hidden="true"
          className="svg-icon"
          data-testid="SearchIcon"
          focusable="false"
          style={{ color: Color.MONO_A, height: '24px', width: '24px' }}
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
        </svg>
        <Text color={Color.MONO_A} typography={Typography.NORMAL16}>
          検索
        </Text>
      </_SearchLink>
    </_Wrapper>
  );
};
