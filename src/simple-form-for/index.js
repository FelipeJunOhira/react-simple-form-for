import React from 'react';

import SimpleFormFor, { ThemeContext } from './simple-form-for';

export default SimpleFormFor;

export function SimpleFormForProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
