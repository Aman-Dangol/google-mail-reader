import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { Dot } from "@src/components/dot/dot";
import { UserAvatar } from "@src/components/userAvatar/user-avatar";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { nameEmailParser } from "@src/utils/helpers/email-name-parser";
import { formatDate } from "@src/utils/helpers/format-date";
import { getMailHeader } from "@src/utils/helpers/get-mail-header";
import { useMarkAsread } from "@src/utils/helpers/mark-as-read";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext } from "react";

interface Props {
  mail: Mail;
  index: number;
}

const isUnRead = (labelIds: string[]) => {
  if (labelIds.find((el) => el.toLowerCase() === "unread")) {
    return true;
  }
  return false;
};

export const MailBox = ({ mail, index }: Props) => {
  const { setSelectedMail, selectedMailData } = useContext(MailContext);

  const { selectedIndex, selectedMail } = selectedMailData ?? {};

  const markAsRead = useMarkAsread(mail.id ?? "");

  const headerFrom = getMailHeader(mail, "from");
  const headerSubject = getMailHeader(mail, "subject");

  const { name } = nameEmailParser(headerFrom?.value ?? "");

  const mailDesc =
    headerSubject?.value || snippetTextParser(mail.snippet ?? "");

  const date = formatDate(mail.internalDate ?? "");

  const isSelected = selectedMail?.id === mail.id;
  const hasSelection = typeof selectedIndex === "number";

  const isAboveSelectedMail = hasSelection && selectedIndex - 1 === index;
  const isBelowSelectedMail = hasSelection && selectedIndex + 1 === index;

  const notRead = isUnRead(mail.labelIds ?? []);

  const handleMailSelect = () => {
    if (mail.id && notRead) {
      markAsRead();
    }
    setSelectedMail({ selectedMail: mail, selectedIndex: index });
  };

  return (
    <section
      className={mergeClass(
        "hover:bg-bg-secondary flow-root border-r border-b transition-colors duration-300",
        isSelected && "border-r-0 border-b-0 first:border-t",
        isAboveSelectedMail && "rounded-br-2xl",
        isBelowSelectedMail && "rounded-tr-2xl border-t",
        notRead && "bg-bg-secondary",
      )}>
      <section
        className={mergeClass("cursor-pointer space-y-4 p-4")}
        onClick={handleMailSelect}>
        <section className='flex min-w-0 gap-2'>
          {notRead ? <Dot /> : <div />}
          <UserAvatar name={(name || headerFrom?.value) ?? ""} />
          <section className='min-w-0 flex-1'>
            <section className='flex flex-1 justify-between'>
              <p
                className={mergeClass(
                  "truncate font-semibold",
                  selectedMail?.id && "w-60",
                )}>
                {name || headerFrom?.value}
              </p>

              <p className='text-muted-text flex-1 text-right text-sm font-semibold text-nowrap'>
                {date}
              </p>
            </section>
            <p
              className={mergeClass(
                "text-muted-text min-w-0 truncate text-sm text-nowrap",
                selectedMail?.id && "w-50",
              )}>
              {mailDesc}
            </p>
          </section>
        </section>
      </section>
    </section>
  );
};
