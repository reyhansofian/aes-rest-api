# AES REST API

## Cara Pakai

1. Run `npm install`
2. Run `npm install -g sequelize-cli`
3. Rename file `.env.example` menjadi `.env`
4. Ubah value di dalam file `.env` sesuai dengan environment
5. Run `sequelize db:migrate` untuk membuat tabel di database
6. Start server dengan command `npm start`

## Endpoint

Semua endpoint memiliki prefix `/v1`

### Generate Token

Endpoint ini berfungsi untuk generate JWT token.

Endpoint: `GET /v1/generateToken`
Result:
```json
{
  "token": "JWT_TOKEN"
}
```

### Encrypt Message

Endpoint ini berfungsi untuk simulasi encrypted message. Ini berguna untuk testing.

Endpoint: `POST /v1/encryptMessage`
Headers:
```html
x-access-token: TOKEN
Content-Type: application/x-www-form-urlencoded
```

Body:
```html
messages: YOUR_TEXT
from: SENDER_ID
to: RECEIVER_ID
```

### Add New Message

Menambahkan message baru ke database. Data yang datang adalah data yg sudah terenkripsi.

Endpoint: `POST /v1/addMessage`
Headers:
```html
x-access-token: TOKEN
Content-Type: application/x-www-form-urlencoded
```

Body:
```html
text: ENCRYPTED_MESSAGE
```

Result:
```json
{
  "data": {
    "id": 8,
    "messages": "SOME TEXT",
    "from": "SENDER_ID",
    "to": "RECEIVER_ID",
    "updatedAt": "2017-05-17T15:31:23.000Z",
    "createdAt": "2017-05-17T15:31:23.000Z"
  }
}
```

### Update Message
Update message yang ada di database.

Endpoint: `PUT /v1/updateMessage/:id`
Headers:
```html
x-access-token: TOKEN
Content-Type: application/x-www-form-urlencoded
```

Body:
```html
text: NEW_ENCRYPTED_MESSAGE
```

### Delete Message
Menghapus message yang ada di database.

Endpoint: `DELETE /v1/deleteMessage/:id`
Headers:
```html
x-access-token: TOKEN
```

### Get Messages by Sender Id
Mengambil semua data messages berdasarkan sender id.

Endpoint: `GET /v1/messageBySenderId/:id`
Headers:
```html
x-access-token: TOKEN
```

Result:
```json
{
  "data": [
    {
      "id": 4,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:31:06.000Z",
      "updatedAt": "2017-05-17T14:31:06.000Z"
    },
    {
      "id": 5,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:50:32.000Z",
      "updatedAt": "2017-05-17T14:50:32.000Z"
    },
    {
      "id": 6,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:54:39.000Z",
      "updatedAt": "2017-05-17T14:54:39.000Z"
    }
  ]
}
```

### Get Message by Message Id
Mengambil data message berdasarkan message id.

Endpoint: `GET /v1/messageById/:id`
Headers:
```html
x-access-token: TOKEN
```

Result:
```json
{
  "data": {
    "id": 8,
    "messages": "SOME TEXT",
    "from": "SENDER_ID",
    "to": "RECEIVER_ID",
    "createdAt": "2017-05-17T15:31:23.000Z",
    "updatedAt": "2017-05-17T15:31:23.000Z"
  }
}
```

### Get Messages by Receiver Id
Mengambil data message berdasarkan receiver id.

Endpoint: `GET /v1/messageById/:id`
Headers:
```html
x-access-token: TOKEN
```

Result:
```json
{
  "data": [
    {
      "id": 4,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:31:06.000Z",
      "updatedAt": "2017-05-17T14:31:06.000Z"
    },
    {
      "id": 5,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:50:32.000Z",
      "updatedAt": "2017-05-17T14:50:32.000Z"
    },
    {
      "id": 6,
      "messages": "cuma test",
      "from": "1",
      "to": "2",
      "createdAt": "2017-05-17T14:54:39.000Z",
      "updatedAt": "2017-05-17T14:54:39.000Z"
    }
  ]
}
```
