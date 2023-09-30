const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const csvData = fs.readFileSync(
	path.join(__dirname, 'data', 'magento_orders_list.csv'),
	'utf-8'
)

const convertOrdersCSVToJSON = (csv) => {
  const results = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true
  })
  results.data.forEach((record) => {
    if (record.purchase_date) {
      record.purchase_date = new Date(record.purchase_date)
    }
  })
  return results.data
}

console.log(convertOrdersCSVToJSON(csvData))