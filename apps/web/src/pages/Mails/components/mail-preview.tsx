import { MailContext } from "@src/utils/context/selected-mail-context";
import { decodeGoogleBase64 } from "@src/utils/helpers/decode";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const MailPreview = ({ className }: Props) => {
  const { selectedMailData } = useContext(MailContext);

  const { selectedMail } = selectedMailData ?? {};

  if (selectedMail?.payload?.body?.data) {
    const decodedData = decodeGoogleBase64(selectedMail?.payload?.body?.data);
    return (
      <section
        className={mergeClass(
          className,
          "scrollbar **:text-fg-primary overflow-auto",
          !selectedMail && "w-0 overflow-hidden border-0 p-0",
        )}
        dangerouslySetInnerHTML={{ __html: decodedData }}></section>
    );
  }

  const sanitizedText = snippetTextParser(selectedMail?.snippet ?? "");

  return (
    <section
      className={mergeClass(
        className,
        "scrollbar **:text-fg-primary overflow-auto",
        !selectedMail && "w-0 overflow-hidden border-0 p-0",
      )}>
      {sanitizedText}
    </section>
  );
};
