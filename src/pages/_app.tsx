import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../../components/Layout";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    // ライトモードでデフォルトに
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ThemeProvider>
  );
}
