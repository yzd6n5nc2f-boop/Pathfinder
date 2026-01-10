import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useToast } from "../components/Toast";
import { courses } from "../data/mock";

const STORAGE_KEY = "pf_saved_courses";

const CourseDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted">Course not found.</p>
        <Link to="/courses" className="text-sm font-semibold text-brand">
          Back to courses
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved = raw ? (JSON.parse(raw) as string[]) : [];
    const next = saved.includes(course.id) ? saved : [...saved, course.id];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    showToast("Saved to your plan (prototype).");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Course details
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{course.title}</h2>
        <p className="text-sm text-muted">{course.summary}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
          {course.duration ? <span>{course.duration}</span> : null}
          {course.format ? <span>• {course.format}</span> : null}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">What you’ll learn</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {course.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold text-ink">How to start</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
          {course.howToStart.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      {course.areas && course.areas.length > 0 ? (
        <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">
          Local options: {course.areas.join(", ")}.
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="amber" onClick={handleSave}>
          Save to my plan
        </Button>
        <Link
          to="/courses"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line px-4 py-2 text-sm font-semibold text-muted"
        >
          Back to courses
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
