const category = window.location.hostname.split('.')[0];
const itemId = window.location.pathname.split('/')[2];

let title;
if (['book', 'music'].includes(category)) {
  title = document.querySelector('#wrapper h1 span');
} else if (category === 'movie') {
  title = document.querySelector('#content .year');
}

const exist = document.createElement('span');
exist.innerHTML = '✅';
exist.setAttribute('style', 'margin-left: 10px;');
exist.setAttribute('id', 'exist-in-nopban');

const add = document.createElement('button');
add.innerHTML = '➕';
const style =
  'margin-left: 10px;' +
  'color: transparent;' +
  'border: none;' +
  'height: 26.5px;' +
  'width: 26.5px;';
const styleMouseOver =
  style +
  'text-shadow: 0 0 0 white;' +
  'background: #77b255;' +
  'cursor: pointer;';
const styleMouseOut =
  style + 'text-shadow: 0 0 0 #77b255;' + 'background: none;';
add.setAttribute('style', styleMouseOut);
exist.setAttribute('id', 'add-to-nopban');
add.addEventListener('mouseover', () => {
  add.setAttribute('style', styleMouseOver);
});
add.addEventListener('mouseout', () => {
  add.setAttribute('style', styleMouseOut);
});
add.addEventListener('click', () => {
  html = document.querySelector('#wrapper').innerHTML;
  fetch('http://localhost:3001/api/extension/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category: category,
      uuid: itemId,
      html: html,
    }),
  })
    .then((response) => response.json())
    .then(location.reload())
    .catch(console.error);
});

const checkItemExist = (category, uuid) => {
  const url = new URL('http://localhost:3001/api/extension/exist');
  const params = { category: category, uuid: uuid };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      if (res.result) {
        title.parentNode.insertBefore(exist, title.nextSibling);
      } else {
        title.parentNode.insertBefore(add, title.nextSibling);
      }
      return res;
    });
};

checkItemExist(category, itemId);
