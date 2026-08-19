import { Button } from "@src/components/button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { useUnArhiveMail } from "@src/utils/hooks/query-hooks/unarchive-mail";
import { ArchiveRestore } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";

export const UnArchiveButton = () => {
  const { selectedMailData } = useContext(MailContext);
  const { mutateAsync: unArchiveMail } = useUnArhiveMail();

  const handleUnArchive = () => {
    const mailId = selectedMailData?.selectedMail.id;
    if (!mailId) return;

    const toastId = toast.loading("Un-Archiving mail...");

    unArchiveMail(
      { body: { mailId } },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Mail un-archived successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            draggable: true,
          });
        },
        onError: () => {
          toast.update(toastId, {
            render: "Failed to un-archive mail",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            draggable: true,
          });
        },
      },
    );
  };

  return (
    <Button
      className='bg-fg-primary size-6'
      title='un-archive'
      onClick={handleUnArchive}>
      <ArchiveRestore className='stroke-bg-primary size-4' />
    </Button>
  );
};
