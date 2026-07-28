import { MailContext } from "@src/utils/context/selected-mail-context";
import { parseHTMLString } from "@src/utils/helpers/html-string-parse";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  htmlContent: string;
}

/**
 *
 * use this inside the scope of mailcontext.provider
 * @returns
 */
export const MailRenderer = ({ htmlContent, className }: Props) => {
  const { selectedMailData } = useContext(MailContext);

  const sanitizedText = snippetTextParser(
    selectedMailData?.selectedMail.snippet ?? "",
  );

  if (!htmlContent) {
    return (
      <section
        className={mergeClass(
          className,
          "scrollbar **:text-fg-primary overflow-auto",
          !selectedMailData?.selectedMail && "w-0 overflow-hidden border-0 p-0",
        )}>
        {sanitizedText}
      </section>
    );
  }

  const parsedHtml = parseHTMLString(htmlContent);

  return (
    <iframe
      className={mergeClass(
        className,
        "scrollbar overflow-auto",
        !selectedMailData?.selectedMail && "w-0 overflow-hidden border-0 p-0",
      )}
      referrerPolicy='no-referrer'
      srcDoc={parsedHtml}
    />
  );
};
