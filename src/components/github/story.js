import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";

import Github from "./Github";

storiesOf("Pickers", module).add("GithubPicker", () => (
  <SyncColorField component={Github}>
    <Github />
  </SyncColorField>
));
