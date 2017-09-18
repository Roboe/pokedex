import React from 'react'
import LinkNewTab from './LinkNewTab'
import Emoji from './Emoji'

export default ({ rootClass }) => (
  <footer className={rootClass}>
    <span className={`${rootClass}--credits`}>
      Made by <LinkNewTab link="http://virgulilla.com" text="@RoboePi" /> <Emoji label="Owl" emoji="&#129417;" />
    </span>
    <span className={`${rootClass}--license`}>
      <a href="https://github.com/Roboe/pokedex">Source</a> (GPLv3)
    </span>
  </footer>
)
