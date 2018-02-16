import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { PostList } from './posts';

const Style = styled.div`

`

export default props => (
  <Style>
    <Admin restClient={ jsonServerRestClient('http://jsonplaceholder.typicode.com') }>
      <Resource name="posts" list={ PostList } />
    </Admin>
  </Style>
);
