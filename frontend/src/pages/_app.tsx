import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { Page } from 'components/page';
import 'components/styles/nprogress.css';
import withData from 'lib/withData';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type ApolloProps = {
  apollo: ApolloClient<NormalizedCacheObject>;
};

type Props = AppProps & ApolloProps;

const MyApp = ({ Component, pageProps, apollo }: Props) => {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  if (typeof Component.getInitialProps === 'function') {
    const pageProps = await Component.getInitialProps(ctx);

    return {
      ...pageProps,
      query: ctx.query,
    };
  }

  return {
    query: ctx.query,
  };
};

export default withData(MyApp);
