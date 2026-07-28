import { getCurrentTheme } from "@src/utils/theme/theme";

// todo: extract bg colors from prefers-color-scheme and apply them according to apps theme mode
export const parseHTMLString = (htmlContent: string) => {
  const theme = getCurrentTheme();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  doc.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  const bodyStyle = doc.body.style;

  if (
    bodyStyle.backgroundColor === "transparent" ||
    !bodyStyle.backgroundColor
  ) {
    bodyStyle.backgroundColor = "#fff";
  }

  if (theme === "light")
    doc.querySelectorAll("style").forEach((style) => {
      style.textContent = style.textContent?.replace(
        /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{[\s\S]*?\}/gi,
        "",
      );
    });

  const srcDoc = doc.documentElement.outerHTML;

  return srcDoc;
};
