import React from 'react';

import { ThemeContext } from './simple-form-for';

export default function SimpleFormForProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
