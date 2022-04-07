import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="overflow-hidden" id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
