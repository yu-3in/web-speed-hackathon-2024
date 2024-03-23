import { useId } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../../styles/variables';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

import { useFooterContent } from './useFooterContent';

const _Content = styled.section`
  white-space: pre-line;
`;

const CompanyDialog: React.FC = () => {
  const { data } = useFooterContent({ type: 'company' });
  const { content } = data;
  const companyDialogA11yId = useId();

  return (
    <_Content aria-labelledby={companyDialogA11yId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
        運営会社
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {content}
      </Text>
    </_Content>
  );
};

export default CompanyDialog;
