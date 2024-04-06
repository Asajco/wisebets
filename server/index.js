const express = require('express')
const app = express()
const fs = require('fs')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser')
const cors = require('cors')
const nodeMailer = require('nodemailer')
const handleBar = require('handlebars')
const emailJsonFilePath = '../client/src/store/emails.json'
const axios = require('axios')

let invoiceID = 0
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post('/payment', cors(), async (req, res) => {
  let { amount, currency, name, email, planId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // price_data: {
          //   currency,
          //   product_data: {
          //     name: name,
          //   },
          //   unit_amount: amount,
          // },
          price: 'price_1P2YedLsF6CdETVc9LM6DPyX',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: email,
      //TODO change routing to okay route
      success_url: 'http://wisebets.sk/#/succes',
      cancel_url: 'http://wisebets.sk/#/cancel',
    })
    console.log('Session created:', session.id)
    console.log(req.body)

    res.json({
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Error creating session:', error)
    res.status(500).json({
      error: 'Unable to create session',
    })
  }
})
app.post('/send-email', async (req, res) => {
  const { customer_email, total_price, product_name } = req.body
  console.log(customer_email)
  const source = fs.readFileSync('paymentTemplete.html', 'utf-8').toString()
  const templete = handleBar.compile(source)
  let telegramLink

  if (product_name == 'Starter') {
    telegramLink = 'https://t.me/+2-HpO01lSFQ1M2E8'
  } else if (product_name == 'Pro') {
    telegramLink = 'https://t.me/+YsBGqHvGlDY0OTVk'
  } else if (product_name == 'Elite') {
    telegramLink = 'https://t.me/+21tl9G0tDddlODk0'
  }
  replacementd = {
    invoiceID: invoiceID,
    total_price: total_price,
    product_name: product_name,
    telegramLink: telegramLink,
  }

  const htmlToSend = templete(replacementd)
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'petergacj@gmail.com',
      pass: 'iqhn mzvb jxhn watj',
    },
  })

  const mailOptions = {
    from: 'test@tset.com', // Replace with your Gmail email
    to: customer_email,
    subject: `Úspešná platba za členstvo ${product_name}`,
    text: 'Ďakujeme za nákkup',
    html: htmlToSend,
    attachments: [
      {
        filename:
          'VŠEOBECNÉ OBCHODNÉ PODMIENKY Informačná povinnosť o všeobecných obchodných podmienkach-3.pdf',
        path:
          './pdf/VŠEOBECNÉ OBCHODNÉ PODMIENKY Informačná povinnosť o všeobecných obchodných podmienkach-3.pdf',
      },
      {
        filename: 'Reklamačný formulár.pdf',
        path: './pdf/Reklamačný formulár.pdf',
      },
    ],
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent')
    console.log(telegramLink)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Error sending email' })
  }
})

app.post('/add-email', (req, res) => {
  const { email } = req.body

  // Read existing emails from JSON file
  fs.readFile(emailJsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err)
      return res.status(500).json({ error: 'Error reading JSON file' })
    }

    let emails = []

    try {
      // Parse the existing JSON data
      emails = JSON.parse(data).emails
    } catch (error) {
      console.error('Error parsing JSON data:', error)
      return res.status(500).json({ error: 'Error parsing JSON data' })
    }

    // Add the new email to the array
    emails.push(email)

    // Update the JSON data with the new email
    const updatedData = { emails }

    // Write the updated data back to the JSON file
    fs.writeFile(
      emailJsonFilePath,
      JSON.stringify(updatedData, null, 2),
      (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err)
          return res.status(500).json({ error: 'Error writing to JSON file' })
        }

        console.log('Email added to JSON file:', email)

        // Return success response
        return res.status(200).json({ message: 'Email added to JSON file' })
      },
    )
  })
})

app.post('/send-newsletter', async (req, res) => {
  const { subject, message } = req.body

  // Read emails from JSON file
  fs.readFile(emailJsonFilePath, 'utf-8', async (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err)
      return res.status(500).json({ error: 'Error reading JSON file' })
    }

    let emails = []

    try {
      // Parse the existing JSON data
      emails = JSON.parse(data).emails
    } catch (error) {
      console.error('Error parsing JSON data:', error)
      return res.status(500).json({ error: 'Error parsing JSON data' })
    }

    // Create transporter
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'petergacj@gmail.com',
        pass: 'iqhn mzvb jxhn watj',
      },
    })
    const source = fs
      .readFileSync('newsletterTemplate.html', 'utf-8')
      .toString()
    const templete = handleBar.compile(source)
    replacementd = {
      message: message,
    }
    const htmlToSend = templete(replacementd)

    // Create email options
    const mailOptions = {
      from: 'petergacj@gmail.com', // Replace with your email
      to: emails.join(','), // Join all emails from the array
      subject: subject,
      text: message,
      html: htmlToSend,
    }

    try {
      // Send email to each recipient separately
      for (const email of emails) {
        const mailOptions = {
          from: 'petergacj@gmail.com',
          to: email,
          subject: subject,
          html: htmlToSend,
        }

        await transporter.sendMail(mailOptions)
        console.log(`Email sent to ${email}`)
      }

      console.log('Newsletter sent')
      res.status(200).json({ message: 'Newsletter sent successfully' })
    } catch (error) {
      console.error('Error sending newsletter:', error)
      res.status(500).json({ error: 'Error sending newsletter' })
    }
  })
})

app.post('/create-invoice', async (req, res) => {
  const { name, tax, unitPrice, clientName } = req.body

  try {
    console.log(name, tax, unitPrice, clientName, invoiceID)
    let price = (unitPrice / 100) * 80
    const data = {
      Invoice: {
        name: name,
      },
      InvoiceItem: [
        {
          description: 'Wisebets členstvo',
          name: name,
          tax: tax,
          unit_price: price.toFixed(2),
        },
      ],
      Client: {
        name: clientName,
        // ico: '44981082',
      },
    }

    console.log(data)

    // Make a POST request to SuperFaktura API to create the invoice
    const response = await axios.post(
      'https://moja.superfaktura.sk/invoices/create', // Specify the correct endpoint URL
      data,
      {
        headers: {
          Authorization:
            'SFAPI email=wisebets.official@gmail.com&apikey=5zw10h2QlCDhFNorlcX0oXtZaFhJJOCJ&company_id=109349',
        },
      },
    )

    // Handle successful response from SuperFaktura
    console.log(
      'Invoice created successfully:',
      response.data.data.Invoice.variable,
    )
    invoiceID = response.data.data.Invoice.variable
    // console.log(response)
    res.status(200).json({ message: 'Invoice created successfully' })
  } catch (error) {
    console.error(
      'Error creating invoice:',
      error.response ? error.response.data : error.message,
    )
    res.status(500).json({ error: 'Error creating invoice' })
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is listening on port 4000')
})
