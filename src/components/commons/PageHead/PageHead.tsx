import Head from "next/head";

interface PropTypes {
  title?: string;
}

const PageHead = (props: PropTypes) => {
  const { title = "Tixin" } = props;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="icon"
        href="/images/general/Tixin-icon.png"
        type="image/x-icon"
      />
      <title>{title}</title>
    </Head>
  );
};

export default PageHead;
