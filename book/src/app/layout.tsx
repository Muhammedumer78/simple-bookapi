import Header from '@/components/Header'
import './globals.css'


export const metadata = {
  title: 'Book API',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gray-200'>
        <Header/>
        {children}</body>
    </html>
  )
}
