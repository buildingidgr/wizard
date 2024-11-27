import ProjectTypeSelector from './components/ProjectTypeSelector'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-blue-500 text-white p-4 mb-4 rounded">
        If you can see this blue box with white text, Tailwind CSS is working!
      </div>
      <ProjectTypeSelector />
    </main>
  )
}

