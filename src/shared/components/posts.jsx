import React from 'react';
import { List, Datagrid, TextField, ImageInput } from 'admin-on-rest';

export const PostList = props => (
  <List { ...props }>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);
