import { AxiosError } from 'axios';
import $ from 'jquery';
import { toast } from 'react-toastify';
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

function getInbound(): boolean {
  return JSON.parse(localStorage.getItem('inbound') || 'true') as boolean;
}

function handleError(err: AxiosError) {
  console.error(err);
  toast.error(err.message);
}

export {
  arrToStr,
  getName,
  scrollToTop,
  getImdbIdFromUrl,
  getInbound,
  handleError,
};
