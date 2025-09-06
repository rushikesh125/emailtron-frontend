import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Brain, 
//   GithubIcon, 
//   TwitterIcon, 
//   LinkedinIcon, 
//   FacebookIcon,
  ArrowRight,
  Lock,
  FileText,
  BookOpen,
  MessageSquare,
  Shield,
  Map,
  FileQuestion,
  Users,
  CreditCard,
  Cookie
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-theme-purple/10 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-theme-purple" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">MailAI</span>
            </div>
            <p className="text-gray-400">
              AI-powered email management that transforms how teams handle customer communications.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/documentation" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for product updates and insights.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-purple"
              />
              <Button className="w-full bg-theme-purple hover:bg-theme-purple/90 text-white">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MailAI. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-400 text-sm flex items-center">
              <Cookie className="h-3 w-3 mr-1" />
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}