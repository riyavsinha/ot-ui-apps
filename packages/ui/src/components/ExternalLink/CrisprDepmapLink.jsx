import HelpIcon from '@mui/icons-material/Help';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';

import Link from '../Link';

const useStyles = makeStyles(theme => ({
  helpIcon: {
    fontSize: '0.875rem !important',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

function CrisprDepmapLink({ id }) {
  const classes = useStyles();

  if (!id) return null;

  return (
    <span>
      Project Score
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        title="CRISPR-Cas9 cancer cell line dependency data from Project Score"
        placement="top"
      >
        <sup>
          <HelpIcon className={classes.helpIcon} />
        </sup>
      </Tooltip>
      :{' '}
      <Link external to={`https://score.depmap.sanger.ac.uk/gene/${id}`}>
        {id}
      </Link>
    </span>
  );
}

export default CrisprDepmapLink;
