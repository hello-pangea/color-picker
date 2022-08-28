import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Google from "./Google";

storiesOf("Pickers", module).add("GooglePicker", () => (
  <SyncColorField component={Google}>
    <Google />
  </SyncColorField>
));
