import { Button } from "@src/components/button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { X } from "lucide-react";
import { useContext } from "react";

export const MailActions = () => {
  const { setSelectedMail } = useContext(MailContext);

  const handleClose = () => {
    setSelectedMail(undefined);
  };
  const CloseButton = (
    <Button
      onClick={handleClose}
      className='size-6'>
      <X className='stroke-bg-secondary size-4' />
    </Button>
  );

  return <section className='flex justify-end p-2'>{CloseButton}</section>;
};
