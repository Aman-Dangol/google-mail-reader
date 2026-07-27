import { MailContext } from "@src/utils/context/selected-mail-context";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const MailPreview = ({ className }: Props) => {
  const { selectedMailData } = useContext(MailContext);

  const { selectedMail } = selectedMailData ?? {};

  const sanitizedText = snippetTextParser(selectedMail?.snippet ?? "");

  return (
    <section
      className={mergeClass(
        className,
        "border-l-0",
        !selectedMail && "w-0 overflow-hidden border-0 p-0",
      )}>
      {sanitizedText}
    </section>
  );
};
