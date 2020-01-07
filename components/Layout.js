import Menu from "../components/Menu";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>NextJS-Challenge</title>
        <link
          rel='stylesheet'
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
          integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
          crossorigin='anonymous'
        ></link>
        <style></style>
      </Head>
      <Menu />
      <section className='container py-5 d-flex justify-content-center align-items-center flex-column'>
        {children}
      </section>
    </div>
  );
};

export default Layout;
