import Image from "next/image";

function CardNotice(props) {
  return (
    <section className="border-b border-gray-400 mb-2">
      <div
        className={`relative w-full ${
          props.cardSize === "large" ? "h-96" : "h-48"
        } `}
      >
        <Image
          src={props.url_IMG}
          alt={props.title}
          layout="fill"
          objectFit="fill"
          placeholder="blur"
          blurDataURL={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAAKElEQVR42u3MQQEAAAQEMNdUTe2E4LkFWKbrVYRCoVAoFAqFQqHwZgGwOywRCgqPNgAAAABJRU5ErkJggg=="
          }
        />
      </div>

      <div className="pb-1">
        <h2 className="text-lg font-bold leading-5 py-2">{props.title}</h2>
        <p className="text-base leading-5 md:hidden">{props.subtitle}</p>
      </div>
    </section>
  );
}

export default CardNotice;
