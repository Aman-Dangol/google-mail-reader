import { MailRenderer } from "@src/pages/Mails/components/mail-renderer/mail-renderer";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { decodeGoogleBase64 } from "@src/utils/helpers/decode";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { MIME_TYPES } from "@src/utils/types/mime-type";
import { useContext, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const MailPreview = ({ className }: Props) => {
  const { selectedMailData } = useContext(MailContext);

  const { selectedMail } = selectedMailData ?? {};

  const payload = selectedMail?.payload;

  if (selectedMail?.payload?.mimeType === MIME_TYPES.HTML) {
    const decodedData = decodeGoogleBase64(
      selectedMail?.payload?.body?.data ?? "",
    );

    return (
      <MailRenderer
        htmlContent={decodedData}
        className={className}
      />
    );
  }

  if (selectedMail?.payload?.mimeType === MIME_TYPES.ALTERNATIVE) {
    const base64htmlContent = payload?.parts?.find(
      (part) => part.mimeType === MIME_TYPES.HTML,
    );

    const decodedHtml = decodeGoogleBase64(base64htmlContent?.body?.data ?? "");
    return (
      <MailRenderer
        htmlContent={decodedHtml}
        className={className}
      />
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
