CREATE TABLE event_stats (
  event_id INT PRIMARY KEY
    REFERENCES events(id)
    ON DELETE CASCADE,

  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  shares INT DEFAULT 0,
  saved INT DEFAULT 0,
  attending INT DEFAULT 0
);
