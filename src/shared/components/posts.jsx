import React from 'react';
import { List, Datagrid, TextField, ImageInput, ReferenceField } from 'admin-on-rest';

export const PostList = props => (
  <List { ...props }>
    <Datagrid>
      <ReferenceField label="id" source="id" reference="posts" linkType="edit">
        <TextField source="id" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);
