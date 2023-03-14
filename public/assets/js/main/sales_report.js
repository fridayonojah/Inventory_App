;(function () {
  let order_date = document.getElementsByClassName('order_date')
  let delivery_date = document.getElementsByClassName('delivery_date')

  const dateFormat = (data_name) => {
    for (let i = 0; i < data_name.length; i++) {
      const element = data_name[i]

      let content = element.innerHTML
      let convert_date = new Date(content)

      let value = convert_date
      element.innerHTML = value
      element.innerHTML = element.innerHTML.slice(0, 21)

      if (element.innerHTML === 'Invalid Date') {
        let response =
          '<span class="badge bg-danger">Awaiting Delivery !</span>'

        element.innerHTML = response
      }
    }
  }

  dateFormat(order_date)
  dateFormat(delivery_date)

  const paginate = () => {
    $(document).ready(function () {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [
          { extend: 'pdf', className: 'ml-2 btn btn-success' },
          { extend: 'print', className: 'ml-2 btn btn-success' },
          { extend: 'excel', className: 'ml-2 btn btn-success' },
        ],

        pageLength: 4,
      })
    })
  }
  paginate()
})()
