#!/usr/bin/env bash

set -euo pipefail

# enable debug
# set -x

echo "listing sqs messages"
echo "==================="
LOCALSTACK_HOST=localhost
AWS_REGION=eu-west-1

list_messages() {
    aws --endpoint-url=http://localhost:4566 --region=eu-west-1 --queue-url=http://localhost:4566/000000000000/motive-test-queue sqs receive-message
}

list_messages