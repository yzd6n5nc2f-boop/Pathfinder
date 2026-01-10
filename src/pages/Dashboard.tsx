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
    <div className="flex flex-col gap-4">
      <section
        className="relative overflow-hidden rounded-[24px] px-5 py-6 text-center shadow-card"
        style={{
          backgroundImage:
            "radial-gradient(1200px 220px at 50% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0.65)), linear-gradient(180deg, rgba(35,74,115,0.18), rgba(35,74,115,0))"
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Your next steps
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-brandBlue-end">
          Rebuild Your Future.
        </h1>
        <p className="mt-2 text-sm font-medium text-muted">
          Connect. Support. Thrive.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-button bg-gradient-to-r from-brandBlue-start to-brandBlue-end px-4 py-2 text-sm font-semibold text-white shadow-card"
          >
            Get Support
          </Link>
          <Link
            to="/jobs"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-button bg-gradient-to-r from-accentOrange-start to-accentOrange-end px-4 py-2 text-sm font-semibold text-white shadow-card"
          >
            Find Opportunities
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            to="/first-meal"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brandBlue-end"
          >
            First meal voucher
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/comms"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brandBlue-end"
          >
            Comms credit
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brandBlue-end"
          >
            Sponsor contact
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/travel"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brandBlue-end"
          >
            Travel support
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-3 min-[420px]:grid-cols-2">
        <Card title="Support Contacts" headerTone="blue">
          <ul className="divide-y divide-line">
            {supportContacts.map((contact) => (
              <li
                key={contact.name}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="font-semibold text-ink">{contact.name}</p>
                  <p className="text-xs text-muted">{contact.role}</p>
                </div>
                <button className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#eaf1f8] px-3 text-xs font-semibold text-brandBlue-end">
                  <PhoneIcon className="h-4 w-4" />
                  {contact.action}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Job Opportunities"
          headerTone="amber"
          actions={
            <Link to="/jobs" className="text-xs font-semibold text-white/90">
              See all
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {jobOpportunities.map((job) => (
              <li key={job} className="flex items-center justify-between py-2">
                <span className="font-semibold text-ink">{job}</span>
                <ArrowRightIcon className="h-4 w-4 text-muted" />
              </li>
            ))}
          </ul>
          <Link
            to="/jobs"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accentOrange-end"
          >
            See All Jobs
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>

        <Card
          title="Learning & Courses"
          headerTone="neutral"
          actions={
            <Link
              to="/employers"
              className="text-xs font-semibold text-white/90"
            >
              Explore
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            <li className="flex items-center justify-between py-2">
              <span className="font-semibold text-ink">Skills Training</span>
              <ArrowRightIcon className="h-4 w-4 text-muted" />
            </li>
            <li className="flex items-center justify-between py-2">
              <span className="font-semibold text-ink">Education Programmes</span>
              <ArrowRightIcon className="h-4 w-4 text-muted" />
            </li>
          </ul>
          <p className="text-xs text-muted">
            Local colleges and employer-led training options.
          </p>
        </Card>

        <Card
          title="Community Forum"
          headerTone="blue"
          actions={
            <Link
              to="/community"
              className="text-xs font-semibold text-white/90"
            >
              View
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {communityTopics.map((topic) => (
              <li key={topic.title} className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-ink">{topic.title}</span>
                  <span className="ml-2 text-xs text-muted">
                    {topic.replies} replies
                  </span>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-muted" />
              </li>
            ))}
          </ul>
          <Link
            to="/community"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brandBlue-end"
          >
            Join the Discussion
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
