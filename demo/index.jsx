import { render } from 'react-dom'
import React from 'react'
import Container from './container'

function renderApp() {
  const target = document.getElementById('app_container');
  if (target) {
    render(
      <Container/>,
      target
    );
  }
}

renderApp();

if (module.hot) {
  module.hot.accept(
    './container',
    () => renderApp()
  );
}

