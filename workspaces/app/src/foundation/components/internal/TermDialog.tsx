import { useId } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../../styles/variables';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

import { useFooterContent } from './useFooterContent';

const _Content = styled.section`
  white-space: pre-line;
`;

const TermDialog: React.FC = () => {
  const { data } = useFooterContent({ type: 'term' });
  const { content } = data;
  const termDialogA11yId = useId();

  return (
    <_Content aria-labelledby={termDialogA11yId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
        利用規約
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {content}
      </Text>
    </_Content>
  );
};

export default TermDialog;
