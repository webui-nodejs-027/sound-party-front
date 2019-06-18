import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  MenuItem,
  TextField,
  CssBaseline,
  Grid,
  Button,
  Typography,
  Container,
  Select,
  OutlinedInput,
  InputLabel,
  FormControl
} from '@material-ui/core';
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import * as moment from 'moment';
import MomentUtils from '@date-io/moment';
const mailCheck = 'http://localhost:3001/api/users/reg/mailcheck';
const addUsersData = 'http://localhost:3001/api/users/reg/adduser';
const sendEmailConfirm='http://localhost:3001/api/users/reg/sendconfirm';
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SpecialFields = (props) => {
  const [gender, setGender] = useState('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [selectedDate, handleDateChange] = useState(null);
  const inputLabel = React.useRef(null);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const errorBirthday = Boolean(props.errors.birthday);
  const errorGender = Boolean(props.errors.gender);
  return (
    <>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            autoOk
            fullWidth
            required
            disableFuture
            inputVariant='outlined'
            label='birthday'
            name='birthday'
            format='DD/MM/YYYY'
            error={ errorBirthday }
            value={ selectedDate }
            onChange={ date => {
              handleDateChange(date);
              props.changeValue({ name: 'birthday', value: moment(date).format('YYYY-MM-DD') });
            } }
          />
        </MuiPickersUtilsProvider>
        { errorBirthday ? <p>{ props.errors.birthday }</p> : null }
      </Grid>
      <Grid item xs={12}>
        <FormControl variant='outlined' fullWidth >
          <InputLabel htmlFor='gender' ref={inputLabel}>
            gender *
          </InputLabel>
          <Select
            id='gender'
            value={ gender }
            onChange={ e => {
              props.changeValue({ name: e.target.name, value: e.target.value });
              setGender(e.target.value)
            } }
            error={ errorGender }
            input={ <OutlinedInput name='gender' id='gender' labelWidth={labelWidth} /> }
          >
            <MenuItem value='male'>male</MenuItem>
            <MenuItem value='female'>female</MenuItem>
          </Select>
        </FormControl>
        { errorGender ? <p>{ props.errors.gender }</p> : null }
      </Grid>
    </>
  )
};

const Fields = (props) => {
  const stage0 = ['email', 'password', 'passwordConfirm'];
  const stage1 = ['firstName', 'lastName', 'socialLink'];
  const fieldsForStage = props.stage === 0 ? stage0 : stage1;
  const splitName = (string) => {
    const strArr = string.split('');
    return strArr.reduce((acc, el) => {
      return el === el.toUpperCase() ? acc + ` ${el.toLowerCase()}` : acc + el;
    }, '')
  };
  const fields = fieldsForStage.map(el => {
    const err = Boolean(props.errors[el]);
    return <Grid item xs={ 12 } key={ el }>
      <TextField
        variant='outlined'
        type={ el === 'password' || el === 'passwordConfirm' ? 'password' : null }
        required
        fullWidth
        id={ el }
        name={ el }
        label={ splitName(el) }
        error={ err }
        onChange={ e => props.changeValue({ name: e.target.name, value: e.target.value }) }
      />
      {props.errors[el] ? <p>{ props.errors[el] }</p> : null}
    </Grid>
  });
  return (
    <>
      { fields }
      { props.stage === 1 ? <SpecialFields changeValue={ props.changeValue } errors={ props.errors }/> : null}
    </>
  );
};

const SignUp = (props) =>  {
  const fields = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    socialLink: ''
  };
  const [stage, setStage] = useState(0);
  const [user, setUser] = useState({ ...fields });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ ...fields, passwordConfirm: ''});
  const classes = useStyles();

  const handleFetch = async (address, data) => {
    const result = await fetchData(address, data);
    if (Array.isArray(result.errors)) {
      const errors = result.errors
        .reduce((acc, el) => {
          acc = { ...acc, [el.param]: el.msg };
          return acc
      }, {});
      throw setErrors(errors);
    } else if (result.errors) {
      throw setErrors({ email: result.errors});
    }
    return result;
  };

  const handleChange = (data) => {
    if (data.name === 'passwordConfirm') {
      setConfirmPassword(data.value );
    } else {
      const newUser = { ...user,[data.name]: data.value };
      setUser(newUser);
    }
    const errState = { ...errors, [data.name]: ''};
    setErrors(errState);
  };

  const checkCredentials = async () => {
    const emptyEmail = { email: 'Enter email' };
    const emptyPassword = { password: 'Enter password' };
    const wrongLength = { password: 'Password must be between 8 and 20 characters' };
    const notMatch = { passwordConfirm: 'Passwords not match' };
    const emptyConfirm = { passwordConfirm: 'Type password second time'};
    let newErrors = null;
    if (!user.email) newErrors = { ...newErrors, ...emptyEmail };
    if(!user.password) newErrors = { ...newErrors, ...emptyPassword };
    if(user.password &&
      user.password.length < 8 ||
      user.password.length > 20)  newErrors = { ...newErrors, ...wrongLength };
    if (!confirmPassword) newErrors = { ...newErrors, ...emptyConfirm };
    if (user.password !== confirmPassword) newErrors = { ...newErrors, ...notMatch };
    if(newErrors) return setErrors(newErrors);
    await handleFetch(mailCheck, {
      email: user.email,
      password: user.password
    });
    setStage(1);
  };

  const sendUser = async () => {
    const empty = 'This field shouldn`t be empty';
    let newErrors = null;
    if (!user.firstName ) newErrors = { ...newErrors, firstName: empty };
    if (!user.lastName ) newErrors = { ...newErrors, lastName: empty };
    if (!user.socialLink ) newErrors = { ...newErrors, socialLink: empty };
    if (!user.birthday ) newErrors = { ...newErrors, birthday: empty };
    if (!user.gender ) newErrors = { ...newErrors, gender: empty };
    if(newErrors) return setErrors(newErrors);
    const result = await handleFetch(addUsersData, user);
    await handleFetch(sendEmailConfirm, { id: result.id });
    window.location.replace('/')
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={ classes.paper }>
        <Typography component='h1' variant='h5'>
          {props.name}
        </Typography>
        <form className={ classes.form } noValidate>
          <Grid container spacing={2}>
            <Fields stage={ stage } changeValue={ handleChange }  errors={ errors }/>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={ classes.submit }
            onClick={ stage === 0 ? checkCredentials : sendUser }
          >
            { stage === 0 ? 'Continue' : 'Sign Up' }
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link variant='body2' onClick={() => props.changeStage('signIn')}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const fetchData = async (address, data) => {
  const response = await fetch( address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};



export default SignUp;


