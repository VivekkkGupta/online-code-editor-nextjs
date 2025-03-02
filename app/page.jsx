import Header from "@/components/Header";
import Main from "@/components/Main";
import { LANGUAGES } from "@/constants/constants";

function Page() {
  console.log(LANGUAGES);
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Page;
