import React from 'react';
import {Router} from 'react-router-dom';
import ReactRouterLink from './components/Link';
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {history} from './helpers';
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './routes/routes';
import theme from './config/theme';

/**
 * The main endpoint of application contains all routes, settings for redux and Polaris
 *
 * @return {React.FunctionComponent}
 * @constructor
 */
export default function App() {
  return (
    <AppProvider
      i18n={translations}
      theme={theme}
      linkComponent={ReactRouterLink}
    >
      <Router history={history}>
        <AppLayout>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}
