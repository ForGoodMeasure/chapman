import React from 'react';
import { List, Datagrid, TextField, ImageInput, ReferenceField, EditButton } from 'admin-on-rest';

export const PostList = props => (
  <List { ...props }>
    <Datagrid>
      <ReferenceField label="id" source="id" reference="posts" linkType="edit">
        <TextField source="id" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="body" />
      <EditButton/>
    </Datagrid>
  </List>
);
