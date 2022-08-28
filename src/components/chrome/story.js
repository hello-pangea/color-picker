import React from 'react'
import { storiesOf } from '@storybook/react'
import SyncColorField from '../../../.storybook/SyncColorField'

import Chrome from './Chrome'

storiesOf('Pickers', module)
  .add('ChromePicker', () => (
    <SyncColorField component={ Chrome }>
      <Chrome />
    </SyncColorField>
  ))
