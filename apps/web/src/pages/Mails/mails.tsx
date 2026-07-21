import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";
import { useGetAllMails } from "@src/utils/hooks/query-hooks/mails";
import { MailBox } from "@src/components/mail-box/mail-box";

export default function MailPage() {
  const mailType = useContext(NavContext).currentTab;
  const { data: mailsReponse, isLoading, isError } = useGetAllMails(mailType);

  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>content is Loading</div>;
  }

  const allMails = mailsReponse?.data;

  return (
    <div>
      {allMails?.map((mail) => (
        <MailBox {...mail} key={mail.id} />
      ))}
    </div>
  );
}
