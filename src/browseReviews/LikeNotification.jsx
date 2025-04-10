import React from "react";

import { LikeEvent, LikeNotifier } from "./likeNotifier";
import "./notification.css";

export function LikeNotification(props) {
  const [event, setEvent] = React.useState([]);

  React.useEffect(() => {
    LikeNotifier.addHandler(handleLikeEvent);

    return () => {
      LikeNotifier.removeHandler(handleLikeEvent);
    };
  });

  function handleLikeEvent(event) {
    setEvent(event);
  }

  function createMessage() {
    let msgBody = undefined;
    if (event.type === LikeEvent.System) {
      msgBody = <span className="action">{event.value.msg}</span>;
    }

    if (event.type === LikeEvent.Liked) {
      const timeString = new Date(event.value.time).toLocaleString();
      msgBody = (
        <>
          <span className="action">liked </span>
          <span className="subject">
            {event.value.username === props.username
              ? "your "
              : `@${event.value.username}'s`}
          </span>
          <span>{" review of "}</span>
          <span className="object movieTitle">{event.value.movieTitle}</span>
          <span>{"on " + timeString} </span>
        </>
      );
    }

    return (
      <div className="event">
        <span className={"notification-event"}>
          {event.type === LikeEvent.System ? "🔌" : "🔔"}{" "}
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
      <div id="message">{createMessage()}</div>
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
