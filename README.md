
# Envelope Budgeting API

This project is a Node.js/Express application that simulates a basic envelope budgeting system. It allows users to create, read, update, delete, and transfer budget amounts between different envelopes.

## Features

- **Create an envelope**: Add a new envelope with a budget and balance.
- **View all envelopes**: Retrieve a list of all created envelopes.
- **View a specific envelope**: Get details of a specific envelope by its ID.
- **Update an envelope**: Modify the details of an existing envelope.
- **Delete an envelope**: Remove an envelope by its ID.
- **Transfer budget between envelopes**: Move a budget amount from one envelope to another.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elhadjx/Personal-Budget.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Personal-Budget
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `models` directory in the root of the project and add an `Envelope.js` file that defines your `Envelope` model.

5. Start the server:

   ```bash
   node app.js
   ```

6. The server will be running at [http://localhost:4055](http://localhost:4055).

## Endpoints

### GET /

- **Description**: Basic health check route.
- **Response**: `'ok'`

### GET /envelopes

- **Description**: Retrieve a list of all envelopes.
- **Response**: `200 OK` with a list of envelopes.

### GET /envelopes/:envelopeId

- **Description**: Retrieve details of a specific envelope by ID.
- **Response**: `200 OK` with the envelope details.

### POST /envelopes

- **Description**: Create a new envelope.
- **Request Body**:

  ```json
  {
    "name": "string",
    "budget": "number",
    "balance": "number"
  }
  ```

- **Response**: `200 OK` with the created envelope.

### PUT /envelopes/:envelopeId

- **Description**: Update an existing envelope.
- **Request Body**: Partial or full update of the envelope's properties.
- **Response**: `201 Created` with the updated envelope.

### DELETE /envelopes/:envelopeId

- **Description**: Delete an envelope by ID.
- **Response**: `204 No Content`

### POST /envelopes/:fromId/:toId

- **Description**: Transfer a budget amount from one envelope to another.
- **Request Body**:

  ```json
  {
    "budget": "number"
  }
  ```

- **Response**: `200 OK` with a success message if the transfer is successful.

## Model Structure

The `Envelope` model should include the following properties:

- `id` (number): Unique identifier for the envelope.
- `name` (string): The name of the envelope.
- `budget` (number): The total budget allocated to the envelope.
- `balance` (number): The remaining balance in the envelope.

## Example

An example of creating an envelope:

```bash
curl -X POST http://localhost:4055/envelopes -H "Content-Type: application/json" -d '{
  "name": "Groceries",
  "budget": 500,
  "balance": 500
}'
```


