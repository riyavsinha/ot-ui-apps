import React from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core';

import { Link, Button, LocusIcon } from '../ot-ui-components';
import { chromosomesWithCumulativeLengths } from '../utils';

const chromosomeDict = chromosomesWithCumulativeLengths.reduce((acc, d) => {
  acc[d.name] = d;
  return acc;
}, {});

const mb = 1000000;

const useStyles = makeStyles({
  button: {
    lineHeight: 1,
    minWidth: '110px',
  },
  buttonBig: {
    fontSize: '1.1rem',
    minWidth: '150px',
    width: '150px',
    height: '40px',
    paddingLeft: '15px',
  },
  icon: {
    fill: 'white',
    width: '20px',
    height: '20px',
    marginTop: '-5px',
    marginBottom: '-5px',
    marginLeft: '5px',
  },
  iconBig: {
    fill: 'white',
    width: '30px',
    height: '30px',
  },
  link: {
    textDecoration: 'none',
  },
});

const LocusLink = ({
  big,
  chromosome,
  position,
  selectedGenes,
  selectedTagVariants,
  selectedIndexVariants,
  selectedStudies,
}: {
  big: boolean;
  chromosome: string;
  position: number;
  selectedGenes: string[];
  selectedTagVariants: string[];
  selectedIndexVariants: string[];
  selectedStudies: string[];
}) => {
  const classes = useStyles();
  if (chromosome === null) return null;
  const chromosomeObj = chromosomeDict[chromosome];
  const start = position > mb ? position - mb : 0;
  const end =
    position <= chromosomeObj.length - mb
      ? position + mb
      : chromosomeObj.length - 1;
  const params = { chromosome, start, end } as Record<string, unknown>;
  if (selectedGenes) {
    params.selectedGenes = selectedGenes;
  }
  if (selectedTagVariants) {
    params.selectedTagVariants = selectedTagVariants;
  }
  if (selectedIndexVariants) {
    params.selectedIndexVariants = selectedIndexVariants;
  }
  if (selectedStudies) {
    params.selectedStudies = selectedStudies;
  }
  return (
    <Link
      to={`/locus?${queryString.stringify(params)}`}
      className={classes.link}
    >
      <Button className={big ? classes.buttonBig : classes.button}>
        Locus Plot
        <LocusIcon className={big ? classes.iconBig : classes.icon} />
      </Button>
    </Link>
  );
};

export default LocusLink;
