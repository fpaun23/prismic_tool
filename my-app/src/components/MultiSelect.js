import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

class Selectormulti extends React.Component {
  
  state = {
    selectedOption: null, 
  };
  
  handleChange = selectedOption => {
    this.setState({ selectedOption });    
    const providersIds = selectedOption.map(p => p.value) 
    this.props.handleProvidersSelection(providersIds)   
    console.log(`Multi Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption, isDisabled } = this.state;    
    return (
      <Select
        isDisabled={this.props.isDisabled}
        closeMenuOnSelect={false}
        components={animatedComponents}      
        isMulti
        options={this.props.providers}
        onChange={this.handleChange}
      />
    );
  }
}

export default Selectormulti