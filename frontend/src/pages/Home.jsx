import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl font-serif text-slate-900 leading-tight">
            Your relationships,{" "}
            <span className="text-emerald-500">organized.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            A simple, personal CRM to manage your professional network.
            Track contacts, log interactions, and never lose touch.
          </p>

          <button className="mt-10 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 inline-flex items-center gap-2">
            <Link to={"/register"}>Start for free →</Link>
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-serif text-center text-slate-900 mb-16">
            Everything you need
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Manage Contacts",
                desc:
                  "Keep track of clients, prospects, and all your professional relationships in one place."
              },
              {
                title: "Schedule Meetings",
                desc:
                  "Never miss a follow-up with built-in scheduling and reminders."
              },
              {
                title: "Track Interactions",
                desc:
                  "Log calls, emails, notes, and meetings to maintain context."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-8"
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-100 mb-6" />
                <h3 className="text-lg font-medium text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h2 className="text-3xl font-serif text-slate-900">
            Ready to get started?
          </h2>
          <p className="mt-4 text-slate-600">
            Join and take control of your professional relationships today.
          </p>

          <button className="mt-8 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600">
            <Link to={"/register"}>Create your account</Link>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
