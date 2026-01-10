import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { ArrowRightIcon, PhoneIcon } from "../components/Icons";
import {
  communityTopics,
  jobOpportunities,
  supportContacts
} from "../data/mock";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-5 py-8 text-white shadow-card sm:px-8">
        <p className="text-sm uppercase tracking-wide text-white/70">Your next steps</p>
        <h1 className="mt-2 text-3xl font-semibold">Rebuild Your Future.</h1>
        <p className="mt-2 text-base text-white/80">Connect. Support. Thrive.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Get Support
          </Link>
          <Link
            to="/jobs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Find Opportunities
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/first-meal"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            First meal voucher
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/comms"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            Comms credit
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            Sponsor contact
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/travel"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
          >
            Travel support
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="Support Contacts" headerTone="blue">
          <ul className="space-y-3">
            {supportContacts.map((contact) => (
              <li key={contact.name} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{contact.name}</p>
                  <p className="text-xs text-slate-500">{contact.role}</p>
                </div>
                <button className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-brand-50 px-3 text-xs font-semibold text-brand-700">
                  <PhoneIcon className="h-4 w-4" />
                  {contact.action}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Job Opportunities" headerTone="amber" actions={<Link to="/jobs" className="text-xs font-semibold text-amber-700">See all</Link>}>
          <ul className="space-y-2">
            {jobOpportunities.map((job) => (
              <li key={job} className="flex items-center justify-between">
                <span>{job}</span>
              </li>
            ))}
          </ul>
          <Link to="/jobs" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
            See All Jobs
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>

        <Card title="Learning & Courses" headerTone="neutral" actions={<Link to="/employers" className="text-xs font-semibold text-slate-600">Explore</Link>}>
          <ul className="space-y-2">
            <li className="font-semibold text-ink">Skills Training</li>
            <li className="font-semibold text-ink">Education Programmes</li>
          </ul>
          <p className="text-xs text-slate-500">Local colleges and employer-led training options.</p>
        </Card>

        <Card title="Community Forum" headerTone="blue" actions={<Link to="/community" className="text-xs font-semibold text-brand-700">View</Link>}>
          <ul className="space-y-2">
            {communityTopics.map((topic) => (
              <li key={topic.title} className="flex items-center justify-between">
                <span className="font-semibold text-ink">{topic.title}</span>
                <span className="text-xs text-slate-500">{topic.replies} replies</span>
              </li>
            ))}
          </ul>
          <Link to="/community" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            Join the Discussion
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
