import React, { Component, Fragment } from 'react';
import './App.css';

import SimpleFormFor, { SimpleFormForProvider } from './simple-form-for';
import bootstrap4Theme from './simple-form-for/theme/bootstrap-4';
import bootstrap4InlineTheme from './simple-form-for/theme/bootstrap-4-inline';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      model: {
        name: 'Bob'
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.submitted ? 'true' : 'false'}

          <SimpleFormForProvider theme={bootstrap4Theme}>
            <SimpleFormFor
              model={this.state.model}
              onSubmit={
                model => {
                  this.setState({ submitted: true, model: model });
                  console.log(model);
                }
              }
            >
              {f => (
                <Fragment>
                  <div className='row'>
                    <div className='col-6'>
                      {f.input('name')}
                    </div>
                    <div className='col-6'>
                      {f.input('age')}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-6'>
                      {f.select('gender', { collection: { f: 'Female', m: 'Male' } })}
                    </div>
                    <div className='col-6'>
                      {f.radio('gender', { collection: { f: 'Female', m: 'Male' } })}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      {f.input('cpf')}
                    </div>
                  </div>

                  {f.button('submit')}
                </Fragment>
              )}
            </SimpleFormFor>
          </SimpleFormForProvider>

          <hr/>
          <SimpleFormFor
            theme={bootstrap4InlineTheme}
            model={this.state.model}
            onModelChange={
              model => {
                this.setState({ ...this.state, model: model });
                console.log(model);
              }
            }
            onSubmit={
              model => {
                this.setState({ submitted: true, model: model });
                console.log(model);
              }
            }
          >
            {f => (
              <Fragment>
                {f.input('name')}
                {f.input('age')}
                {f.select('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.radio('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.input('cpf')}
                {f.button('submit')}
              </Fragment>
            )}
          </SimpleFormFor>

          <hr/>
          <SimpleFormFor
            model={this.state.model}
            onModelChange={
              model => {
                this.setState({ ...this.state, model: model });
                console.log(model);
              }
            }
            onSubmit={
              model => {
                this.setState({ submitted: true, model: model });
                console.log(model);
              }
            }
          >
            {f => (
              <Fragment>
                {f.input('name')}
                {f.input('age')}
                {f.select('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.radio('gender', { collection: { f: 'Female', m: 'Male' } })}
                {f.input('cpf')}
                {f.button('submit')}
              </Fragment>
            )}
          </SimpleFormFor>
        </header>
      </div>
    );
  }
}

export default App;
