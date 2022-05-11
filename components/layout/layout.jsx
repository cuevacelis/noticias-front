import NavBar from "@/components/layout/nav/NavBar";

function Layout(props) {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="mx-1 xl:mx-40 2xl:mx-96">{props.children}</main>
    </>
  );
}
export default Layout;
