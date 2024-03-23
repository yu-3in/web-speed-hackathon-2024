import { useId } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../../styles/variables';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

import { useFooterContent } from './useFooterContent';

const _Content = styled.section`
  white-space: pre-line;
`;

const OverviewDialog: React.FC = () => {
  const { data } = useFooterContent({ type: 'overview' });
  const { content } = data;
  const overviewDialogA11yId = useId();

  return (
    <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
        Cyber TOONとは
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {content}
      </Text>
    </_Content>
  );
};

export default OverviewDialog;
