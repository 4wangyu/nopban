import $ from 'jquery';
import { NameLinkModel } from '../models/movie.model';

function arrToStr(strs?: string[]): string {
  if (strs && strs.length) {
    return strs.filter((s) => !!s).join(' / ');
  } else {
    return '';
  }
}

function getName(os?: NameLinkModel[]): string[] | undefined {
  return os?.map((o) => o.name);
}

function scrollToTop() {
  $('.home').animate(
    {
      scrollTop: 0,
    },
    'slow'
  );
}

function getImdbIdFromUrl(url?: string): string | undefined {
  return url?.split('/').reverse()[0];
}

export { arrToStr, getName, scrollToTop, getImdbIdFromUrl };
