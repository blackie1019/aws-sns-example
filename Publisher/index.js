// Load the SDK for JavaScript
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-northeast-1" });

var APPLICATION_ARN = "arn:aws:sns:ap-northeast-1:728812454107:iron-man";

var sns = new AWS.SNS({ params: { TopicArn: APPLICATION_ARN } });

var payload = {
  default: "Hello IronMan!",
  APNS: {
    aps: {
      topic:
        "30天鐵人賽介紹 AWS 雲端世界 - 22:　透過　SNS 實作主動式的推播/訂閱通知架構",
      team: "XY 動手不動口",
      days: 22
    }
  }
};

// first have to stringify the inner APNS object...
payload.APNS = JSON.stringify(payload.APNS);
// then have to stringify the entire message payload
payload = JSON.stringify(payload);

console.log("傳送推播中．．．");
sns.publish(
  {
    Message: payload,
    MessageStructure: "json"
  },
  function(err, data) {
    if (err) {
      console.log(err.stack);
      return;
    }

    console.log("推播完成");
    console.log(data);
  }
);
