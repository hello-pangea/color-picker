import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "13 Examples",
    Svg: require("@site/static/img/undraw_chore_list.svg").default,
    description: (
      <>
        Use 13 pre-made color pickers from GitHub, Sketch, Photoshop, and more.{" "}
        <a href="/examples">Color picker examples</a>.
      </>
    ),
  },
  {
    title: "Custom color pickers",
    Svg: require("@site/static/img/undraw_building_blocks.svg").default,
    description: (
      <>
        Use hooks to make custom color pickers. We'll handle the logic so you
        can focus on making your app.
      </>
    ),
  },
  {
    title: "Modern TypeScript",
    Svg: require("@site/static/img/undraw_code_typing.svg").default,
    description: (
      <>
        Written in TypeScript with modern features. Only two dependencies and
        tree shakeable.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
