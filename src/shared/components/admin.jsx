import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Admin, Resource } from 'admin-on-rest';
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
        <Resource name="posts" list={ PostList } />
      </Admin>
    </Style>
  );
}

AdminComponent.contextTypes = localContextType;

export default AdminComponent
