;(function () {
  let unity_price = document.getElementById('unity_price')
  let qty = document.getElementById('qty')
  let total_price = document.getElementById('total_amount')
  let outstandingBalance = document.getElementById('balance')
  let amountPaid = document.getElementById('amount_paid')

  const handleUnityPrice = () => {
    unity_price.addEventListener('input', (e) => {
      let total = e.target.value * qty.value
      let updateTotal = total_price.setAttribute('value', `${total}`)
      return updateTotal
    })
  }
  handleUnityPrice()

  const handleQuantity = () => {
    qty.addEventListener('change', (e) => {
      let qty = e.target.value
      let total = qty * unity_price.value
      let updateTotal = total_price.setAttribute('value', `${total}`)
      return updateTotal
    })
  }
  handleQuantity()

  const handleAmountPaid = () => {
    amountPaid.addEventListener('input', (e) => {
      let paidAmount = e.target.value

      if (paidAmount === total_price.value) {
        return outstandingBalance.setAttribute('value', 'none')
      } else {
        let updateOutstandBalance = total_price.value - paidAmount
        return outstandingBalance.setAttribute(
          'value',
          `${updateOutstandBalance}`,
        )
      }
    })
  }
  handleAmountPaid()
})()
