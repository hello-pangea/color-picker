import React from "react";
import { storiesOf } from "@storybook/react";
import SyncColorField from "../../../.storybook/SyncColorField";
import { renderWithKnobs } from "../../../.storybook/report";

import Sketch from "./Sketch";

storiesOf("Pickers", module).add("SketchPicker", () => <Sketch />);
