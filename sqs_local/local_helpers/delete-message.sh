#!/usr/bin/env bash

set -euo pipefail

# enable debug
# set -x

echo "deleting sqs message"
echo "==================="
LOCALSTACK_HOST=localhost
AWS_REGION=eu-west-1
RECEIPT_HANDLE=<ADD MESSAGE RECEIPT-HANDLE HERE>

delete_messages() {
    aws --endpoint-url=http://localhost:4566 --region=eu-west-1 --queue-url=http://localhost:4566/000000000000/motive-test-queue --receipt-handle=$RECEIPT_HANDLE sqs delete-message
}

delete_messages