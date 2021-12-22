import { theme } from 'components/styles/theme';
import styled from 'styled-components';

export const CloseButton = styled.button`
  background: ${theme.colors.black};
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;
