import { MailContext } from "@src/utils/context/selected-mail-context";
import { ThemeContext } from "@src/utils/context/theme-context";
import { parseHTMLString } from "@src/utils/helpers/html-string-parse";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext, useMemo, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  htmlContent?: string;
}

/**
 *
 * use this inside the scope of mailcontext.provider
 * @returns
 */
export const MailRenderer = ({ htmlContent, className }: Props) => {
  const { selectedMailData } = useContext(MailContext);
  const { currentTheme } = useContext(ThemeContext);

  const parsedHtml = useMemo(
    () => parseHTMLString(htmlContent ?? "", currentTheme),
    [htmlContent, currentTheme],
  );

  const sanitizedText = snippetTextParser(
    selectedMailData?.selectedMail.snippet ?? "",
  );

  if (!htmlContent) {
    return <section className={className}>{sanitizedText}</section>;
  }

  return (
    <section
      className={mergeClass(
        className,
        "scrollbar overflow-auto",
        !selectedMailData?.selectedMail && "w-0 overflow-hidden border-0 p-0",
      )}>
      <iframe
        className='h-full w-full'
        referrerPolicy='no-referrer'
        srcDoc={parsedHtml}
      />
    </section>
  );
};
