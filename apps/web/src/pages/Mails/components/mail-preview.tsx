import { MailActions } from "@src/pages/Mails/components/mail-actions/mail-actions";
import { MailRenderer } from "@src/pages/Mails/components/mail-renderer/mail-renderer";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { getDecodedHtml } from "@src/utils/helpers/decode";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const MailPreview = ({ className }: Props) => {
  const { selectedMailData } = useContext(MailContext);

  const { selectedMail } = selectedMailData ?? {};

  const payload = selectedMail?.payload;

  const payloadData = getDecodedHtml(payload);

  return (
    <section
      className={mergeClass(
        "sticky top-0 w-[60%] rounded-2xl rounded-l-none border border-l-0 transition-[width] duration-500",
        "scrollbar **:text-fg-primary flex flex-col overflow-auto",
        className,
        !selectedMail && "w-0 overflow-hidden border-0 p-0!",
      )}>
      <MailActions />
      <MailRenderer
        htmlContent={payloadData}
        className='flex-1'
      />
    </section>
  );
};
