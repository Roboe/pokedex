import React from 'react'

export default ({ title, rootClass, children }) => (
  <header className={rootClass}>
    <span className={`${rootClass}--title`}>{title}</span>
    <div className={`${rootClass}--aside`}>{children}</div>
  </header>
)
