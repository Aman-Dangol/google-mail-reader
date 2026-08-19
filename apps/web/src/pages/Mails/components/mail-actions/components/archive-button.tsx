import { Button } from "@src/components/button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { usePostArhiveMail } from "@src/utils/hooks/query-hooks/archive-mail";
import { Archive } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";

export const ArchiveButton = () => {
  const { selectedMailData } = useContext(MailContext);
  const { mutateAsync: archiveMail } = usePostArhiveMail();

  const handleArchive = () => {
    const mailId = selectedMailData?.selectedMail.id;
    if (!mailId) return;

    const toastId = toast.loading("Archiving mail...");

    archiveMail(
      { body: { mailId } },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Mail archived successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            draggable: true,
          });
        },
        onError: () => {
          toast.update(toastId, {
            render: "Failed to archive mail",
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
      title='archive'
      onClick={handleArchive}>
      <Archive className='size-4 stroke-red-600' />
    </Button>
  );
};
