import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta content="The Rail Map" name="application-name" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="default" name="apple-mobile-web-app-status-bar-style" />
          <meta content="The Rail Map" name="apple-mobile-web-app-title" />
          <meta content="View Railroad Crossings, Live Amtrak, & More" name="description" />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="/browserconfig.xml" name="msapplication-config" />
          <meta content="#ffeb60" name="msapplication-TileColor" />
          <meta content="no" name="msapplication-tap-highlight" />
          <meta content="#ffeb60" name="theme-color" />
          <meta content="#ffeb60" name="og:theme-color" />

          <link href="/apple-touch-icon.png" rel="apple-touch-icon" />

          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/manifest.json" rel="manifest" />
          <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
            rel="stylesheet"
          />

          <meta content="summary" name="twitter:card" />
          <meta content="https://www.therailmap.com" name="twitter:url" />
          <meta content="The Rail Map" name="twitter:title" />
          <meta content="View Railroad Crossings, Live Amtrak, & More" name="twitter:description" />
          <meta content="/meta.png" name="twitter:image" />
          <meta content="@eiioth" name="twitter:creator" />

          <meta content="website" property="og:type" />
          <meta content="The Rail Map" property="og:title" />
          <meta content="View Railroad Crossings, Live Amtrak, & More" property="og:description" />
          <meta content="The Rail Map" property="og:site_name" />
          <meta content="https://www.therailmap.com" property="og:url" />
          <meta content="/meta.png" property="og:image" />
        </Head>
        <body className="overflow-hidden" id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
