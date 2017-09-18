import React from 'react'

export default ({ emoji, label }) => (
  <span className="emoji" role="img" aria-label={label}>{emoji}</span>
)
