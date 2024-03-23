import styled from 'styled-components';

import { Color } from '../styles/variables';

const _Wrapper = styled.div`
  width: 100%;
  background-color: ${Color.MONO_30};
  height: 1px;
`;

export const Separator: React.FC = () => {
  return <_Wrapper />;
};
