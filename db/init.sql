create table Book
(
  Id serial primary key,
  Author varchar(255) not null,
  Title varchar(255) not null
);

insert into Book
  (Author, Title)
values
  ('J.K. Rowling', 'Harry Potter');
