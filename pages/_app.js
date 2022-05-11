import "../styles/globals.css";
import IndicatorLoadingPage from "@/components/loading-page-indicator/IndicatorLoadingPage";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <IndicatorLoadingPage />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
