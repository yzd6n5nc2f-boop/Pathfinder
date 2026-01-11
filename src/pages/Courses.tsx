import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/mock";

const Courses = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-ink">Learning & courses</h2>
        <p className="text-sm text-muted">
          Training and education options to build confidence and skills.
        </p>
      </div>
      <div className="space-y-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="relative isolate rounded-2xl bg-white p-4 shadow-card transition hover:-translate-y-0.5"
          >
            <p className="relative z-10 text-sm font-semibold text-ink">{course.title}</p>
            <p className="relative z-10 text-xs text-muted">{course.summary}</p>
            <div className="relative z-10 mt-2 flex flex-wrap gap-2 text-[11px] text-muted">
              {course.duration ? <span>{course.duration}</span> : null}
              {course.format ? <span>• {course.format}</span> : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
