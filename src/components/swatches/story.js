import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Swatches from "./Swatches";

storiesOf("Pickers", module).add("SwatchesPicker", () => (
  <SyncColorField component={Swatches}>
    <Swatches />
  </SyncColorField>
));
