import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Circle from "./Circle";

storiesOf("Pickers", module).add("CirclePicker", () => (
  <SyncColorField component={Circle}>
    <Circle />
  </SyncColorField>
));
