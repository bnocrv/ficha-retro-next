import './globals.css'

export const metadata = {
  title: 'Ficha Retro 8-bit',
  description: 'Ficha gamer estilo retro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
