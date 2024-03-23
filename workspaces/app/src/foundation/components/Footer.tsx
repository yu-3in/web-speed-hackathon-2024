import { useSetAtom } from 'jotai';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';

const TermDialog = React.lazy(() => import('./internal/TermDialog'));
const ContactDialog = React.lazy(() => import('./internal/ContactDialog'));
const QuestionDialog = React.lazy(() => import('./internal/QuestionDialog'));
const CompanyDialog = React.lazy(() => import('./internal/CompanyDialog'));
const OverviewDialog = React.lazy(() => import('./internal/OverviewDialog'));

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = useCallback(() => {
    updateDialogContent(<TermDialog />);
  }, [updateDialogContent]);

  const handleRequestToContactDialogOpen = useCallback(() => {
    updateDialogContent(<ContactDialog />);
  }, [updateDialogContent]);

  const handleRequestToQuestionDialogOpen = useCallback(() => {
    updateDialogContent(<QuestionDialog />);
  }, [updateDialogContent]);

  const handleRequestToCompanyDialogOpen = useCallback(() => {
    updateDialogContent(<CompanyDialog />);
  }, [updateDialogContent]);

  const handleRequestToOverviewDialogOpen = useCallback(() => {
    updateDialogContent(<OverviewDialog />);
  }, [updateDialogContent]);

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" loading="lazy" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
