import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, Building, CheckCircle, HelpCircle } from "lucide-react"
import Footer from "@/components/footer"

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">How AccommoFind Works</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              We make finding and booking your perfect accommodation simple, secure, and stress-free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
              >
                Browse Listings
              </Button>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Your Journey with AccommoFind</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: 1,
                  title: "Search & Discover",
                  description:
                    "Browse thousands of verified properties using our advanced filters to find your perfect match.",
                  icon: Search,
                  color: "from-teal-600 to-teal-400",
                },
                {
                  step: 2,
                  title: "Book Securely",
                  description:
                    "Reserve your accommodation with our secure payment system and receive instant confirmation.",
                  icon: Calendar,
                  color: "from-blue-600 to-blue-400",
                },
                {
                  step: 3,
                  title: "Enjoy Your Stay",
                  description: "Arrive at your destination and enjoy a comfortable, hassle-free experience.",
                  icon: Building,
                  color: "from-indigo-600 to-indigo-400",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="absolute -left-4 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <Card className="pt-8 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r bg-slate-100 flex items-center justify-center mb-4">
                        <item.icon className="h-8 w-8 text-slate-700" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Guests */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">For Guests</h2>
                <p className="text-slate-600 mb-8">
                  Finding and booking your ideal accommodation has never been easier. AccommoFind provides a seamless
                  experience from search to stay.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Advanced Search Filters",
                      description:
                        "Filter by location, price, amenities, and more to find exactly what you're looking for.",
                    },
                    {
                      title: "Verified Properties",
                      description: "All listings are verified to ensure quality and accuracy of information.",
                    },
                    {
                      title: "Secure Payments",
                      description: "Book with confidence using our secure payment system.",
                    },
                    {
                      title: "24/7 Support",
                      description: "Our customer support team is available around the clock to assist you.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-800">{feature.title}</h3>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Guest Experience"
                  alt="Guest Experience"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How do I book an accommodation?",
                  answer:
                    "Simply search for your desired location, browse available properties, select your dates, and complete the booking process. You'll receive an instant confirmation.",
                },
                {
                  question: "Can I cancel my booking?",
                  answer:
                    "Yes, cancellation policies vary by property. The specific policy will be clearly displayed before you complete your booking.",
                },
                {
                  question: "How do I contact the property owner?",
                  answer:
                    "After booking, you'll have access to the host's contact information through our messaging system.",
                },
                {
                  question: "Are the prices shown the final prices?",
                  answer:
                    "The prices shown include the nightly rate. Additional fees such as cleaning fees and service charges will be displayed before you complete your booking.",
                },
                {
                  question: "How do I leave a review?",
                  answer:
                    "After your stay, you'll receive an email invitation to leave a review for the property and host.",
                },
                {
                  question: "Is my payment secure?",
                  answer:
                    "Yes, we use industry-standard encryption and secure payment processors to ensure your financial information is protected.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <HelpCircle className="h-5 w-5 mr-2 text-teal-600 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-600 mb-4">Still have questions? We're here to help.</p>
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Contact Support
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Stay?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied travelers who have found their ideal accommodations with AccommoFind.
            </p>
            <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
              Start Browsing Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

