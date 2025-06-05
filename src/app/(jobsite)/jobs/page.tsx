import { JobsContainer } from "@/components/jobs";
import React, { Suspense } from "react";

const JobsPage = () => {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsContainer />
    </Suspense>
  );
};

export default JobsPage;
