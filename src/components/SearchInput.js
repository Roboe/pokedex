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

    return (
      <div className="pk-search-input">
        <label htmlFor="search-input">Search by name</label>
        <input type="text" id="search-input" disabled={isDisabled}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchInput
