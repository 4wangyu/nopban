const exist = document.createElement('span');
exist.innerHTML = '✅';
exist.setAttribute('style', 'margin-left: 10px;');

const add = document.createElement('span');
add.innerHTML = '➕';
add.setAttribute(
  'style',
  'margin-left: 10px;color: transparent;text-shadow: 0 0 0 #77b255;'
);

const category = window.location.hostname.split('.')[0];
const itemId = window.location.pathname.split('/')[2];

const url = new URL('http://localhost:3001/api/extension/exist');
const params = { category: category, uuid: itemId };
Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

let title;
if (['book', 'music'].includes(category)) {
  title = document.querySelector('#wrapper h1 span');
} else if (category === 'movie') {
  title = document.querySelector('#content .year');
}

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
