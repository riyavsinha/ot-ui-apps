import { Suspense, lazy } from 'react';
import { LoadingBackdrop, BasePage } from 'ui';

const VariantsPage = lazy(() => import('./VariantsPage'));

function VariantsWrapper({ location }) {
  return (
    <BasePage
      title="Variant definitions"
      description="Variant definitions, including Sequence Ontology (SO) consequence terms, descriptions, and accession IDs"
      location={location}
    >
      <Suspense fallback={<LoadingBackdrop />}>
        <VariantsPage />
      </Suspense>
    </BasePage>
  );
}

export default VariantsWrapper;
