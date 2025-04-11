import { BrowseReviewsList } from "./BrowseReviewsList";
import { LikeNotification } from "./LikeNotification";
import React, { useState } from "react";
import { ErrorPage } from "../ErrorPage";

export function BrowseReviews({ username }) {
  let [error, setError] = useState(null);

  return (
    <>
      {!!error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          {username && <LikeNotification username={username} />}
          <BrowseReviewsList username={username} onSetError={setError} />{" "}
        </>
      )}
    </>
  );
}
