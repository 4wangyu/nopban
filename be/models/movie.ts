import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';

const searchMovie = (request: Request, response: Response) => {
  const searchKey = encodeURI(request.query.searchkey as string);
  axios
    .get('https://movie.douban.com/j/subject_suggest?q=' + searchKey)
    .then((res) => {
      response.status(200).json(res.data);
    })
    .catch((e: AxiosError) => {
      response.status(400).json({
        error: e.message,
      });
    });
};

export default searchMovie;
