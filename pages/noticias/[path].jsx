import { useRouter } from "next/router";
import Layout from "@/components/layout/layout.jsx";
import NoticeContent from "@/components/NoticeContent.jsx";
import LateralNotices from "@/components/LateralNotices";
import Comments from "@/components/comments/comments";
import LoadingPage from "@/components/loaders/LoadingPage";

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const dataPOST = {
    path: params.path,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/api/dataNotices/notice-path`,
    {
      method: "POST",
      body: JSON.stringify(dataPOST),
      headers: { "Content-Type": "application/json" },
    }
  );
  const resJson = await res.json();
  const notice_obj = resJson.data[0];

  return {
    props: {
      notice_obj,
    },
    revalidate: 800000,
  };
}

function MangaPage(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingPage />;
  } else {
    return (
      <Layout>
        <section className="grid my-4 lg:grid-cols-3 lg:gap-6 xl:gap-10 2xl:gap-15">
          <div className="col-span-2">
            <NoticeContent notice={props.notice_obj} />
            <Comments id={props.notice_obj.id_num} />
          </div>
          <div className="col-span-1 px-3">
            <LateralNotices />
          </div>
        </section>
      </Layout>
    );
  }
}

export default MangaPage;
