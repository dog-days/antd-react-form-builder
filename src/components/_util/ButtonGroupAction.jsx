import React from 'react'
import ButtonGroup from '../Button/ButtonGroup'
import Icon from 'antd/lib/icon'

class NestItemContainer extends React.Component {

  onButtonClick() {

  }

  render() {
    let props = this.props;
    return (
          <ButtonGroup 
            size="default"
            hightButton={false}
            buttonTexts={[
              <Icon type="arrow-up"/>,
              <Icon type="arrow-down"/>,
              <Icon type="plus"/>,
              <Icon type="close"/>,
            ]}
            onButtonClick={ this.onButtonClick }
          />
    ) 
  }
}

export default NestItemContainer; 

