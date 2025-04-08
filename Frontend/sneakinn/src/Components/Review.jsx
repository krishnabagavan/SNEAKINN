import React from "react";

const Review = ({ data }) => {
  return (
    <div className="bg-100 p-4 mt-4 rounded">
      <h4 className="font-semibold mb-2">Final Review</h4>
      <pre className="text-sm  p-2 rounded border overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Review;

  