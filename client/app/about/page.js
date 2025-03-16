import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Globe, Shield, MessageSquare } from "lucide-react"
import Footer from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=600&width=1920&text=About AccommoFind"
              alt="About AccommoFind"
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About AccommoFind</h1>
              <p className="text-xl text-white/90 mb-8">
                We're on a mission to make finding the perfect accommodation simple, transparent, and enjoyable for
                travelers around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h2>
                <p className="text-slate-600 mb-4">
                  AccommoFind was founded in 2023 with a simple idea: make finding and booking accommodations as easy
                  and transparent as possible. We noticed that travelers often struggled with complicated booking
                  processes, hidden fees, and unreliable listings.
                </p>
                <p className="text-slate-600 mb-4">
                  Our team of travel enthusiasts and technology experts came together to create a platform that puts the
                  traveler first. We believe that finding a place to stay should be part of the adventure, not a source
                  of stress.
                </p>
                <p className="text-slate-600">
                  Today, AccommoFind connects travelers with thousands of quality accommodations worldwide, from cozy
                  apartments to luxury villas, all with transparent pricing and verified information.
                </p>
              </div>

              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Our Story"
                  alt="Our Story"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparency",
                  description: "We believe in clear, upfront pricing with no hidden fees or surprises.",
                  icon: Shield,
                },
                {
                  title: "Quality",
                  description: "Every listing on our platform is verified to ensure accuracy and quality.",
                  icon: Building,
                },
                {
                  title: "Community",
                  description: "We foster connections between travelers and hosts, creating a global community.",
                  icon: Globe,
                },
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Meet Our Team</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-center mb-12">
              We're a diverse team of travel enthusiasts, technology experts, and customer service professionals
              dedicated to making your accommodation search experience exceptional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  bio: "Travel enthusiast with 15+ years in the hospitality industry.",
                },
                {
                  name: "Sarah Chen",
                  role: "Chief Technology Officer",
                  bio: "Tech innovator passionate about creating seamless user experiences.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Customer Experience",
                  bio: "Dedicated to ensuring every traveler has an exceptional experience.",
                },
                {
                  name: "Emma Williams",
                  role: "Marketing Director",
                  bio: "Creative strategist connecting travelers with their perfect accommodations.",
                },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-64 bg-slate-200 relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${member.name}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Have questions, feedback, or just want to say hello? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
                <MessageSquare className="mr-2 h-5 w-5" /> Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="mr-2 h-5 w-5" /> Join Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

