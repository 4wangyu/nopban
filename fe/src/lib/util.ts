import $ from 'jquery';

export function scrollToTop() {
  $('.home').animate(
    {
      scrollTop: 0,
    },
    'slow'
  );
}
