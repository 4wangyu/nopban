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
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import MoviePage from './MoviePage';

const Movie = () => {
  const [result, setResult] = useState<MovieSearchResult>(INIT_DATA);
  const [searchKey, setSearchKey] = useState<string>('movie');
  let { path } = useRouteMatch();
  const history = useHistory();

  function search(start = 0) {
    axios
      .get('/api/movie/search', {
        params: {
          searchKey,
          start,
        },
      })
      .then(function (response) {
        setResult(response.data);
        history.push('/movie');
        scrollToTop();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function refreshResult(idx: number, movie: MovieSearchItem) {
    const list = [...result.items];
    list[idx] = movie;
    setResult({ items: list, pagination: result.pagination });
  }

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onButtonClick={search}
      ></SearchBar>

      <main>
        <Switch>
          <Route exact path={path}>
            {result.items?.map((item: MovieSearchItem, idx: number) => (
              <MovieItem
                key={idx}
                idx={idx}
                movie={item}
                refreshResult={refreshResult}
              ></MovieItem>
            ))}
            <div className="pagination">
              {result.pagination?.map(
                (pag: MovieSearchPagination, idx: number) => (
                  <button
                    disabled={pag.start === null}
                    onClick={() => search(pag.start as number)}
                    key={idx}
                  >
                    {pag.text}
                  </button>
                )
              )}
            </div>
          </Route>
        </Switch>

        <Switch>
          <Route path={`${path}/:movieId`}>
            <MoviePage></MoviePage>
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Movie;

const INIT_DATA = {
  items: [
    {
      url: 'https://movie.douban.com/subject/3318306/',
      title: '电影43 Movie 43‎ (2013)',
      metas: [
        '美国 / 喜剧 / 丧星玩转荷里活(港) / 激爱543(台) / 94分钟',
        '伊丽莎白·班克斯 / 史蒂文·布里尔 / 拉斯提·坎蒂耶夫  / 斯蒂芬·卡尔 / 詹姆斯·达菲 / 格里芬·邓恩 / 彼得·法雷里 / 帕特里克·福斯贝里 / 詹姆斯·古恩 / 鲍勃·奥登科克 / 布莱特·拉特纳 / 艾玛·斯通 / 杰瑞米·艾伦·怀特 / 科洛·莫瑞兹 / 休·杰克曼 / 杰拉德·巴特勒 / 乔什·杜哈明 / 安娜·法瑞丝',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/30376846/',
      title: 'M.O.V.I.E‎ (2013)',
      metas: ['法国 / 5分钟', 'Gérard Cairaschi'],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/5165044/',
      title: '(Movie...)‎ (2009)',
      metas: ['美国 / 短片 / 剧情', 'Jacob East'],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/5192906/',
      title: 'Movie‎ (2007)',
      metas: ['捷克 / Republic of Macedonia / 剧情 / 84分钟', '伊沃·塔季科夫'],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/34453655/',
      title: 'The Little Kids: Movie‎ (2020)',
      metas: [
        '美国 / 儿童 / 动作',
        '李·昂克里奇 / 黛比·德里贝里 / 塔拉·斯特朗 / Kate Soucie / 弗兰·布里尔',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/30372377/',
      title: '续命之徒：绝命毒师电影 El Camino: A Breaking Bad Movie‎ (2019)',
      metas: [
        '美国 / 剧情 / 犯罪 / 惊悚 / 绝命毒师电影：续命之徒 / 格林布莱尔 / 122分钟',
        '文斯·吉里根 / 亚伦·保尔 / 乔纳森·班克斯 / 马特·琼斯 / 查尔斯·贝克 / 托德·特里 / 朱莉·珀尔 / 格雷戈里·史蒂文·索里兹 / 拉里·哈金',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/26282448/',
      title: '火影忍者剧场版：博人传 BORUTO -NARUTO THE MOVIE-‎ (2015)',
      metas: [
        '日本 / 动作 / 动画 / 冒险 / 火影忍者剧场版：幕留人(港) / 火影忍者剧场版：博人 / 96分钟',
        '山下宏幸 / 三瓶由布子 / 菊池心 / 木岛隆一 / 竹内顺子 / 中村千绘 / 杉山纪彰 / 早见沙织 / 水树奈奈',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/27119724/',
      title: '小丑 Joker‎ (2019)',
      metas: [
        '美国 / 加拿大 / 剧情 / 犯罪 / 惊悚 / 小丑起源电影：罗密欧 / Romeo / 122分钟',
        '托德·菲利普斯 / 华金·菲尼克斯 / 罗伯特·德尼罗 / 马克·马龙 / 莎姬·贝兹 / 谢伊·惠格姆 / 弗兰西丝·康罗伊 / 布莱恩·考伦 / 布莱恩·泰里·亨利',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/26628382/',
      title: '小羊肖恩2：末日农场 A Shaun the Sheep Movie: Farmageddon‎ (2019)',
      metas: [
        '英国 / 法国 / 美国 / 喜剧 / 科幻 / 动画 / 冒险 / 小羊肖恩2 / 笑笑羊大电影2：外星人来了！(台) / 87分钟',
        '威尔·比彻 / 理查德·费兰 / 贾斯汀·弗莱彻 / 约翰·斯帕克斯 / 克里斯·莫雷尔 / 安迪·尼曼 / 戴维·霍尔特 / 凯特·哈伯 / 阿玛莉亚·维塔莱 / 乔·萨格',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/11808948/',
      title: '海绵宝宝 The SpongeBob Movie: Sponge Out of Water‎ (2015)',
      metas: [
        '美国 / 喜剧 / 动画 / 冒险 / 海绵宝宝：海陆大出击(台) / 海绵宝宝历险记：海绵出水 / 93分钟',
        '保罗·提比特 / 迈克·米切尔 / 安东尼奥·班德拉斯 / 艾瑞克·鲍扎 / 蒂姆·康威 / 埃迪·狄森 / 罗伯·鲍森 / 凯文·迈克尔·理查德森 / 艾普尔·斯图瓦特 / 克里·萨莫',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/27602116/',
      title:
        '我的英雄学院：两位英雄 僕のヒーローアカデミア THE MOVIE ～2人の英雄～‎ (2018)',
      metas: [
        '日本 / 动作 / 动画 / 我的英雄学院剧场版：2人的英雄 / Boku no Hero Academia the Movie / 96分钟',
        '长崎健司 / 山下大辉 / 三宅健太 / 志田未来 / 生濑胜久 / 冈本信彦 / 佐仓绫音 / 石川界人 / 梶裕贵',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/24397586/',
      title: '小羊肖恩 Shaun the Sheep Movie‎ (2015)',
      metas: [
        '英国 / 法国 / 喜剧 / 动画 / 冒险 / 小羊肖恩大电影 / 超级无敌羊咩咩大电影之咩最劲(港) / 85分钟',
        '马克·伯顿 / 理查德·斯塔扎克 / 贾斯汀·弗莱彻 / 约翰·斯帕克斯 / 欧米德·吉亚李利 / 理查德·韦伯 / 凯特·哈伯 / 安迪·尼曼 / 西蒙·格林诺 / 艾玛·泰特',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/1299981/',
      title: '惊声尖笑 Scary Movie‎ (2000)',
      metas: [
        '美国 / 喜剧 / 恐怖电影 / 搞乜鬼夺命杂作 / 88分钟',
        '基伦·埃弗瑞·韦恩斯 / 安娜·法瑞丝 / 乔恩·亚伯拉罕斯 / 马龙·韦恩斯 / 戴夫·谢里登 / 莎诺·伊丽莎白 / 洛奇林·莫罗 / 肖恩·韦恩斯 / 雷吉娜·赫尔',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/26863060/',
      title: '愤怒的小鸟2 The Angry Birds Movie 2‎ (2019)',
      metas: [
        '芬兰 / 美国 / 喜剧 / 动画 / 冒险 / 愤怒鸟大电影2(港) / 愤怒鸟玩电影2(台) / 96分钟',
        '图鲁普·范·奥尔曼 / 杰森·苏戴奇斯 / 比尔·哈德尔 / 乔什·加德 / 丹尼·麦克布莱德 / 彼特·丁拉基 / 妮琪·米娜 / 斯特林·K·布朗 / 莱斯莉·琼斯',
      ],
      saved: false,
    },
    {
      url: 'https://movie.douban.com/subject/26145033/',
      title: '乐高蝙蝠侠大电影 The Lego Batman Movie‎ (2017)',
      metas: [
        '美国 / 喜剧 / 动作 / 动画 / 冒险 / Lego蝙蝠侠英雄传(港) / 乐高蝙蝠侠电影(台) / 105分钟',
        '克里斯·麦凯 / 威尔·阿奈特 / 罗莎里奥·道森 / 拉尔夫·费因斯 / 迈克尔·塞拉 / 扎克·加利凡纳基斯 / 珍妮·斯蕾特 / 苏珊·本尼特 / 玛丽亚·凯莉',
      ],
      saved: false,
    },
  ],
  pagination: [
    {
      start: null,
      text: '<前页',
    },
    {
      start: null,
      text: '1',
    },
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
