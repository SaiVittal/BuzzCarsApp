// index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());


// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'team108-database-1.c2fql03vwawa.us-east-1.rds.amazonaws.com',
  user: 'dbadmin',
  password: '7cMoU2wngtMxoBGe9bRb',
  database: 'buzzcars',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/api/vehicles/uniqueValues', async (req, res) => {
  try {
    const uniqueVehicleTypesQuery = 'SELECT DISTINCT vehicletype FROM vehicle';
    const uniqueModelYearsQuery = 'SELECT DISTINCT modelyear FROM vehicle';

    const [vehicleTypes, modelYears] = await Promise.all([
      connection.promise().query(uniqueVehicleTypesQuery),
      connection.promise().query(uniqueModelYearsQuery),
    ]);

    const uniqueVehicleTypes = vehicleTypes[0].map((row) => row.vehicletype);
    const uniqueModelYears = modelYears[0].map((row) => row.modelyear.toString());

    res.json({ uniqueVehicleTypes, uniqueModelYears });
  } catch (error) {
    console.error('Error fetching unique values:', error);
    res.status(500).send('Internal Server Error');
  }
});




///For User Login Authentication getting the user details from user tables
app.post('/api/login', (req, res) => {

  console.log('Request received for login:', req.body);
  const { email, password } = req.body;

  // SQL query to authenticate the user and retrieve role details
  const query = `
    SELECT ur.userid, ic.email email, ic.password, "INV_CLERK" as role_desc 
    FROM users ur, inventory_clerk ic 
    WHERE ur.userid = ic.userid AND ic.email = ? AND ic.password = ?
    UNION ALL
    SELECT ur.userid, sp.email, sp.password, "SALES_PERSON" as role_desc 
    FROM users ur, salesperson sp 
    WHERE ur.userid = sp.userid AND sp.email = ? AND sp.password = ?
    UNION ALL
    SELECT ur.userid, mg.email, mg.password, "MANAGER" as role_desc 
    FROM users ur, manager mg 
    WHERE ur.userid = mg.userid AND mg.email = ? AND mg.password = ?
    UNION ALL
    SELECT ur.userid, ow.email, ow.password, "OWNER" as role_desc 
    FROM users ur, owners ow 
    WHERE ur.userid = ow.userid AND ow.email = ? AND ow.password = ?;
  `;

  connection.query(query, [email, password, email, password, email, password, email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Query results:', results);
      if (results.length > 0) {
        // Authentication successful, respond with the role
        res.json({ role: results[0].role_desc });
      } else {
        // Authentication failed
        res.json({ role: null });
      }
    }
  });
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// Define an API endpoint to get vehicles
// Inside your Express server setup (e.g., server.js)
app.get('/api/vehicles/', (req, res) => {
    const query = 'SELECT * FROM vehicle';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
        console.log(results);
      }
    });
  });

  // app.post('/api/vehicles/', (req, res) => {
  //   const { id, make, model, year } = req.body;
  
  //   if (!id || !make || !model || !year) {
  //     return res.status(400).json({ message: 'All fields are required' });
  //   }
  
  //   const insertQuery = 'INSERT INTO vehicles (id, make, model, year) VALUES (?, ?, ?, ?)';
  
  //   connection.query(insertQuery, [id, make, model, year], (err, result) => {
  //     if (err) {
  //       console.error('Error inserting data into MySQL:', err);
  //       return res.status(500).json({ message: 'Internal Server Error' });
  //     }
  
  //     console.log('Data inserted into MySQL:', result);
  //     res.status(201).json({ message: 'Data inserted successfully' });
  //   });
  // });
  

// Start the server
app.listen(3001, () => {
  console.log(`Server is running: 3001`);
});
