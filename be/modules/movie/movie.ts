import { Request, Response } from 'express';
import puppet from '../../puppet';
import fs from 'fs';

const url = 'https://search.douban.com/movie/subject_search?search_text=';

const searchMovie = async (request: Request, response: Response) => {
  const searchKey = encodeURI(request.query.searchkey as string);

  const page = await puppet();

  try {
    await page.goto(url + searchKey);
    await page.waitForSelector('#root');
    const bodyHTML = await page.evaluate(
      () => document.getElementById('root').innerHTML
    );
    fs.writeFileSync('s.html', bodyHTML);

    response.status(200).json({ html: 'success' });
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error in fetching search results' });
  } finally {
    await page.close();
  }
};

export default searchMovie;
