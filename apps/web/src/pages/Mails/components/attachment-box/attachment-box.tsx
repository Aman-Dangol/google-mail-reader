import { AttachmentButton } from "@src/pages/Mails/components/attachment-button/attachment-button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { getAttachements } from "@src/utils/helpers/get-attachments";
import { useContext } from "react";

export const AttachmentBox = () => {
  const { selectedMailData } = useContext(MailContext);

  const { selectedMail } = selectedMailData ?? {};

  const attachments = getAttachements(selectedMail?.payload);

  if (!attachments || attachments.length === 0) return <></>;

  return (
    <section className='space-y-2 space-x-2'>
      {attachments.map((attachment) => (
        <AttachmentButton
          key={attachment.attachmentId}
          attachment={attachment}
        />
      ))}
    </section>
  );
};
