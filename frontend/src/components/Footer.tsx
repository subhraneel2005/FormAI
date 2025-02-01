import { FaGithub, FaTwitter } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* App Name */}
          <div className="text-2xl font-bold text-white">FormAI</div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/subhraneel2005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/Subhraneel55545"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} FormAI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

