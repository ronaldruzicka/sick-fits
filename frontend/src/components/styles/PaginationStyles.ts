import { theme } from 'components/styles/theme';
import styled from 'styled-components';

export const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${theme.colors.lightGray};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: var(--gray);
    pointer-events: none;
  }
`;
