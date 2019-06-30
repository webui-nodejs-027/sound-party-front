import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  popper: {
    zIndex: 2000
  }
}));

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <TextField
        placeholder="Search"
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput
          },
          disableUnderline: true
        }}
        {...other}
      />
    </div>
  );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 400 : 630 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
};

const getSuggestionValue = suggestion => suggestion.name;

function SearchInput(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');
  const [stateSuggestions, setSuggestions] = useState([]);

  const handleSuggestionsFetchRequested = async ({ value }) => {
    const response = await fetch(
      `http://localhost:3001/api/songs?searchSong=${value}&limit=5`
    );
    const result = await response.json();
    setSuggestions(result.data);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && event.target.value) {
      props.history.push({
        pathname: '/main/songs',
        state: {
          searchBy: 'songName',
          value: event.target.value
        }
      });
    }
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        value,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        inputRef: node => {
          setAnchorEl(node);
        }
      }}
      theme={{
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Popper
          className={classes.popper}
          anchorEl={anchorEl}
          open={Boolean(options.children)}
        >
          <Paper
            square
            elevation={3}
            {...options.containerProps}
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
          >
            {options.children}
          </Paper>
        </Popper>
      )}
    />
  );
}

export default withRouter(SearchInput);
