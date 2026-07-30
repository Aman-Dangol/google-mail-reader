import { Button } from "@src/components/button";
import { MailContext } from "@src/utils/context/selected-mail-context";
import {
  decodeGoogleBase64Bytes,
  handleDownloadGoogleBase64String,
} from "@src/utils/helpers/decode";
import { useGetAttachmentByID } from "@src/utils/hooks/query-hooks/get-attachment-by-id";
import type { AttachmentData } from "@src/utils/types/attachment-types";
import { useContext } from "react";

interface Props {
  attachment: AttachmentData;
}

export const AttachmentButton = ({ attachment }: Props) => {
  const { selectedMailData } = useContext(MailContext);
  const { selectedMail } = selectedMailData ?? {};

  const { isLoading, refetch: getAttachment } = useGetAttachmentByID({
    id: attachment.attachmentId ?? "",
    messageID: selectedMail?.id ?? "",
  });

  const handleClick = async () => {
    const { data: attachmentData } = await getAttachment();
    const data = attachmentData?.data.data;
    if (data) {
      handleDownloadGoogleBase64String({ data, fileName: attachment.fileName });
    }
  };

  return (
    <Button
      className='h-16 rounded-md p-2'
      onClick={handleClick}
      disabled={isLoading}>
      {isLoading ? "Loading..." : attachment.fileName}
    </Button>
  );
};
