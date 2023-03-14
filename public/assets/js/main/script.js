function add_sales_report() {
  $(document).ready(function () {
    $('#product_name').on('change', function () {
      var selectedProduct = $('#product_name :selected').text()

      $.ajax({
        method: 'POST',
        url: '/sales/details',
        data: { product_name: selectedProduct },
        dataType: 'json',
        success: function (response) {
          if (response == 'FALSE') {
            var message = 'ERROR: something went wrong please try again later.'
            alert(message)
          } else {
            $('#stockAvailable').val(response.data.stock_available)
            $('#unity_price').val(response.data.uty_price)
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var message =
            'ERROR: Something went wrong with this request ' +
            textStatus +
            '- ' +
            errorThrown +
            ' - ' +
            jqXHR
          alert(message)
        },
      })
    })
  })
}
add_sales_report()

// function forgot_password(){

//   $(document).ready(function() {

//     // Change the item quantity
//     $(".itemQty").on('change', function() {
//       var $el = $(this).closest('tr');

//       var pid = $el.find(".pid").val();
//       var pprice = $el.find(".pprice").val();
//       var qty = $el.find(".itemQty").val();
//       location.reload(true);
//       $.ajax({
//         url: 'action.php',
//         method: 'post',
//         cache: false,
//         data: {
//           qty: qty,
//           pid: pid,
//           pprice: pprice
//         },
//         success: function(response) {
//           console.log(response);
//         }
//       });
//     });

//   $(document).ready(function () {
//     $('#product_name').on('change', function () {
//       var selectedProduct = $('#product_name :selected').text()

//       $.ajax({
//         method: 'POST',
//         url: '/sales/details',
//         data: { product_name: selectedProduct },
//         dataType: 'json',
//         success: function (response) {
//           if (response == 'FALSE') {
//             var message = 'ERROR: something went wrong please try again later.'
//             alert(message)
//           } else {
//             $('#stockAvailable').val(response.data.stock_available)
//             $('#unity_price').val(response.data.uty_price)
//           }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//           var message =
//             'ERROR: Something went wrong with this request ' +
//             textStatus +
//             '- ' +
//             errorThrown +
//             ' - ' +
//             jqXHR
//           alert(message)
//         },
//       })
//     })
//   })
// }
