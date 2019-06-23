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
import SongModalDialog from './SongModalDIalog';

const addresses = {
  songs: 'http://localhost:3001/api/Songs',
  meetings: 'http://localhost:3001/api/meetings',
  users: 'http://localhost:3001/api/users',
  authors: 'http://localhost:3001/api/authors',
  genres: 'http://localhost:3001/api/genres',
  cities: 'http://localhost:3001/api/cities'
};

const useStyles = makeStyles(() => ({
  box: {
    height: '100vh',
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
    authors: [],
    meetings: [],
    genres: [],
    cities: []
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
    changeDataList(data.data);
    setEntitiesData({...entitiesData, [entityName]: data.data});
    setTotal(data.total);
    setLoaded(true);
  };

  useEffect( () => {
    setEntities(value, '?page=1&limit=10&sortBy=id')
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
    setRowsPerPage(parseInt(e.target.value));
  };


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
                <SongModalDialog
                  open={open}
                  setOpen={setOpen}
                  data={entitiesData[value]}
                />
              </TableCell>
            </TableRow>
            {dataList.length < 0 ? <p>Loading...</p> : dataList}
          </TableBody>
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
        </Table>
      </Paper>
    </Box>
  )
};

export default AdminPage;
