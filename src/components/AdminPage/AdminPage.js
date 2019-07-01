import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableCell,
  TableRow
} from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import DataList from './DataList';
import CreationComponent from "./CreationComponent";

const addresses = {
  songs: 'http://localhost:3001/api/songs',
  meetings: 'http://localhost:3001/api/meetings',
  users: 'http://localhost:3001/api/users',
  authors: 'http://localhost:3001/api/authors',
  genres: 'http://localhost:3001/api/genres',
  cities: 'http://localhost:3001/api/cities'
};

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: '#cce6ff',
    padding: '20px'
  },
  textField: {
    height: '100px'
  },
  cell: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    height: '100%'
  }
}));

const AdminPage = () => {
  const initial = {
    users: [],
    songs: [],
    authors: [{name: ''}],
    meetings: [],
    genres: [{name: ''}],
    cities: [{name: ''}]
  };
  const classes = useStyles();
  const [ value, setValue ] = useState('meetings');
  const [ entitiesData, setEntitiesData ] = useState(initial);
  const [ dataList, setDataList] = useState([]);
  const [ loaded, setLoaded ] = useState(true);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ total, setTotal ] = useState(0);
  const [ reload, setReload ] = useState(Math.random());
  const [ open, setOpen ] = useState(false);
  const handleFetch = async (address, params) => {
    const addressWithParams = params ? address + params : address;
    const response = await fetch( addressWithParams, {
      method: 'GET'
    });
    return response.json();
  };

  const changeDataList = (data) => {
    const renderData = data.map((el, index) => (
      <DataList
        setReload={setReload}
        key={index}
        loaded={loaded}
        address={addresses[value]}
        data={el}
        entityName={value}
        summary={`${el.id}: ${el.name ? el.name : (el.firstName + ' ' + el.lastName)}`}
      />
    ));
    setDataList(renderData);
  };

  const setEntities = async (entityName, params) => {
    const data = await handleFetch(addresses[entityName], params);
    if (data.data.length === 0 && page > 0) {
      setPage(page - 1);
      setReload(Math.random());
    }
    const grantedData = data.data.length === 0 ? initial[entityName] : data.data;
    changeDataList(data.data);
    setEntitiesData({...entitiesData, [entityName]: grantedData});
    setTotal(data.total);
    setLoaded(true);
  };

  useEffect( () => {
    setEntities(value, `?page=${page + 1}&limit=${rowsPerPage}&sortBy=id`);
  }, [reload]);

  const handleChange = async (e, newValue) => {
    setReload(Math.random());
    setValue(newValue);
    setPage(0);
    setRowsPerPage(10);
  };

  const handleChangePage = (event, newPage) => {
    setEntities(value, `?page=${newPage + 1}&limit=${rowsPerPage}&sortBy=id`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setEntities(value, `?page=1&limit=${e.target.value}&sortBy=id`);
    setPage(0);
    setRowsPerPage(parseInt(e.target.value));
  };

  const addingComponent = value === 'users' || value === 'meetings' ? null :
    (
      <TableRow>
        <TableCell className={classes.cell}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlined />
          </Button>
          <CreationComponent
            open={open}
            setOpen={setOpen}
            data={entitiesData}
            value={value}
            address={addresses[value]}
            setReload={setReload}
          />
        </TableCell>
      </TableRow>
    );

  return (
    <Box className={classes.box}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  centered
                >
                  <Tab label='meetings' value='meetings'/>
                  <Tab label='songs' value='songs'/>
                  <Tab label='users' value='users'/>
                  <Tab label='authors' value='authors'/>
                  <Tab label='genres' value='genres'/>
                  <Tab label='cities' value='cities'/>
                </Tabs>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addingComponent}
            {dataList.length < 0 ? <TableCell><p>Loading...</p></TableCell> : dataList}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component='div'
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
};

export default AdminPage;
