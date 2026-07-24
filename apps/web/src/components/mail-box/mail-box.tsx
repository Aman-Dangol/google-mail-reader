import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import { Separator } from "@src/components/separator/separator";

import { UserAvatar } from "@src/components/userAvatar/user-avatar";
import { nameEmailParser } from "@src/utils/helpers/email-name-parser";
import { formatDate } from "@src/utils/helpers/format-date";
import { snippetTextParser } from "@src/utils/helpers/snippet-text-parser";

export const MailBox = (mail: Mail) => {
  const headerFrom = mail.payload?.headers?.find(
    (item) => item.name === "From",
  );
  const { name } = nameEmailParser(headerFrom?.value ?? "");

  const headerSubject = mail.payload?.headers?.find(
    (item) => item.name?.toLowerCase() === "subject",
  );

  const mailDesc =
    headerSubject?.value || snippetTextParser(mail.snippet ?? "");

  const date = formatDate(mail.internalDate ?? "");

  return (
    <section>
      <section className="cursor-pointer p-4 space-y-2">
        <section className="flex items-center gap-4 ">
          <UserAvatar name={(name || headerFrom?.value) ?? ""} />
          <p className="font-semibold shrink-0">{name || headerFrom?.value}</p>

          <p className="text-muted-text font-semibold text-sm flex-1 text-right">
            {date}
          </p>
        </section>
        <p className="text-muted-text text-sm">{mailDesc}</p>
      </section>
      <Separator />
    </section>
  );
};
