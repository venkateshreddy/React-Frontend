import React from 'react';
import Select from 'react-select';

class MultiSelectDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      notSelectedList: props.options
    }
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
  render() {
  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;

    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    );
  }
}
export default MultiSelectDropdown;