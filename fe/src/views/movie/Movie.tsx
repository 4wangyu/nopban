import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import './movie.scss';
import {
  MovieSearchResult,
  MovieSearchItem,
  MovieSearchPagination,
} from '../../models/movie.model';
import MovieItem from './MovieItem';
import { scrollToTop } from '../../lib/util';

const Movie = () => {
  const [result, setResult] = useState<MovieSearchResult>(INIT_DATA);
  const [searchKey, setSearchKey] = useState<string>('movie');

  function search(start = 0) {
    axios
      .get('api/movie/search', {
        params: {
          searchKey,
          start,
        },
      })
      .then(function (response) {
        setResult(response.data);
        scrollToTop();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onButtonClick={search}
      ></SearchBar>

      <main>
        {result.items?.map((item: MovieSearchItem, idx: number) => (
          <MovieItem key={idx} movie={item}></MovieItem>
        ))}
        <div className="pagination">
          {result.pagination?.map((pag: MovieSearchPagination, idx: number) => (
            <button onClick={() => search(pag.start)} key={idx}>
              {pag.text}
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default Movie;

const INIT_DATA = {
  items: [
    {
      url: 'https://movie.douban.com/subject/1292365/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2513253791.webp',
      title: '活着‎ (1994)',
      metas: [
        '中国大陆 / 中国香港 / 剧情 / 历史 / 家庭 / 人生 / Lifetimes / 132分钟',
        '张艺谋 / 葛优 / 巩俐 / 姜武 / 牛犇 / 郭涛 / 张璐 / 倪大红 / 肖聪',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/26874505/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2544912792.webp',
      title: '人生果实 人生フルーツ‎ (2017)',
      metas: [
        '日本 / 纪录片 / 积存时间的生活(台) / 人生水果 / 91分钟',
        '伏原健之 / 津端修一 / 津端英子 / 树木希林',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/1299042/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p1133142456.webp',
      title: '人生‎ (1984)',
      metas: [
        '中国大陆 / 剧情 / 爱情 / Life / 125分钟',
        '吴天明 / 周里京 / 吴玉芳 / 高保成 / 乔建华 / 李小力',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/2142533/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2170218518.webp',
      title: '人生 ライフ‎ (2007)',
      metas: [
        '日本 / 剧情 / Life / Raifu / 36分钟',
        '谷村政树 / 加藤裕将 / 北乃绮 / 福田沙纪 / 细田善彦 / 大泽茜 / 星井七濑 / 末永遥 / 中村静香 / 夏目铃',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/1306914/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2187053539.webp',
      title: '人生 Life‎ (1999)',
      metas: [
        '美国 / 喜剧 / 犯罪 / 剧情 / 傲笑江湖 / 终身监禁 / 108分钟',
        '泰德·戴米 / 艾迪·墨菲 / 马丁·劳伦斯 / 奥巴·巴巴图德',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/25853123/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2175881833.webp',
      title: '人生Best Ten 人生ベストテン‎ (2013)',
      metas: [
        '日本 / 剧情 / 爱情 / 动画 / 短片 / 成年女性的动画时间：人生Best Ten / 25分钟',
        '三浦阳 / 中谷美纪 / 神谷浩史',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/25772497/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2190898813.webp',
      title: '人生 人生相談テレビアニメーション「人生」‎ (2014)',
      metas: [
        '日本 / 剧情 / 动画 / Jinsei',
        '川口敬一郎 / 内匠靖明 / 新田日和 / 丰田萌绘 / 诹访彩花 / 大西沙织 / 前田玲奈 / 森久保祥太郎 / 内田真礼',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/25847342/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2175300125.webp',
      title: '人生‎ (2014)',
      metas: [
        '中国大陆 / 剧情',
        '杨阳 / 王雨 / 缪婷茹 / 彭杨 / 苏小刚 / 苏廷石 / 黄精一',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/26897885/',
      img:
        'https://img9.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png',
      title: '系统 BIOS‎ (2020)',
      metas: [
        '英国 / 美国 / 科幻 / 人生',
        '米格尔·萨普什尼克 / 汤姆·汉克斯 / 卡赖伯·兰德里·琼斯 / 萨米拉·威利',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/2295847/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2543019971.webp',
      title: '人生‎ (1934)',
      metas: ['中国大陆 / 剧情 / Life', '费穆 / 阮玲玉 / 郑君里 / 林楚楚'],
    },
    {
      url: 'https://movie.douban.com/subject/6960905/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p1596061326.webp',
      title: '多彩人生 人生、いろどり‎ (2012)',
      metas: [
        "日本 / 剧情 / It's a Beautiful Life - Irodor / 112分钟",
        '御法川修 / 吉行和子 / 富司纯子 / 中尾美枝 / 平冈祐太 / 村川绘梨 / 户次重幸',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/3893862/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p1176180817.webp',
      title: '第一排的人生 かぶりつき人生‎ (1968)',
      metas: [
        '日本 / Kaburitsuki jinsei / Life of a Striptease Lover',
        '神代辰巳 / 殿岡ハツ江 / 丹羽志津 / 玉村駿太郎',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/1988012/',
      img: 'https://img9.doubanio.com/view/subject/l/public/s2850369.jpg',
      title: '玫瑰人生 フレーフレー人生!‎ (2001)',
      metas: [
        '日本 / 玫瑰人生',
        '森一弘 / 富塚博司 / 松下由樹 / 赤井英和 / 鈴木紗理奈 / 森公美子 / 宮崎あおい',
      ],
    },
    {
      url: 'https://movie.douban.com/subject/6939519/',
      img: 'https://img9.doubanio.com/view/subject/l/public/s24514575.jpg',
      title: 'もうひとつの人生‎ (1995)',
      metas: ['日本 / 纪录片 / Another Life / 101分钟', '小池征人'],
    },
    {
      url: 'https://movie.douban.com/subject/25775596/',
      img:
        'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2164930574.webp',
      title: '人生游戏 人生ごっこ‎ (2013)',
      metas: ['日本 / 48分钟', '金井紘 / 森岡龍 / 新川優愛 / 池田鉄洋'],
    },
  ],
  pagination: [
    {
      start: 15,
      text: '2',
    },
    {
      start: 30,
      text: '3',
    },
    {
      start: 45,
      text: '4',
    },
    {
      start: 60,
      text: '5',
    },
    {
      start: 75,
      text: '6',
    },
    {
      start: 90,
      text: '7',
    },
    {
      start: 105,
      text: '8',
    },
    {
      start: 120,
      text: '9',
    },
    {
      start: 15,
      text: '后页>',
    },
  ],
};
