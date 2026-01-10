import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { jobOpportunities } from "../data/mock";

const Jobs = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <Link to="/employers" className="text-sm font-semibold text-brand-700">
          Employers directory
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-ink">Job opportunities</h2>
      <div className="space-y-3">
        {jobOpportunities.map((job) => (
          <div key={job} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-semibold text-ink">{job}</p>
            <p className="text-xs text-slate-500">Apply with support from your adviser.</p>
            <Button className="mt-3" variant="secondary">
              Save job
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
