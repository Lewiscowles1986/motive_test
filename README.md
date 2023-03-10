# Insights Service

As part of our latest MVP build, we need to present a user with some insights about their spending.

We need to build a server that returns JSON formatted insights.

A list of transactions for a user can be retrieved at:

`GET ` https://motive-test-server-deploy.vercel.app/transactions. (Make sure you use https!!!).

The server should fetch this list, then calculate the insights below, and return them in the body of the response with a 200 response code. 

The api returns an array of transactions:

```json
[
  {
    "id": 1,
    "amount": 100,
    "merchant": "Tescos Ltd",
    "category": "food",
    "paymentDate": "2019-01-27T14:24:48.960Z"
  },
  {
    "id": 2,
    "amount": 20,
    "merchant": "TFL London",
    "category": "transport",
    "paymentDate": "2019-02-27T14:24:48.960Z"
  },
  {
    "id": 3,
    "amount": 79.99,
    "merchant": "Tescos Ltd",
    "category": "food",
    "paymentDate": "2019-02-14T14:24:48.960Z"
  },
  {
    "id": 4,
    "amount": 16.32,
    "merchant": "TFL London",
    "category": "transport",
    "paymentDate": "2019-02-27T14:24:48.960Z"
  },
  {
    "id": 5,
    "amount": 4.27,
    "merchant": "TFL London",
    "category": "transport",
    "paymentDate": "2019-02-27T14:24:48.960Z"
  },
]
```

From this list we'll need to build a server that exposes the following routes, which calculate different insights about a users spending depending on which route is called and publish the results to a queue:

1. `GET /insights/categories`

User Stories: 
```
As a User
So that I can gain an understanding of my spending
I want to see a simple list of total spend by category
```

```json
{
  "food": 179.99,
  "transport": 40.59
}
```

Then publish the results: 

```
As a System Designer
I want to asynchronously process information and
I want to publish the total spend by category so other services can process it
So that requests do not take too long
And other systems can operate independently.
```

Publish the results of the aggregated total spend by category to the AWS SQS queue `motive-test-queue`.

### Using Localstack And Docker Compose:

Please see the directory `sqs_local` if you would like to run a local instance of sqs for testing. This is not essential.

In the directory `sqs_local/local_helpers` there are helper functions to investigate the running queue (will need aws cli)

### Testing Strategy

Whether using localstack or not it's worth considering testing strategy. You will want to stub SQS in a way that allows for asserting messages are being sent.

### Useful AWS SDK docs:

- https://www.npmjs.com/package/aws-sdk
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-promises.html

Local config would look like:

```
{
  endpoint: 'http://localhost:4566',
  region: 'eu-west-1',
}
```

2. `GET /insights/cashflow`

User Story:
```
As a User
So that I can gain an understanding of if i will run out of money
I want to see a breakdown of my spending by month
```

returns a daily cashflow of all transactions grouped by day. For days on which there is no data return 0 for all fields. 

```json
{
  "01/01/2019": {
    "totalNumber": 10,
    "totalValue": 400,
    "averageValue": 40
  },
  "02/01/2019": {
    "totalNumber": 10,
    "totalValue": 400,
    "averageValue": 40
  },
}
```

3. Stretch Goal, we will talk through this task together if you reach this point.

## Some notes

1. All values are integer. Don't worry about dealing with floating point precisions, the front end can deal with the presentation logic.
2. You can use any npm package you like, but only with good reason! This includes the testing framework which you can change :)
3. We've provided some boilerplate code, but feel free to rearrange as you want...
4. There's a little test script we've written which will start the server, run the tests and pull it down again. But feel free to orchestrate your tests however you want!

## Things we value

1. Well tested code. Whatever framework you use, we like testing our code to have certainty it works.
2. Simple code. It shouldn't take a PHD to understand code. If it's that complicated, we've done something wrong.
3. Code reuse. If there's an option to reuse some code, go for it!
