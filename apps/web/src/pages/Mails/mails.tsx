import { NavContext } from "@src/utils/context/nav-context";
import { useContext } from "react";
import { useGetAllMailInfiniteQuery } from "@src/utils/hooks/query-hooks/mails";
import { MailBox } from "@src/components/mail-box/mail-box";
import { useIniniteQueryloading } from "@src/utils/hooks/infinite-query-loader/infinite-query-loading-hooks";
import { MailProvider } from "@src/utils/context/selected-mail-context";
import { MailPreview } from "@src/pages/Mails/components/mail-preview";
import { ThemeContext } from "@src/utils/context/theme-context";

export default function MailPage() {
  const mailType = useContext(NavContext).currentTab;
  const { currentTheme } = useContext(ThemeContext);

  const {
    data: mailsReponse,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetAllMailInfiniteQuery(mailType);

  const { loaderElement } = useIniniteQueryloading({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const allMails = mailsReponse?.pages.flatMap((data) => data.data);

  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>content is Loading</div>;
  }

  return (
    <MailProvider mails={allMails}>
      <section className='scrollbar flex h-full overflow-auto'>
        <section className='min-w-0 flex-1'>
          {allMails?.map((mail, index) => (
            <MailBox
              mail={mail}
              key={mail.id}
              index={index}
            />
          ))}
          {loaderElement}
        </section>
        <MailPreview key={currentTheme} />
      </section>
    </MailProvider>
  );
}
