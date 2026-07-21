import type { Mail } from "@repo/shared-types/utils/api-mail-types";
import {
  AccordianRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/components/accordian/accordian";
import { nameEmailParser } from "@src/utils/helpers/email-name-parser";

export const MailBox = (mail: Mail) => {
  const headerFrom = mail.payload?.headers?.find(
    (item) => item.name === "From",
  );
  const { name } = nameEmailParser(headerFrom?.value ?? "");

  return (
    <AccordianRoot type="single" collapsible>
      <AccordionItem value={mail.id ?? ""} className="shadow-[0_1px_0]">
        <AccordionTrigger>{name || headerFrom?.value}</AccordionTrigger>
        <AccordionContent>{mail.snippet}</AccordionContent>
      </AccordionItem>
    </AccordianRoot>
  );
};
