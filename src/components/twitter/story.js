import React from 'react'
import { storiesOf } from '@storybook/react'
import SyncColorField from '../../../.storybook/SyncColorField'

import Twitter from './Twitter'

storiesOf('Pickers', module)
  .add('TwitterPicker', () => (
    <SyncColorField component={ Twitter }>
      <Twitter />
    </SyncColorField>
  ))
