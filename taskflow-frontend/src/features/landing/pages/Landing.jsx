import React, { useEffect, useRef } from 'react';
import { CheckCircle, Users, ClipboardList, Activity, Target, Clock, ChartLine, AlertCircle, Globe, MessageCircle, Mail, FileText } from "lucide-react";

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import GoalsCard from '../components/GoalsCard';

const Landing = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollInterval = setInterval(() => {
      if (!carousel) return;
      carousel.scrollBy({ left: 310, behavior: "smooth" });
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(scrollInterval);
  }, []);

  const testimonials = [
    {
      quote:
        "The automation features have saved us countless hours. It's like having an extra team member.",
      name: "Alice Smith",
      role: "CEO, StartupX",
      initials: "AS",
    },
    {
      quote:
        "Our productivity has increased by 40% since implementing TaskFlow. The results speak for themselves.",
      name: "Robert Johnson",
      role: "Team Lead, Agency Y",
      initials: "RJ",
    },
    {
      quote:
        "TaskFlow has transformed how our team collaborates. The features are incredibly intuitive.",
      name: "John Doe",
      role: "Product Manager, Tech Co",
      initials: "JD",
    },
    {
      quote:
        "I love how everything is streamlined and easy to navigate. Highly recommend TaskFlow!",
      name: "Maria Lopez",
      role: "Operations Head, RetailCo",
      initials: "ML",
    },
    {
      quote:
        "From onboarding to daily use, the experience with TaskFlow has been seamless.",
      name: "James Parker",
      role: "CTO, Innovate LLC",
      initials: "JP",
    },
    {
      quote:
        "Our remote team has never been this productive. TaskFlow is a game-changer!",
      name: "Nina Patel",
      role: "Team Manager, RemoteHub",
      initials: "NP",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <HeroSection />

      {/**Goals & Features */}
      <section className="py-20 px-4 bg-black text-center" id="features">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">These are Our Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          <GoalsCard title="100% Remote Work" desc="Empower teams to achieve deep work and maintain peak productivity anywhere in the world." />
          <GoalsCard title="More in Less Time" desc="Work smarter with automation, analytics, and intuitive workflows that amplify results without burnout." />
          <GoalsCard title="Smart Collaboration" desc="Foster seamless teamwork with communication tools, permissions, and productivity analytics." />
        </div>

        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-16">
          Our vision is to build a world where <span className="text-blue-400 font-semibold">TaskFlow becomes the intelligent backbone of human productivity</span>. Not just a tool but a transformative platform that understands and adapts to how people and organizations truly work.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
        <p className="text-gray-400 mb-10 text-sm">TaskFlow empowers teams to collaborate seamlessly, stay organized, and hit every milestone—without the chaos.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <ClipboardList size={18} className="text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Seamless Task Management</h4>
            <p className="text-gray-400 text-sm">Plan and assign tasks effortlessly with clear deadlines and responsibility tracking for every team member.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <Target size={18} className="text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Smart Prioritization</h4>
            <p className="text-gray-400 text-sm">Organize what matters most and automatically adjust focus areas to meet strategic goals faster.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <ChartLine size={18} className="text-xl text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Real-Time Progress Tracking</h4>
            <p className="text-gray-400 text-sm">Stay informed with live metrics on performance and milestones to keep your team on track.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <Clock size={18} className="text-xl text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Deadline Focused</h4>
            <p className="text-gray-400 text-sm">Keep your team on track with built-in reminders, calendar views, and milestone planning.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <AlertCircle size={18} className="text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Personalized Accountability</h4>
            <p className="text-gray-400 text-sm">Smart alerts and reminders to ensure tasks are completed on time, every time.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-5 text-left">
            <Globe size={18} className="text-blue-400 mb-2" />
            <h4 className="text-xl font-semibold text-white mb-1">Cross-Platform Collaboration</h4>
            <p className="text-gray-400 text-sm">Work across devices and platforms with real-time syncing and collective efficiency.</p>
          </div>
        </div>
      </section>

      {/**How It Works */}
      <section className="bg-neutral-950 border-b-1 border-gray-800 py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Get Started in Minutes</h2>
        <p className="text-gray-400 text-sm mb-10">Seamless setup process to help you take control of your tasks</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          <div className="border border-gray-800 p-6 bg-gray-900 rounded-lg text-left">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full text-blue-800 font-bold">1</div>
              <h3 className="text-white font-semibold text-xl">Sign Up</h3>
            </div>
            <p className="text-gray-400 text-sm">Create your TaskFlow account using your email. It only takes a minute to get started.</p>
          </div>
          <div className="border border-gray-800 p-6 bg-gray-900 rounded-lg text-left">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-blue-400 bg-blue-200 font-semibold text-xl text-center leading-12 w-12 h-12 rounded-full">2</h3>
              <h3 className="text-white font-semibold text-xl">Set Up Workspace</h3>
            </div>
            <p className="text-gray-400 text-sm">Create projects, invite teammates, and define your workflow — all in one place.</p>
          </div>
          <div className="border border-gray-800 p-6 bg-gray-900 rounded-lg text-left">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-blue-400 bg-blue-200 font-semibold text-xl text-center leading-12 w-12 h-12 rounded-full">3</h3>
              <h3 className="text-white font-semibold text-xl">Start Collaborating</h3>
            </div>
            <p className="text-gray-400 text-sm">Assign tasks, set deadlines, and watch your team thrive with real-time updates and smart notifications.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-6 text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Setup Guide</h4>
            <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Go to taskflow.app in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Create an account using your email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Set up your team or join an existing workspace</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Define your workflow and task categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Invite teammates and assign roles</span>
                </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 text-left">
            <h4 className="text-lg font-semibold mb-4">24/7 Support</h4>
            <p className="text-gray-400 mb-4">
            Need help? The TaskFlow team is always here for you.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                Live chat support
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Email assistance
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                In-depth documentation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/**Testimonial */}
      <section className="bg-neutral-950 border-b-1 border-gray-800 py-20 px-4 overflow-hidden" id="testimonials">
        <div className=" text-center"> {/**max-w-6xl mx-auto */}
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Trusted by Teams Worldwide</h2>
          <p className="text-gray-400 text-lg mb-12">
            See what our users have to say about TaskFlow
          </p>
          <div className=" relative">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div ref={carouselRef} className="flex overflow-x-auto gap-6 scrollbar-hide">
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-[400px] bg-gray-900 border border-gray-700 rounded-2xl p-6 text-left shrink-0"
                >
                  <p className="text-sm text-gray-200 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/**Pricing Plans */}
      <section className="bg-neutral-950 border-b-1 border-gray-800 py-20 px-4 md:px-16" id="pricing">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Flexible Pricing for Every Team
          </h2>
          <p className="text-gray-400 text-lg mb-16">
            Choose a plan that fits your workflow. Whether you’re just starting out or scaling up, TaskFlow grows with you.
          </p>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* Free Plan */}
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-t from-blue-500 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative border border-gray-700 rounded-2xl p-8 h-full text-left bg-gray-900">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-white">$0</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-gray-400">Perfect for individual users and small projects.</p>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-4 flex-grow mb-8">
                    <li className="flex items-center gap-3 text-zinc-300"><svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Up to 3 users</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Basic task management</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Real-time updates</li>
                  </ul>
                  <button className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors">Get Started</button>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative group">
            <div className="absolute inset-0.5 bg-gradient-to-t from-blue-500 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative border border-gray-700 rounded-2xl p-8 h-full text-left bg-gray-900">
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <span className="bg-blue-500 text-black text-sm font-medium px-3 py-1 rounded-full">Popular</span>
                </div>
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-white">$12</span>
                      <span className="text-gray-400">/user/month</span>
                    </div>
                    <p className="text-gray-400">Ideal for teams and growing businesses.</p>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-4 flex-grow mb-8">
                  <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Everything in Basic</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Unlimited projects</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Task automation</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Advanced reporting</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Priority support</li>
                  </ul>
                  <button className="w-full bg-blue-500 text-black py-2 rounded-lg hover:bg-blue-400 transition-colors font-medium">Start Free Trial</button>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-t from-blue-500 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative border border-gray-700 rounded-2xl p-8 h-full text-left bg-gray-900">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-white">$40</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-gray-400">Advanced features for larger organizations.</p>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-4 flex-grow mb-8">
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Everything in Pro</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated account manager</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Comprehensive user analytics</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Custom integrations</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Enterprise grade security</li>
                    <li className="flex items-center gap-3 text-zinc-300"><svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Dedicated support</li>
                  </ul>
                  <button className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors">Contact Sales</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**FAQs */}
      <section className="bg-neutral-950 border-b-1 border-gray-800 py-20 px-4 text-center md:px-16 text-white" id="faq">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg mb-16">
            Everything you need to know about TaskFlow.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                How does task tracking work?
              </h3>
              <p className="text-gray-400 text-sm">
                TaskFlow automatically monitors your tasks, organizes them by priority and type, and provides actionable insights based on your workflow. It helps you stay organized and efficient.
              </p>
            </div>

            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                What makes the prioritization system unique?
              </h3>
              <p className="text-gray-400 text-sm">
                Our prioritization system evaluates deadlines, workload, and urgency to recommend the most effective order for your tasks. It adjusts in real time based on changing project needs.
              </p>
            </div>

            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                How does real-time progress tracking benefit me?
              </h3>
              <p className="text-gray-400 text-sm">
                Real-time tracking provides immediate visibility into task completion, project milestones, and team productivity, helping you make informed decisions and stay ahead of deadlines.
              </p>
            </div>

            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                What is adaptive learning in TaskFlow?
              </h3>
              <p className="text-gray-400 text-sm">
                TaskFlow adjusts recommendations and task automation based on your workflow patterns, preferences, and project behavior to continuously optimize your experience.
              </p>
            </div>

            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                How do accountability nudges work?
              </h3>
              <p className="text-gray-400 text-sm">
                Gentle reminders help keep you on track without being disruptive. These nudges are based on your typical work habits and are timed to support your productivity.
              </p>
            </div>

            {/* FAQ Item */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                Can I collaborate across different platforms?
              </h3>
              <p className="text-gray-400 text-sm">
                Absolutely. TaskFlow enables real-time syncing across devices, so your updates and tasks are always accessible whether you're on desktop, mobile, or web.
              </p>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-400">
            Still have questions? <a href="#contact" className="text-blue-500 font-semibold hover:underline">Contact Support →</a>
          </div>
        </div>
      </section>

      {/**Call to Action */}
      <section className="bg-neutral-950 border-b-1 border-gray-800 py-20 px-4 md:px-16 text-center">
        <div className="max-w-6xl mx-auto border border-gray-800 rounded-2xl p-18">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h3>
          <p className="text-gray-400 text-lg mb-8">Join thousands of teams who have already revolutionized their productivity with TaskFlow.</p>
          <a href="/register" className="bg-white text-black px-8 py-3 inline-flex items-center gap-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
};

export default Landing;