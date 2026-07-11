import { Button } from "@src/components/button";
import { useGet } from "@src/utils/axios/axios-get";
import { Link } from "react-router";

export default function Login() {
  const { data, isLoading, isError } = useGet<{ url: string }>({
    queryKey: ["google-login"],
    url: "/getUrl",
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  if ("url" in data!)
    return (
      <main>
        <header></header>
        <section className="p-2">
          <Link to={data.url}>
            <Button className="bg-blue-500 text-white font-medium">
              Login With Google
            </Button>
          </Link>
        </section>
      </main>
    );
}
