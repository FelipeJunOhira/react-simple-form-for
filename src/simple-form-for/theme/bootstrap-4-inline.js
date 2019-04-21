import React from 'react';
import _ from 'lodash';

import bootstrap4BaseTheme from './bootstrap-4';

const theme = _.merge({}, bootstrap4BaseTheme, {
  formClasses: 'form-inline'
});

export default theme;
