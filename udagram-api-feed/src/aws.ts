import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "./config/config";

// Configure the S3 client
const s3 = new S3Client({
  region: config.aws_region,
  credentials: {
    profile: config.aws_profile,
  },
});

// Generates an AWS signed URL for retrieving objects
export async function getGetSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.aws_media_bucket,
    Key: key,
  });

  const signedUrlExpireSeconds = 60 * 5;

  return await getSignedUrl(s3, command, { expiresIn: signedUrlExpireSeconds });
}

// Generates an AWS signed URL for uploading objects
export async function getPutSignedUrl(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: config.aws_media_bucket,
    Key: key,
  });

  const signedUrlExpireSeconds = 60 * 5;

  return await getSignedUrl(s3, command, { expiresIn: signedUrlExpireSeconds });
}
