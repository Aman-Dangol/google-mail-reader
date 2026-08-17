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

  const markAsRead = useMarkAsread();

  const headerFrom = getMailHeader(mail, "from");
  const headerSubject = getMailHeader(mail, "subject");

  const { name } = nameEmailParser(headerFrom?.value ?? "");

  const mailDesc =
    headerSubject?.value || snippetTextParser(mail.snippet ?? "");

  const date = formatDate(mail.internalDate ?? "");

  const handleMailSelect = () => {
    if (mail.id) markAsRead(mail.id);
    setSelectedMail({ selectedMail: mail, selectedIndex: index });
  };

  const isSelected = selectedMail?.id === mail.id;
  const hasSelection = typeof selectedIndex === "number";

  const isAboveSelectedMail = hasSelection && selectedIndex - 1 === index;
  const isBelowSelectedMail = hasSelection && selectedIndex + 1 === index;

  const notRead = isUnRead(mail.labelIds ?? []);

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
        <section className='flex items-center gap-2'>
          {notRead ? <Dot /> : <div />}
          <UserAvatar name={(name || headerFrom?.value) ?? ""} />
          <section className='flex-1'>
            <section className='flex flex-1 justify-between'>
              <p className='shrink-0 font-semibold'>
                {name || headerFrom?.value}
              </p>

              <p className='text-muted-text flex-1 text-right text-sm font-semibold'>
                {date}
              </p>
            </section>
            <p className='text-muted-text text-sm'>{mailDesc}</p>
          </section>
        </section>
      </section>
    </section>
  );
};
