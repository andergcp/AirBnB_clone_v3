$(document).ready(() => {
  const array = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      array.push($(this).attr('data-id'));
    } else if ($(this).prop('checked') === false) {
      array.splice(array.findIndex((element) => element === $(this).attr('data-id')));
    }
  });

  const Host = "77.77.77.7";
  const URL_API = `http://${Host}:5000/api/v1/status/`;
  $.get(URL_API, ({ status }) => {
    if (status === 'OK') {
      $("#api_status").addClass('available');
    } else {
      $("#api.status").removeClass('available');
    }
  });
});
