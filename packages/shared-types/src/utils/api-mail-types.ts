import type { gmail_v1 } from "googleapis";

export type MailType = "Inbox" | "Sent" | "Drafts" | "All";

export type Mail = gmail_v1.Schema$Message;

export type Mails = Omit<gmail_v1.Schema$Message, "payload">;
