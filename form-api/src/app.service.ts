import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async processFileUpload(file: Express.Multer.File) {
    const id = uuidv4();

    // generate UUID and prepend to filename
    // save file to S3
    await this.saveFileToS3(id + '_', file);

    // call textract to start process the file

    // save new record to dynamo with UUID, filename and textract jobId

    return id;
  }

  private async saveFileToS3(prefix: string, file: Express.Multer.File) {
    const client = new S3Client({
      credentials: fromIni({profile: '732757519306_Bedrock'}),
      region: 'ap-southeast-2'
    });
    const command = new PutObjectCommand({
      Bucket: "hackathon-documents",
      Key: "upload/" + (prefix || '' ) + file.originalname,
      Body: file.buffer,
    });
  
    await client.send(command);
  }
}
