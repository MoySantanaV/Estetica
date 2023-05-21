import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin']
})

export const metadata = {
  title: 'Estética',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
