import { AxiosError } from 'axios';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
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

function getInternal(): boolean {
  return JSON.parse(localStorage.getItem('internal') || 'true') as boolean;
}

function handleError(err: AxiosError) {
  console.error(err);
  toast.error(err.response?.data.error);
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export {
  arrToStr,
  getName,
  scrollToTop,
  getImdbIdFromUrl,
  getInternal,
  handleError,
  useQuery,
};
