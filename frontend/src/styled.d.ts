import { Theme } from 'components/styles/theme';
import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
