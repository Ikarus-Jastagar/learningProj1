import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PictureNarrate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      </head>
      <body className={inter.className}>
        
          {children}
          
      </body>
    </html>
  )
}

