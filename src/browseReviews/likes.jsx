import React from "react";

import { LikeNotifier } from "./likeNotifier";
import "./likes.css";

export function Likes(props) {
  const [event, setEvent] = React.useState([]);

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
    return (
      <div className="event">
        <span className={"like-event"}>
          <span className="like-event-from">@{event.from} </span>
          {event.type}
          <span className="like-event-value"> {event.value}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="likes">
      <div id="like-message">{createMessage()}</div>
    </div>
  );
}
