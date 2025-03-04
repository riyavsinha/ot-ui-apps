import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import { Header as HeaderBase, ExternalLink, XRefLinks } from 'ui';

const xrefsToDisplay = {
  mondo: { label: 'MONDO', urlStem: 'http://purl.obolibrary.org/obo/MONDO_' },
  mesh: { label: 'MeSH', urlStem: 'https://identifiers.org/mesh:' },
  ncit: { label: 'NCIt', urlStem: 'https://identifiers.org/ncit:' },
  meddra: { label: 'MedDRA', urlStem: 'https://identifiers.org/meddra:' },
  umls: { label: 'UMLS', urlStem: 'https://identifiers.org/umls:' },
  orphanet: { label: 'Orphanet', urlStem: 'https://identifiers.org/orphanet:' },
  icd10: { label: 'ICD10', urlStem: 'https://identifiers.org/icd:' },
  omim: { label: 'OMIM', urlStem: 'https://www.omim.org/entry/' },
};

function processXRefs(dbXRefs) {
  const xrefs = {};
  for (let i = 0; i < dbXRefs.length; i++) {
    const [label, id] = dbXRefs[i].split(':');
    const source = label.toLowerCase();

    if (xrefsToDisplay[source]) {
      if (xrefs[source]) {
        xrefs[source].ids.add(id);
      } else {
        const xrefObject = {
          label: xrefsToDisplay[source].label,
          urlStem: xrefsToDisplay[source].urlStem,
          ids: new Set(),
        };
        xrefObject.ids.add(id);
        xrefs[source] = xrefObject;
      }
    }
  }
  return xrefs;
}

function Header({ loading, efoId, name, dbXRefs = [] }) {
  const efoUrl = `https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=${efoId}`;
  const xrefs = processXRefs(dbXRefs);

  return (
    <HeaderBase
      loading={loading}
      title={name || 'Missing name'}
      Icon={faStethoscope}
      externalLinks={
        <>
          {efoId.startsWith('OTAR') ? (
            `EFO: ${efoId}`
          ) : (
            <ExternalLink title="EFO" id={efoId} url={efoUrl} />
          )}
          {Object.keys(xrefs).map(xref => {
            const { label, urlStem, ids } = xrefs[xref];
            return (
              <XRefLinks
                key={xref}
                label={label}
                urlStem={urlStem}
                ids={Array.from(ids)}
                limit="3"
              />
            );
          })}
        </>
      }
    />
  );
}

export default Header;
