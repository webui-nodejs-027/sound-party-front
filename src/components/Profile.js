import React from 'react';
import { List, ListItem } from '@material-ui/core';
const Profile = (props) => {
  const profileFields = ['email', 'firstName', 'lastName', 'birthday', 'gender', 'socialLink'];
  const fields = profileFields.map(el => {
    return <ListItem>{el}</ListItem>;
  });
  return (
    <List>{fields}</List>
  );
};

export default Profile;
