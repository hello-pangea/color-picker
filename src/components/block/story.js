import React from 'react'
import { storiesOf } from '@storybook/react'
import SyncColorField from '../../../.storybook/SyncColorField'

import Block from './Block'

storiesOf('Pickers', module)
  .add('BlockPicker', () => (
    <SyncColorField component={ Block }>
      <Block />
    </SyncColorField>
  ))
