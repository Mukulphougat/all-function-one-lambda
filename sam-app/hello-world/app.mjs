/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
// ScanCommand,
  // PutCommand,
//   GetCommand,
//   DeleteCommand,

const client = new DynamoDBClient({
  endpoint: "https://8000-mukulphouga-allfunction-8w1vlmxp65b.ws-us105.gitpod.io"
});

const dynamo = DynamoDBDocumentClient.from(client);
const tableName="user"

export const lambdaHandler = async (event, context) => {
    try {
        const users=await dynamo.send(
            new ScanCommand({
                TableName: tableName
            })
        )
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                List: users.Items,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
