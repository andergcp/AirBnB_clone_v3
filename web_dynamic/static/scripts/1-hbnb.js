$(document).ready(() => {
  const array = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      array.push($(this).attr('data-id'));
    } else if ($(this).prop('checked') === false) {
      array.splice(array.findIndex((element) => element === $(this).attr('data-id')));
    }
  });
});
