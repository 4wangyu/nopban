DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

create table Book
(
  Id serial primary key,
  Author varchar(255) not null,
  Title varchar(255) not null
);

CREATE TABLE Users
(
  Id SERIAL PRIMARY KEY NOT NULL,
  Username TEXT,
  Email TEXT,
  Token TEXT,
  PwdDigest TEXT,
  CreatedAt TIMESTAMP
);

insert into Book
  (Author, Title)
values
  ('J.K. Rowling', 'Harry Potter');
