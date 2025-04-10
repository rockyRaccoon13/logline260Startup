import { BrowseReviews } from "./browseReviews";
import { LikeNotification } from "./LikeNotification";
import React from "react";

export function Browse({ username }) {
  return (
    <>
      {username && <LikeNotification username={username} />}
      <BrowseReviews username={username} />
    </>
  );
}
