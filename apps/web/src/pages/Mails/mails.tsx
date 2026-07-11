import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";
import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { useGetAllMails } from "@src/utils/hooks/query-hooks/mails";
import { nameEmailParser } from "@src/utils/helpers/email-name-parser";

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
        <SingleMail {...mail} key={mail.id} />
      ))}
    </div>
  );
}

const SingleMail = (mail: Mail) => {
  const headerFrom = mail.payload?.headers?.find(
    (item) => item.name === "From",
  );
  const { name } = nameEmailParser(headerFrom?.value ?? "");

  return <div className="text-fg-primary">{name}</div>;
};
