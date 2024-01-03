const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3001;
const MONGO_URI = 'mongodb+srv://pagarmaheshofficial:bFbwucdf3Iw6pjKO@cluster0.qscx5l3.mongodb.net/';

app.use(cors());
app.use(bodyParser.json());

app.post('/api/payment', async (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  const client = new MongoClient(MONGO_URI, {});

  try {
    await client.connect();
    console.log('Connected to MongoDB');

 
    const database = client.db('Payment_Rushikesh');
    const collection = database.collection('payments');

    
    const result = await collection.insertOne({
        cardNumber,
        expiryDate,
        cvv,
        timestamp: new Date(),
    });

    if (result.result.ok === 1 && result.result.n === 1) {
        console.log('Payment data inserted successfully');
    console.log('Inserted ID:', result.insertedId);
    } else {
        console.error('Failed to insert payment data');
        console.error('MongoDB Insert Result:', result.result);
        res.status(500).send('Internal Server Error');
    return;
    }

    res.status(200).send('Payment successful');
  } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
  } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
