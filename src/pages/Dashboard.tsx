import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { ArrowRightIcon, PhoneIcon } from "../components/Icons";
import {
  communityTopics,
  courses,
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
        <h1 className="mt-2 text-3xl font-semibold text-brand">
          Rebuild your future.
        </h1>
        <p className="mt-2 text-sm font-medium text-muted">
          Connect. Support. Thrive.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-button bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
          >
            Get Support
          </Link>
          <Link
            to="/jobs"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-button bg-amber-gradient px-4 py-2 text-sm font-semibold text-white shadow-card"
          >
            Find opportunities
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            to="/first-meal"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            First meal voucher
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/comms"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            Phone credit
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/sponsor"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            Sponsor contact
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/travel"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            Travel support
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/employers"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            Employers directory
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/resources"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold text-brand"
          >
            Support directory
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <Card title="Support contacts" headerTone="blue">
          <ul className="divide-y divide-line">
            {supportContacts.map((contact) => (
              <li key={contact.id}>
                <Link
                  to={`/contacts/${contact.id}`}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-semibold text-ink">{contact.name}</p>
                    <p className="text-xs text-muted">{contact.role}</p>
                  </div>
                  <span className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-brand-50 px-3 text-xs font-semibold text-brand">
                    <PhoneIcon className="h-4 w-4" />
                    Contact
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Job opportunities"
          headerTone="amber"
          actions={
            <Link to="/jobs" className="text-xs font-semibold text-white/90">
              See all
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {jobOpportunities.slice(0, 3).map((job) => (
              <li key={job.id}>
                <Link
                  to={`/jobs/${job.id}`}
                  className="flex items-center justify-between py-2"
                >
                  <span className="font-semibold text-ink">{job.title}</span>
                  <ArrowRightIcon className="h-4 w-4 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/jobs"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            See all jobs
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>

        <Card
          title="Learning & courses"
          headerTone="neutral"
          actions={
            <Link to="/courses" className="text-xs font-semibold text-white/90">
              Explore
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {courses.slice(0, 2).map((course) => (
              <li key={course.id}>
                <Link
                  to={`/courses/${course.id}`}
                  className="flex items-center justify-between py-2"
                >
                  <span className="font-semibold text-ink">{course.title}</span>
                  <ArrowRightIcon className="h-4 w-4 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            Local colleges and employer-led training options.
          </p>
        </Card>

        <Card
          title="Community forum"
          headerTone="blue"
          actions={
            <Link to="/community" className="text-xs font-semibold text-white/90">
              View
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {communityTopics.map((topic) => (
              <li key={topic.id}>
                <Link
                  to={`/community/${topic.id}`}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <span className="font-semibold text-ink">{topic.title}</span>
                    <span className="ml-2 text-xs text-muted">
                      {topic.repliesCount} replies
                    </span>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/community"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Join the discussion
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
