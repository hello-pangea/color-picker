import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Sketch from "./Sketch";

storiesOf("Pickers", module).add("SketchPicker", () => (
  <SyncColorField component={Sketch}>
    <Sketch />
  </SyncColorField>
));
