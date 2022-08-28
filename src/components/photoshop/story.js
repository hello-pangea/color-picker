import React from 'react'
import { storiesOf } from '@storybook/react'
import SyncColorField from '../../../.storybook/SyncColorField'

import Photoshop from './Photoshop'

storiesOf('Pickers', module)
  .add('PhotoshopPicker', () => (
    <SyncColorField component={ Photoshop }>
      <Photoshop />
    </SyncColorField>
  ))
