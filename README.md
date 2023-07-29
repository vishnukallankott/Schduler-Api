
# Scheduler

These are the APIs used to schedule emails.

## Deployment

To deploy this project run

```bash
  npm run dev
  npm start
```


## API Reference

#### Get all candidates

```http
  GET /candidates
```

#### Get candidates using Candidate Id

```http
  GET /candidates/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `numbers` | **Required**. Id of the candidates |

#### Get all candidates having issue emails

```http
  GET /candidates-failed-emails
```

#### Add new candidates


```http
  POST /candidates
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of the candidates |
| `email`      | `string` | **Required**. email of the candidates |
| `phone`      | `string` | **Required**. phone number of the candidates |
| `schduledtime`| `string` | **Required**. schduledtime of the candidates |

#### Update  candidates Details

```http
  PUT /candidates/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. name of the candidates |
| `email`      | `string` | **Required**. email of the candidates |
| `phone`      | `string` | **Required**. phone number of the candidates |
| `schduledtime`| `string` | **Required**. schduledtime of the candidates |


#### Delete candidates Details


```http
  DELETE /candidates/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `numbers` | **Required**. Id of the candidates |



#### Reschduling candidates using Candidate id


```http
  PATCH /candidates/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `numbers` | **Required**. Id of the candidates |


