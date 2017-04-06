import React from 'react'
import FormBuilder from '../src/index'

@FormBuilder.create()
export default class BuilderComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <FormBuilder
        { ...this.props }
      />
    )
  }
}
