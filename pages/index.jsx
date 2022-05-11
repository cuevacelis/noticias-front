import Link from "next/link";
import CardNotice from "@/components/CardNotice";
import Layout from "@/components/layout/layout.jsx";

export async function getStaticProps() {
  const res = await fetch(`${process.env.URL_BACK}/api/dataNotices/main-data`);
  const resJson = await res.json();
  const noticias_principales = resJson.data;

  return {
    props: {
      noticias_principales,
    },
    revalidate: 9000,
  };
}

function Home(props) {
  return (
    <Layout>
      {props.noticias_principales.length > 0 ? (
        <>
          <div className="md:m-4 lg:pt-8">
            <div className="grid md:grid-cols-3 md:gap-3 lg:gap-5 xl:gap-10">
              <section className="border-y-2 border-slate-400 m-2 p-2 md:col-span-2 lg:border-none ">
                <Link href={"/noticias/" + props.noticias_principales[8].path}>
                  <a>
                    <CardNotice
                      cardSize="large"
                      url_IMG={props.noticias_principales[8].url_IMG}
                      title={props.noticias_principales[8].Title}
                      subtitle={props.noticias_principales[8].Subtitle}
                    />
                  </a>
                </Link>
              </section>

              <section className="md:col-span-1 ">
                {[7, 6].map((notices, index) => (
                  <Link
                    key={index}
                    href={
                      "/noticias/" + props.noticias_principales[notices].path
                    }
                  >
                    <a>
                      <CardNotice
                        cardSize="small"
                        url_IMG={props.noticias_principales[notices].url_IMG}
                        title={props.noticias_principales[notices].Title}
                        subtitle={props.noticias_principales[notices].Subtitle}
                      />
                    </a>
                  </Link>
                ))}
              </section>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:m-4 md:gap-3 lg:grid-cols-3 lg:gap-5 xl:gap-10">
            {[5, 4, 3, 2, 1, 0].map((notices, index) => (
              <Link
                key={index}
                href={"/noticias/" + props.noticias_principales[notices].path}
              >
                <a>
                  <CardNotice
                    cardSize="small"
                    url_IMG={props.noticias_principales[notices].url_IMG}
                    title={props.noticias_principales[notices].Title}
                    subtitle={props.noticias_principales[notices].Subtitle}
                  />
                </a>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </Layout>
  );
}

export default Home;
