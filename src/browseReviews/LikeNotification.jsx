import React from "react";

import { LikeEvent, LikeNotifier } from "./likeNotifier";
import "./notification.css";

export function LikeNotification(props) {
  const [event, setEvent] = React.useState(undefined);

  React.useEffect(() => {
    LikeNotifier.addHandler(handleLikeEvent);

    return () => {
      LikeNotifier.removeHandler(handleLikeEvent);
    };
  }, []);

  function handleLikeEvent(event) {
    setEvent(event);
  }

  function createMessage() {
    const timeString = event?.value?.time
      ? new Date(event.value.time).toLocaleString()
      : new Date(Date.now()).toLocaleString();
    let msgBody = undefined;
    if (event.type === LikeEvent.System) {
      msgBody = <span className="action">{event.value.msg}</span>;
    }

    if (event.type === LikeEvent.Liked) {
      msgBody = (
        <>
          <span className="action">liked </span>
          <span className="subject">
            {event.value.review.username === props.username
              ? "your "
              : `@${event.value.review.username}'s`}
          </span>
          <span>{" review of "}</span>
          <span className="object movieTitle">
            {event.value.review.movieTitle}
          </span>
        </>
      );
    }

    return (
      <div className="event">
        <span className={"notification-event"}>
          {event.type === LikeEvent.System ? "🔌" : "🔔"}{" "}
          <span className="notification-event-time">{timeString + " - "}</span>
          <span className="notification-event-from">
            {event.type !== LikeEvent.System ? "@" : ""}
            {event.from ? event.from : null}{" "}
          </span>
          <span className="notification-event-body">{msgBody}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="notifications">
      <div id="message">{event && createMessage()}</div>
    </div>
  );
}

// like: {
//   review: {
//     movieTitle: review.movieTitle,
//     username: review.username,
//     numLikes: review.likedBy.length,
//   },
//   time: Date.now(),
// },
// user: {
//   username: likerUsername,
//   hasLiked: userHasLiked,
// },
