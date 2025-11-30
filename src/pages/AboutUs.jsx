import React from 'react';
import Title from '../hooks/Title';
import Motion from '../components/Motion';

const AboutUs = () => {
  Title("About Us | OneSociety");

  return (
    <main className="bg-black text-gray-300">
      <Motion>


        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About <span className="text-green-500">OneSociety</span>
          </h1>
          <p className="mt-4 max-w-3xl text-gray-400">
            OneSociety is a platform built to bring communities together. 
            Whether it's a cleanup drive, a tree plantation, a charity donation, 
            or an awareness campaign — we help people connect, participate, and create impact.
          </p>
        </section>


        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-10">
          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-6">
              <h3 className="text-white font-semibold text-xl">Our Mission</h3>
              <p className="mt-2 text-sm text-gray-400">
                To inspire collective action by making it easier for people to discover, 
                join, and organize meaningful social events.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-6">
              <h3 className="text-white font-semibold text-xl">What We Do</h3>
              <p className="mt-2 text-sm text-gray-400">
                We provide an intuitive platform for creating events, tracking participation, 
                and building awareness for causes that matter — from environmental action to 
                community outreach programs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-zinc-950 p-6">
              <h3 className="text-white font-semibold text-xl">Why It Matters</h3>
              <p className="mt-2 text-sm text-gray-400">
                Small actions lead to big change. By connecting volunteers, organizers, and 
                local communities, we strengthen the bonds that create a healthier, more 
                responsible society.
              </p>
            </div>

          </div>
        </section>

        <section className="border-y border-gray-800 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">500+</div>
              <div className="text-sm text-gray-400">Community Events Organized</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">10k+</div>
              <div className="text-sm text-gray-400">Active Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">120+</div>
              <div className="text-sm text-gray-400">Cities Reached</div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12">
          <h2 className="text-2xl font-bold text-white">Built for people who care</h2>
          <p className="mt-2 text-sm text-gray-400 max-w-3xl">
            OneSociety was created with a simple belief — that impactful change begins 
            with everyday people working together. Whether you're planting a tree, teaching 
            children, cleaning a beach, or supporting a local cause, you’re shaping the world.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <img
              className="h-12 w-12 rounded-full border border-gray-700"
              src="https://api.dicebear.com/7.x/identicon/svg?seed=GreenLeader"
              alt="Team member"
            />
            <img
              className="h-12 w-12 rounded-full border border-gray-700"
              src="https://api.dicebear.com/7.x/identicon/svg?seed=VolunteerX"
              alt="Team member"
            />
            <img
              className="h-12 w-12 rounded-full border border-gray-700"
              src="https://api.dicebear.com/7.x/identicon/svg?seed=CommunityBuilder"
              alt="Team member"
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-16">
          <div className="rounded-2xl border border-gray-800 bg-linear-to-r from-zinc-950 to-black p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-semibold">
                Join the OneSociety community
              </h3>
              <p className="text-sm text-gray-400">
                Create an account to join events, track your contributions, 
                and stay involved in community-driven initiatives.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="/register"
                className="btn inline-block bg-green-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium transition"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="inline-block border border-gray-700 hover:border-gray-500 text-gray-200 px-5 py-2 rounded-md font-medium transition"
              >
                Login
              </a>
            </div>
          </div>
        </section>

      </Motion>
    </main>
  );
};

export default AboutUs;
