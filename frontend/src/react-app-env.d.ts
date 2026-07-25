// src/react-app-env.d.ts
/// <reference types="react-scripts" />

// ✅ Add SVG declaration
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}