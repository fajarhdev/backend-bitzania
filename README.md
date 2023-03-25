
# Backend-Bitzania




## Installation

After clonning this repository, Install this project with npm

```bash
  npm install
```
    
## Deployment

Before run this project you must created .env file and follow the instruction in the .env.example

After that you need to do:

```bash
  npm run start
```


## Features

- Use the collection postman to have a preview of this backend application


## API Reference

#### Login to get JWT Token

```http
  POST /users/login
```

| Return | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `JWT` | `string` |  Your JWT API key |

#### Register

```http
  POST /users/register
```

#### Get Student List
```http
  GET /report/data?page=1&limit=10
```
| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `int` | `Pagination`: Page want to get, `default`: 1  |
| `limit`      | `int` | `Pagination`: Page want to get, `default`: 10 |

#### Get Student List with filter
```http
  GET /report/filterdata?page=1&limit=10
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `int` | `Pagination`: Page want to get, `default`: 1  |
| `limit`      | `int` | `Pagination`: Page want to get, `default`: 10 |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dateAwal`      | `date` | `Format`: `yyyy-mm-dd` |
| `dateAkhir`      | `date` | `Format`: `yyyy-mm-dd` |
| `name`      | `string` | Name of student want to search |
| `classroom`      | `string` | Classroom of students want to search |

#### Clock In Attendence
```http
  POST /users/clockin
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date` | `Format`: `yyyy-mm-dd` |
| `time`      | `time` | `Format`: `hh-mm-ss` |

#### Update Clock In Attendence
```http
  PUT /users/updateclockin?clockin_id=455
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clockin_id`      | `int` | **Required** ID of Clock In|

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date` | `Format`: `yyyy-mm-dd` |
| `time`      | `time` | `Format`: `hh-mm-ss` |

#### Delete Clock In Attendence
```http
  DELETE /users/deleteclockin?clockin_id=455
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clockin_id`      | `int` | **Required** ID of Clock In|

#### Clock Out Attendence
```http
  POST /users/clockout
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date` | `Format`: `yyyy-mm-dd` |
| `time`      | `time` | `Format`: `hh-mm-ss` |

#### Update Clock Out Attendence
```http
  PUT /users/updateclockout?clockout_id=404
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clockin_id`      | `int` | **Required** ID of Clock In|

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `date` | `Format`: `yyyy-mm-dd` |
| `time`      | `time` | `Format`: `hh-mm-ss` |


#### Delete Clock Out Attendence
```http
  DELETE /users/deleteclockout?clockout_id=404
```

| Authorization | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `JWT`      | `string` | **Required**. JWT API Key |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clockin_id`      | `int` | **Required** ID of Clock In|






