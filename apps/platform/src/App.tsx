import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, SearchProvider, PrivateRoute } from 'ui';

import SEARCH_QUERY from './components/Search/SearchQuery.gql';
import ShouldAccessPPP from './components/ShouldAccessPPP';
import client from './client';
import theme from './theme';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DiseasePage from './pages/DiseasePage';
import DownloadsPage from './pages/DownloadsPage';
import DrugPage from './pages/DrugPage';
import TargetPage from './pages/TargetPage';
import EvidencePage from './pages/EvidencePage';
import VariantsPage from './pages/VariantsPage';
import APIPage from './pages/APIPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SearchProvider
          searchQuery={SEARCH_QUERY}
          searchPlaceholder="Search for a target, drug, disease, or phenotype..."
        >
          <Router>
            <ShouldAccessPPP />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/downloads" component={DownloadsPage} />
              <Route path="/disease/:efoId" component={DiseasePage} />
              <Route path="/target/:ensgId" component={TargetPage} />
              <Route path="/drug/:chemblId" component={DrugPage} />
              <Route path="/evidence/:ensgId/:efoId" component={EvidencePage} />
              <Route path="/variants" component={VariantsPage} />
              <Route path="/api" component={APIPage} />
              <Route path="/projects">
                <PrivateRoute>
                  <ProjectsPage location="" />
                </PrivateRoute>
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </SearchProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
