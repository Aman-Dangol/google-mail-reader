import { Button } from "@src/components/button";
import { ArchiveButton } from "@src/pages/Mails/components/mail-actions/components/archive-button";
import { UnArchiveButton } from "@src/pages/Mails/components/mail-actions/components/unarchive-button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { X } from "lucide-react";
import { useContext } from "react";

export const MailActions = () => {
  const { setSelectedMail, selectedMailData } = useContext(MailContext);

  const handleClose = () => {
    setSelectedMail(undefined);
  };

  const CloseButton = (
    <Button
      onClick={handleClose}
      className='bg-fg-primary size-6'>
      <X className='stroke-bg-secondary size-4' />
    </Button>
  );

  const labelIds = selectedMailData?.selectedMail.labelIds ?? [];

  const hasInbox = labelIds.some((label) => label.toLowerCase() === "inbox");

  const hasDrafts = labelIds.some((label) => label.toLowerCase() === "draft");

  const ArchiveToggleButton =
    hasInbox && !hasDrafts ? (
      <ArchiveButton />
    ) : !hasInbox && !hasDrafts ? (
      <UnArchiveButton />
    ) : null;

  return (
    <section className='flex justify-end gap-2 p-2'>
      {CloseButton} {ArchiveToggleButton}
    </section>
  );
};
