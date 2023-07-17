export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid items-center h-screen dark:bg-gray-900 bg-white">
      {children}
    </main>
  )
}
