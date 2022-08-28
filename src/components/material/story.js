import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Material from "./Material";

storiesOf("Pickers", module).add("MaterialPicker", () => (
  <SyncColorField component={Material}>
    <Material />
  </SyncColorField>
));
