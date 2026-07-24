import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { UserAvatar } from "@src/components/userAvatar/user-avatar";
import { MailContext } from "@src/utils/context/selected-mail-context";
import { nameEmailParser } from "@src/utils/helpers/email-name-parser";
import { formatDate } from "@src/utils/helpers/format-date";
import { getMailHeader } from "@src/utils/helpers/get-mail-header";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";
import { mergeClass } from "@src/utils/tailwind-class-merge/classMerge";
import { useContext } from "react";

interface Props {
  mail: Mail;
  index: number;
}

export const MailBox = ({ mail, index }: Props) => {
  const { setSelectedMail, selectedMailData } = useContext(MailContext);

  const { selectedIndex, selectedMail } = selectedMailData ?? {};

  const headerFrom = getMailHeader(mail, "from");
  const headerSubject = getMailHeader(mail, "subject");

  const { name } = nameEmailParser(headerFrom?.value ?? "");

  const mailDesc =
    headerSubject?.value || snippetTextParser(mail.snippet ?? "");

  const date = formatDate(mail.internalDate ?? "");

  const handleMailSelect = () => {
    setSelectedMail({ selectedMail: mail, selectedIndex: index });
  };

  const isSelected = selectedMail?.id === mail.id;
  const hasSelection = typeof selectedIndex === "number";

  const isAboveSelectedMail = hasSelection && selectedIndex - 1 === index;
  const isBelowSelectedMail = hasSelection && selectedIndex + 1 === index;

  return (
    <section
      className={mergeClass(
        "hover:bg-bg-secondary transition-colors duration-300 flow-root border-r border-b",
        isSelected && "border-r-0 first:border-t border-b-0",
        isAboveSelectedMail && "rounded-br-2xl",
        isBelowSelectedMail && "rounded-tr-2xl border-t",
      )}
    >
      <section
        className={mergeClass("cursor-pointer space-y-4 p-4")}
        onClick={handleMailSelect}
      >
        <section className="flex items-center gap-4 ">
          <UserAvatar name={(name || headerFrom?.value) ?? ""} />
          <p className="font-semibold shrink-0">{name || headerFrom?.value}</p>

          <p className="text-muted-text font-semibold text-sm flex-1 text-right">
            {date}
          </p>
        </section>
        <p className="text-muted-text text-sm">{mailDesc}</p>
      </section>
    </section>
  );
};
