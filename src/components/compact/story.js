import React from 'react'
import { storiesOf } from '@storybook/react'
import SyncColorField from '../../../.storybook/SyncColorField'

import Compact from './Compact'

storiesOf('Pickers', module)
  .add('CompactPicker', () => (
    <SyncColorField component={ Compact }>
      <Compact />
    </SyncColorField>
  ))
