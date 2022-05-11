import { useEffect, useState } from "react";
import CardNotice from "@/components/CardNotice";
import Link from "next/link";

function LateralNotices() {
  const [notices, setNotices] = useState([]);

  async function getDataLateralNotice() {
    const response = await fetch(
      `http://localhost:4000/api/dataNotices/main-data`,
      { method: "GET" }
    );
    const responsejson = await response.json();

    setNotices(responsejson.data.slice(0, 4));
  }

  useEffect(() => {
    getDataLateralNotice();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-1">
      {notices.map((notices, index) => (
        <Link key={index} href={"/noticias/" + notices.path}>
          <a>
            <CardNotice
              cardSize="small"
              url_IMG={notices.url_IMG}
              title={notices.Title}
              subtitle={notices.Subtitle}
            />
          </a>
        </Link>
      ))}
    </div>
  );
}

export default LateralNotices;
