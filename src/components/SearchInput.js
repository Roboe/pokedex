import React, { Component } from 'react'


const sanitizeInput = (input) => input.trim().toLowerCase()

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    this.props.reportCriteria(sanitizeInput(event.target.value));
  }

  render() {
    const { isDisabled } = this.props

    const labelText = 'Search by name'

    return (
      <div className="pk-search-input">
        <label htmlFor="search-input" className="pk-search-input--label">{labelText}</label>
        <input type="text" id="search-input" className="pk-search-input--field"
          placeholder={labelText}
          disabled={isDisabled}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchInput
