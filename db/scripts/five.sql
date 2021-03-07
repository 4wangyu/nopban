select title from movie left join user_movie um on movie.id = um.movie_id where um.rating = 5 order by um.updatedat desc;
