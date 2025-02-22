import { Kafka, Producer, Consumer, Partitioners } from "kafkajs";

export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: "my-app",
      brokers: ["kafka:9092"],
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner, // ✅ Thêm dòng này
    });
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async connectProducer() {
    await this.producer.connect();
    console.log("Kafka Producer connected");
  }

  async connectConsumer() {
    await this.consumer.connect();
    console.log("Kafka Consumer connected");
  }

  async sendMessage(topic: string, messages: object) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(messages) }],
    });
    console.log(`Messages sent to topic ${topic}`);
  }

  async consumeMessages(topic: string) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value?.toString()}`);
      },
    });
  }
}

// import { Kafka, Producer, Partitioners } from "kafkajs";

// export class KafkaService {
//   private kafka: Kafka;
//   private producer: Producer;

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: "affiliate-service",
//       brokers: ["localhost:9092"],
//     });

//     this.producer = this.kafka.producer({
//       createPartitioner: Partitioners.LegacyPartitioner, // ✅ Sử dụng partitioner cũ để tránh lỗi cảnh báo
//     });
//   }

//   async connect() {
//     await this.producer.connect();
//     console.log("✅ Kafka Producer connected");
//   }

//   async sendMessage(topic: string, message: object) {
//     await this.producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     });
//     console.log(`📨 Message sent to topic: ${topic}`, message);
//   }

//   async disconnect() {
//     await this.producer.disconnect();
//   }
// }
