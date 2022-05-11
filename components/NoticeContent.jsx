import Image from "next/image";

function NoticeContent({ notice }) {
  return (
    <>
      <div className="lg:px- lg:col-span-2">
        <h1 className="text-3xl font-bold  mb-5">{notice.Title}</h1>
        <h2 className="text-lg text-justify">{notice.Subtitle}</h2>

        <div className="my-5 relative w-full h-96">
          <Image
            src={notice.url_IMG}
            alt={notice.Title}
            layout="fill"
            objectFit="fill"
            placeholder="blur"
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAAKElEQVR42u3MQQEAAAQEMNdUTe2E4LkFWKbrVYRCoVAoFAqFQqHwZgGwOywRCgqPNgAAAABJRU5ErkJggg=="
            }
          />
        </div>

        {notice.Internal_Content.map((content, index) => {
          if (content[0] === "h2") {
            return (
              <h3 key={index} className="py-3 text-base font-bold">
                {content[1]}
              </h3>
            );
          } else if (content[0] === "p") {
            return (
              <p key={index} className="py-3 text-base">
                {content[1]}
              </p>
            );
          }
        })}
      </div>
    </>
  );
}

export default NoticeContent;
