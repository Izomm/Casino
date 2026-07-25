// src/components/seo.tsx
import React from "react";
import { Helmet as HelmetBase, HelmetProps } from "react-helmet";

// ✅ Type assertion to any
const Helmet = HelmetBase as any;

const SEO = ({ title }: Pick<HelmetProps, "title">) => (
  <Helmet title={title} titleTemplate="%s | Casino" defaultTitle="Casino" />
);

export default SEO;
