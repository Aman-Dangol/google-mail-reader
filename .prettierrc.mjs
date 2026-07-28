/**
 * @type {import("prettier").Config}
 */

const config = {
  tabWidth: 2,
  useTabs: false,
  jsxSingleQuote: true,
  trailingComma: "all",
  bracketSameLine: true,
  endOfLine: "lf",
  singleAttributePerLine: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
