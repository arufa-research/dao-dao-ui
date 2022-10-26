import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head />
    
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <body className="subpixel-antialiased bg-white body-text">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
