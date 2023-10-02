const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
const axios = require('axios')

const csvData = fs.readFileSync(
	path.join(__dirname, 'data', 'magento_orders_list.csv'),
	'utf-8'
)

const convertOrdersCSVToJSON = (csv) => {
	const results = Papa.parse(csv, {
		header: true,
		skipEmptyLines: true,
	})
	results.data.forEach((record) => {
		if (record.purchase_date) {
			record.purchase_date = new Date(record.purchase_date)
		}
	})
	return results.data
}

const ordersList = convertOrdersCSVToJSON(csvData)
let masterOrderList = []

const addOrdersToStrapiCMS = async (ordersList) => {
	ordersList.forEach((order) => {
		// console.log("ORDER: ", order)
		const userOrder = {
			data: {
				purchase_date: order.purchase_date,
				grand_total_base: order.grand_total_base,
				grand_total_purchased: order.grand_total_purchased,
				status: order.status,
				bill_to_name: order.bill_to_name,
				ship_to_name: order.ship_to_name,
				billing_address: order.billing_address,
				shipping_address: order.shipping_address,
				shipping_information: order.shipping_information,
				customer_email: order.customer_email,
				customer_group: order.customer_group,
				subtotal: order.subtotal,
				shipping_and_handling: order.shipping_and_handling,
				customer_name: order.customer_name,
				payment_method: order.payment_method,
				total_refunded: order.total_refunded,
			},
		}
		masterOrderList.push(userOrder)
	})

	console.log(masterOrderList.length)

	// for (let order of masterOrderList) {
	// 	// console.log("--- ORDER ---")
	// 	// console.log(order)
	// 	try {
	// 		await axios.post('http://127.0.0.1:1337/api/orders', order, {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		})
  //    console.log("--- order added ---")
	// 	} catch (error) {
	// 		console.error('Failed to post order: ', error)
	// 	}
	// }	
}

addOrdersToStrapiCMS(ordersList)
