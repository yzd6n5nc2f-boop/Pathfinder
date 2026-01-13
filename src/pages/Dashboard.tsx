import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import {
  ArrowRightIcon,
  MapIcon,
  PhoneIcon,
  ResourceIcon
} from "../components/Icons";
import {
  communityTopics,
  courses,
  jobOpportunities,
  supportContacts
} from "../data/mock";

const Dashboard = () => {
  const heroTiles = [
    {
      label: "Get Support",
      to: "/sponsor",
      icon: PhoneIcon,
      tone:
        "bg-brand-gradient text-white shadow-card hover:shadow-card focus-visible:ring-brand/40"
    },
    {
      label: "Find opportunities",
      to: "/jobs",
      icon: ResourceIcon,
      tone:
        "bg-amber-gradient text-white shadow-card hover:shadow-card focus-visible:ring-amber-300/60"
    },
    {
      label: "Learning & courses",
      to: "/courses",
      icon: ResourceIcon,
      tone:
        "bg-neutral-gradient text-white shadow-card hover:shadow-card focus-visible:ring-slate-200/60"
    },
    {
      label: "First meal voucher",
      to: "/first-meal",
      icon: ResourceIcon,
      tone:
        "border border-brand-100 bg-brand-50 text-brand shadow-card/40 hover:shadow-card focus-visible:ring-brand/30"
    },
    {
      label: "Phone credit",
      to: "/comms",
      icon: PhoneIcon,
      tone:
        "border border-amber-100 bg-amber-50 text-amber-900 shadow-card/40 hover:shadow-card focus-visible:ring-amber-200/70"
    },
    {
      label: "Travel support",
      to: "/travel",
      icon: MapIcon,
      tone:
        "border border-slate-200 bg-white text-ink shadow-card/40 hover:shadow-card focus-visible:ring-slate-200/70"
    }
  ];

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
        <div className="mt-6 grid grid-cols-2 gap-3">
          {heroTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.to}
                to={tile.to}
                className={`group flex min-h-[96px] flex-col items-start justify-between gap-3 rounded-[18px] p-4 text-left text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 ${tile.tone}`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-current shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex w-full items-center justify-between gap-2">
                  {tile.label}
                  <ArrowRightIcon className="h-4 w-4 opacity-70" />
                </span>
              </Link>
            );
          })}
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
