CREATE TABLE event_likes (
  user_id UUID
    REFERENCES users(id)
    ON DELETE CASCADE,

  event_id INT
    REFERENCES events(id)
    ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (user_id, event_id)
);
