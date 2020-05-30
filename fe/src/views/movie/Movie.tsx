import React from 'react';
import SearchBar from '../../components/SearchBar';
import './movie.scss';

const Movie = () => {
  const [result, setResult] = React.useState([]);

  return (
    <>
      <SearchBar
        url="api/movie/search?searchkey="
        callback={setResult}
      ></SearchBar>

      {JSON.stringify(result)}

      {/* <main>
        <h1>
          西西里的美丽传说 Malèna <span className="year">(2000)</span>
        </h1>

        <div className="content">
          <img
            src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2441988159.webp"
            alt=""
          />
          <section>
            <div>
              <label>导演: </label>
              <output>朱塞佩·托纳多雷</output>
            </div>
            <div>
              <label>编剧: </label>
              <output>朱塞佩·托纳多雷 / 卢恰诺·温琴佐尼</output>
            </div>
            <div>
              <label>主演: </label>
              <output>
                莫妮卡·贝鲁奇 / 朱塞佩·苏尔法罗 / Luciano Federico /
                玛蒂尔德·皮亚纳 / Pietro Notarianni / Gaetano Aronica / Gilberto
                Idonea / Angelo Pellegrino / Gabriella Di Luzio / Pippo
                Provvidenti / 埃丽萨·莫鲁奇 / 奥罗拉·夸特罗基 / 露琪亚·萨多 /
                瓦尼·布拉马蒂 / Salvatore Martino / 安东内洛·普利西 / Noam
                Morgensztern
              </output>
            </div>
            <div>
              <label>类型: </label>
              <output>剧情 / 情色 / 战争</output>
            </div>
            <div>
              <label>制片国家/地区: </label>
              <output>意大利 / 美国</output>
            </div>
            <div>
              <label>语言: </label>
              <output>意大利语 / 英语 / 拉丁语 / 古希腊语</output>
            </div>
            <div>
              <label>上映日期: </label>
              <output>2000-10-27(意大利)</output>
            </div>
            <div>
              <label>片长: </label>
              <output>
                109 分钟 / USA: 92 分钟(heavily cut) / Turkey: 84 分钟(TV
                version)
              </output>
            </div>
            <div>
              <label>又名: </label>
              <output>真爱伴我行(台) / 玛莲娜 / 玛琳娜</output>
            </div>
            <div>
              <label>IMDb链接: </label>
              <output>tt0213847</output>
            </div>
          </section>
        </div>

        <div className="action">
          <span className="rating">
            <label>评价: </label>
            <button className="gold">&#9733; </button>
            <button className="gold">&#9733; </button>
            <button className="gold">&#9733; </button>
            <button>&#9734; </button>
            <button>&#9734; </button>
          </span>

          <span className="remove">
            <button>删除</button>
          </span>
        </div>
      </main> */}
    </>
  );
};

export default Movie;
