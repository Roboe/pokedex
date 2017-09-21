import React, { Component } from 'react'


const sanitizeInput = (input) => input.trim().toLowerCase()

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const targetValue = event.target.value

    this.setState({value: targetValue}, () => {
      this.props.reportCriteria(sanitizeInput(targetValue))
    })
  }

  render() {
    const { isDisabled } = this.props

    const labelText = 'Search by name'

    return (
      <div className="pk-search-input">
        <label htmlFor="search-input" className="pk-search-input--label">{labelText}</label>
        <input type="text" id="search-input" className="pk-search-input--field"
          placeholder={labelText}
          value={this.state.value}
          disabled={isDisabled}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchInput
