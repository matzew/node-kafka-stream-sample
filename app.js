const {KafkaStreams} = require("kafka-streams");
 
const config = require("./cluster-cfg.js");
const kafkaStreams = new KafkaStreams(config);

const source = kafkaStreams.getKStream("agpush_apnsTokenDeliveryMetrics");


source
   .filter(kv => kv.value === "agpush_apnsTokenDeliverySuccess")
   .countByKey("key", "count")
   .map(kv => kv.key + " " + kv.count)
   .tap(kv => console.log(kv))

  .to("some_topic");


source.start();
