#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessContainerConstructsChallengesStack } from '../lib/serverless-container-constructs-challenges';
import { ServerlessContainerConstructsChallenges2 } from '../lib/serverless-container-constructs-challenges2';
const env = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  };
const app = new cdk.App();
new ServerlessContainerConstructsChallengesStack(app, 'ServerlessContainerConstructsChallengesStack', {
  defaultVpc: true,
  // will give value from cdk deploy -c arn=xxxx -c zoneId=xxxx -c zoneName=xxxx 
  certArn: app.node.tryGetContext('arn'),
  hostedZoneId: app.node.tryGetContext('zoneId'),
  zoneName: app.node.tryGetContext('zoneName'),
  env,
});

const stack = new cdk.Stack(app, 'Challage2', { env });
new ServerlessContainerConstructsChallenges2(stack, 'ConstructService', {
  defaultVpc: true,
  certArn: app.node.tryGetContext('arn'),
  hostedZoneId: app.node.tryGetContext('zoneId'),
  zoneName: app.node.tryGetContext('zoneName'),
  recordName: 'constructs-challage-2'
});