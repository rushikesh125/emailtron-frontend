"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Brain,
  Zap,
  BarChart3,
  Shield,
  Clock,
  ArrowRight,
  Check,
  Users,
  TrendingUp,
  Lightbulb,
  MessageCircle,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  Lock,
  FileText,
  BookOpen,
  MessageSquare,
  Map,
  FileQuestion,
  CreditCard,
  Cookie
} from "lucide-react";
import Link from "next/link";

export default function LandingPageV2() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced sentiment analysis, priority detection, and requirement extraction from every email.",
    },
    {
      icon: Zap,
      title: "Smart Prioritization",
      description:
        "Automatically categorize and prioritize emails based on urgency and business impact.",
    },
    {
      icon: Mail,
      title: "Context-Aware Responses",
      description:
        "Generate professional, empathetic responses tailored to each customer's specific needs.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description:
        "Track performance metrics, response times, and customer satisfaction with interactive dashboards.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance with data protection regulations.",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description:
        "Reduce email processing time by up to 80% while maintaining high-quality customer interactions.",
    },
  ];

  const steps = [
    {
      icon: Users,
      title: "Email Retrieval",
      description: "Automatically fetches support emails from your inbox",
    },
    {
      icon: Lightbulb,
      title: "AI Analysis",
      description: "Analyzes sentiment, priority, and extracts key information",
    },
    {
      icon: Zap,
      title: "Smart Prioritization",
      description: "Ranks emails by urgency and business impact",
    },
    {
      icon: MessageCircle,
      title: "Automated Response",
      description: "Generates context-aware draft responses for review",
    },
  ];

  const stats = [
    { value: "80%", label: "Time Saved" },
    { value: "3x", label: "Response Speed" },
    { value: "95%", label: "Accuracy" },
    { value: "24/7", label: "Availability" },
  ];

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-theme-purple/5 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Transform Your Email Management with
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    ⚡ MailTron AI
                  </h1>
                </div>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Process customer emails 10x faster with automated analysis,
                prioritization, and AI-generated responses.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-theme-purple hover:bg-theme-purple/90 text-white px-8 py-3 text-base rounded-lg"
                >
                  <Link href="/dashboard">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-base rounded-lg border-gray-300"
                >
                  <Link href="#features">View Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-theme-purple/10 rounded-full blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-theme-purple/10 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-theme-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Support Request
                      </p>
                      <p className="text-sm text-gray-500">linda@service.org</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Urgent
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    "I'm unable to reset my password after multiple attempts.
                    This is critical for my work."
                  </p>
                </div>
                <div className="bg-theme-purple/5 rounded-lg p-4">
                  <p className="text-sm text-gray-800">
                    "We understand your frustration. Please follow this link for
                    password reset instructions..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base font-semibold text-theme-purple tracking-wide uppercase">
              Powerful Features
            </h2>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Intelligent Email Management
            </h3>
            <p className="mt-4 text-xl text-gray-500">
              Everything you need to automate and optimize your email workflow
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-theme-purple/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-theme-purple" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base font-semibold text-theme-purple tracking-wide uppercase">
              How It Works
            </h2>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Streamlined Email Processing
            </h3>
            <p className="mt-4 text-xl text-gray-500">
              Our intelligent system handles your email workflow from start to
              finish
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Horizontal line connecting steps (desktop only) */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
              <div className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-theme-purple z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                {steps.map((step, index) => (
                  <div key={index} className="relative text-center lg:px-4">
                    {/* Step number circle */}
                    <div className="flex justify-center">
                      <div className="relative z-10 w-16 h-16 rounded-full bg-theme-purple flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Step content card */}
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-lg bg-theme-purple/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-theme-purple" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Transform Your Customer Support
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Join thousands of teams saving hours every week
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-bold text-theme-purple">
                  {stat.value}
                </p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-theme-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to transform your email workflow?
            </h2>
            <p className="mt-4 text-xl text-theme-purple-100">
              Start your free trial today and see the difference.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-theme-purple hover:bg-gray-100 px-8 py-3 text-base rounded-lg"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-theme-purple-700 px-8 py-3 text-base rounded-lg"
              >
                <Link href="/demo">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold text-theme-purple tracking-wide uppercase">
              Why Choose Us
            </h2>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              The Smart Way to Handle Customer Emails
            </h3>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Reduce Manual Work
                </h3>
                <p className="mt-4 text-gray-600">
                  Our AI analyzes every email to extract key information,
                  categorize requests, and prioritize responses - all without
                  human intervention.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Automated email categorization",
                    "Priority-based queuing system",
                    "Key information extraction",
                    "Sentiment analysis",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Improve Customer Experience
                </h3>
                <p className="mt-4 text-gray-600">
                  Deliver faster, more accurate responses with our context-aware
                  AI that understands customer needs and maintains brand voice.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Personalized response drafts",
                    "Consistent brand messaging",
                    "Reduced response times",
                    "Higher customer satisfaction",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Footer */}
  <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* Company Info */}
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="bg-theme-purple/10 p-2 rounded-lg">
            <Brain className="h-6 w-6 text-theme-purple" />
          </div>
          <Logo/>
        </div>
        <p className="text-gray-600">
          AI-powered email management that transforms how teams handle customer communications.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-theme-purple transition-colors">
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-theme-purple transition-colors">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-theme-purple transition-colors">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-theme-purple transition-colors">
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Product Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/features" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Features
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/integrations" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Integrations
            </Link>
          </li>
          <li>
            <Link href="/security" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </Link>
          </li>
          <li>
            <Link href="/roadmap" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <Map className="h-4 w-4 mr-2" />
              Roadmap
            </Link>
          </li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/documentation" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Link>
          </li>
          <li>
            <Link href="/guides" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Guides
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Blog
            </Link>
          </li>
          <li>
            <Link href="/support" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Support Center
            </Link>
          </li>
          <li>
            <Link href="/api" className="text-gray-600 hover:text-theme-purple transition-colors flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              API Reference
            </Link>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-4">
          Subscribe to our newsletter for product updates and insights.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-purple focus:border-theme-purple"
          />
          <Button className="w-full bg-theme-purple hover:bg-theme-purple/90 text-white">
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>

    <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} MailAI. All rights reserved.
      </div>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <Link href="/privacy" className="text-gray-500 hover:text-theme-purple text-sm flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-gray-500 hover:text-theme-purple text-sm flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          Terms of Service
        </Link>
        <Link href="/cookies" className="text-gray-500 hover:text-theme-purple text-sm flex items-center">
          <Cookie className="h-3 w-3 mr-1" />
          Cookie Policy
        </Link>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}