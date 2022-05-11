import HeaderSectionLogin from "@/components/layout/nav/HeaderSectionLogin";
import LayoutPrincipal from "@/components/layout/layout";

function BookmarksPage() {
  return (
    <LayoutPrincipal>
      <section className="nav-mobile">
        <div className="login"></div>
        <ul className="flex flex-col gap-4">
          <li className="m-0">
            <HeaderSectionLogin />
          </li>
        </ul>
      </section>
    </LayoutPrincipal>
  );
}

export default BookmarksPage;
