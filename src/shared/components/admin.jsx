import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Admin, Resource, Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, Show, SimpleShowLayout, RichTextField, CardActions, DeleteButton, RefreshButton, ListButton } from 'admin-on-rest';
import { PostList } from './posts';
import restClient from '../../browser/rest-client';
import { localContextType } from '../util';

const Style = styled.div`

`

const AdminComponent = (props, { localContext }) => {
  const client = restClient({
    apiBase: localContext.stageContext.apiBase
  })
  return (
    <Style>
      <Admin restClient={ client }>
        <Resource
          name="posts"
          list={ PostList }
          create={ PostCreate }
          show={ PostShow }
          edit={ PostEdit }
        />
      </Admin>
    </Style>
  );
}

const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

const PostEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

const PostShow = (props) => (
    <Show {...props} >
        <SimpleShowLayout>
            <TextField source="title" />
            <RichTextField source="body" />
        </SimpleShowLayout>
    </Show>
);

AdminComponent.contextTypes = localContextType;
export default AdminComponent
