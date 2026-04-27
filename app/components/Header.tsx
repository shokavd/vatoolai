export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">Clarity AI</span>
          <span className="hidden sm:inline text-sm text-gray-400 font-normal">
            — Turn chaos into clarity
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#tool"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Free
          </a>
        </nav>
      </div>
    </header>
  );
}
