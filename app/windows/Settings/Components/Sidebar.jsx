import React from 'react'
import { observer } from 'mobx-react'

import { Pane, NavGroup, NavTitle, NavGroupItem } from 'react-photonkit'

/**
 * Render the Sidebar, uses NavigatorStore
 */
@observer
class Sidebar extends React.Component {
  _handleSelect = (selected) => {
    this.props.navigationStore.selected = selected
  }

  render () {
    const menus = [
      <NavTitle key='title'>Settings and Info</NavTitle>,
      <NavGroupItem key='con' glyph="rss" text="Connectivity" eventKey={0} />,
      <NavGroupItem key='rep' glyph="database" text="Repository" eventKey={1} />,
      <NavGroupItem key='peers' glyph="users" text="Peers" eventKey={2} />,
      <NavGroupItem key='integrations' glyph="tools" text="Integrations" eventKey={3} />
    ]

    return (
      <Pane sidebar ptSize="sm">
        <NavGroup onSelect={this._handleSelect}>
          {
            menus
          }
        </NavGroup>
      </Pane>
    )
  }
}

export default Sidebar
